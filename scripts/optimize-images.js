import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { optimize as optimizeSvg } from 'svgo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const originalsDir = path.join(rootDir, 'src', 'assets', 'originals');
const outDir = path.join(rootDir, 'public', 'images');
const publicDir = path.join(rootDir, 'public');
const manifestOutPath = path.join(rootDir, 'src', 'data', 'imageManifest.json');

const RESPONSIVE_WIDTHS = [480, 768, 1280, 1920];
const HERO_BUDGET_BYTES = 150 * 1024;
const CARD_BUDGET_BYTES = 100 * 1024;
const THUMB_BUDGET_BYTES = 25 * 1024;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

/**
 * Wraps a 32x32 PNG buffer inside a standard single-image ICO container.
 */
function pngToIco(pngBuffer, size = 32) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type: ICO
  header.writeUInt16LE(1, 4); // Image count: 1

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0);
  entry.writeUInt8(size === 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(22, 12);

  return Buffer.concat([header, entry, pngBuffer]);
}

async function encodeWithinBudget(pipelineFactory, targetBytes, initialQuality, minQuality, format) {
  let quality = initialQuality;
  let buffer = await pipelineFactory(quality);
  while (buffer.length > targetBytes && quality > minQuality) {
    quality = Math.max(minQuality, quality - 6);
    buffer = await pipelineFactory(quality);
  }
  return { buffer, quality, format };
}

async function generateFaviconsAndOG() {
  const logoPath = path.join(publicDir, 'assets', 'mayaban-logo.png');
  const heroPath = path.join(originalsDir, 'hero.jpg');

  if (fs.existsSync(logoPath)) {
    const favicon32 = await sharp(logoPath)
      .resize(32, 32, { fit: 'contain', background: { r: 246, g: 241, b: 231, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toBuffer();
    fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), favicon32);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), pngToIco(favicon32, 32));

    const appleTouch = await sharp({
      create: {
        width: 180,
        height: 180,
        channels: 4,
        background: { r: 246, g: 241, b: 231, alpha: 1 },
      },
    })
      .composite([
        {
          input: await sharp(logoPath)
            .resize(146, 146, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .toBuffer(),
          gravity: 'center',
        },
      ])
      .png({ compressionLevel: 9 })
      .toBuffer();
    fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch);

    for (const size of [192, 512]) {
      const iconBuf = await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 246, g: 241, b: 231, alpha: 1 },
        },
      })
        .composite([
          {
            input: await sharp(logoPath)
              .resize(Math.round(size * 0.8), Math.round(size * 0.8), {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 },
              })
              .toBuffer(),
            gravity: 'center',
          },
        ])
        .png({ compressionLevel: 9 })
        .toBuffer();
      fs.writeFileSync(path.join(publicDir, `pwa-${size}x${size}.png`), iconBuf);
    }

    // Maskable 512x512 with 15% safe zone padding on deep forest green background
    const maskableBuf = await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 31, g: 61, b: 43, alpha: 1 },
      },
    })
      .composite([
        {
          input: await sharp(logoPath)
            .resize(350, 350, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .toBuffer(),
          gravity: 'center',
        },
      ])
      .png({ compressionLevel: 9 })
      .toBuffer();
    fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), maskableBuf);
  }

  if (fs.existsSync(heroPath)) {
    const ogBuf = await sharp(heroPath)
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(path.join(publicDir, 'og-image.jpg'), ogBuf);
  }
}

async function optimizeSvgs() {
  const iconsDir = path.join(publicDir, 'icons');
  if (!fs.existsSync(iconsDir)) return;
  const svgFiles = fs.readdirSync(iconsDir).filter((f) => f.endsWith('.svg'));
  for (const file of svgFiles) {
    const filePath = path.join(iconsDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const result = optimizeSvg(raw, {
      multipass: true,
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeHiddenElems: false,
              cleanupIds: false,
            },
          },
        },
      ],
    });
    fs.writeFileSync(filePath, result.data, 'utf8');
  }
}

async function run() {
  ensureDir(originalsDir);
  ensureDir(outDir);

  const files = fs
    .readdirSync(originalsDir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();

  const manifest = {};
  const reportRows = [];

  for (const file of files) {
    const slug = path.basename(file, path.extname(file));
    const inputPath = path.join(originalsDir, file);
    const originalSize = fs.statSync(inputPath).size;
    const meta = await sharp(inputPath).metadata();
    const isHero = slug === 'hero';
    const budget = isHero ? HERO_BUDGET_BYTES : CARD_BUDGET_BYTES;

    const generatedWidths = [];
    let primaryAvifSize = 0;
    let primaryWebpSize = 0;
    let primaryJpgSize = 0;

    for (const targetWidth of RESPONSIVE_WIDTHS) {
      if (meta.width && targetWidth > meta.width && generatedWidths.length > 0) {
        continue;
      }
      const effectiveWidth = meta.width ? Math.min(targetWidth, meta.width) : targetWidth;
      if (generatedWidths.includes(effectiveWidth)) continue;
      generatedWidths.push(effectiveWidth);

      const resizeBase = () =>
        sharp(inputPath)
          .rotate()
          .resize({ width: effectiveWidth, withoutEnlargement: true });

      const avifRes = await encodeWithinBudget(
        (q) => resizeBase().avif({ quality: q, effort: 5 }).toBuffer(),
        effectiveWidth >= 1280 ? budget : CARD_BUDGET_BYTES,
        50,
        32,
        'avif'
      );
      fs.writeFileSync(path.join(outDir, `${slug}-${effectiveWidth}.avif`), avifRes.buffer);

      const webpRes = await encodeWithinBudget(
        (q) => resizeBase().webp({ quality: q, effort: 5 }).toBuffer(),
        effectiveWidth >= 1280 ? budget : CARD_BUDGET_BYTES,
        75,
        52,
        'webp'
      );
      fs.writeFileSync(path.join(outDir, `${slug}-${effectiveWidth}.webp`), webpRes.buffer);

      const jpgRes = await encodeWithinBudget(
        (q) =>
          resizeBase()
            .jpeg({ quality: q, progressive: true, mozjpeg: true })
            .toBuffer(),
        effectiveWidth >= 1280 ? budget : CARD_BUDGET_BYTES,
        78,
        56,
        'jpg'
      );
      fs.writeFileSync(path.join(outDir, `${slug}-${effectiveWidth}.jpg`), jpgRes.buffer);

      if (effectiveWidth >= 1280 || generatedWidths.length === 1) {
        primaryAvifSize = avifRes.buffer.length;
        primaryWebpSize = webpRes.buffer.length;
        primaryJpgSize = jpgRes.buffer.length;
      }
    }

    // Small thumbnail under 25 KB
    const thumbRes = await encodeWithinBudget(
      (q) =>
        sharp(inputPath)
          .rotate()
          .resize({ width: 320, withoutEnlargement: true })
          .webp({ quality: q })
          .toBuffer(),
      THUMB_BUDGET_BYTES,
      70,
      45,
      'webp'
    );
    fs.writeFileSync(path.join(outDir, `${slug}-thumb.webp`), thumbRes.buffer);

    // 20px blurred LQIP placeholder
    const lqipBuf = await sharp(inputPath)
      .rotate()
      .resize({ width: 20 })
      .blur(1.2)
      .webp({ quality: 45 })
      .toBuffer();

    manifest[slug] = {
      width: meta.width || 1280,
      height: meta.height || 960,
      widths: generatedWidths,
      lqip: `data:image/webp;base64,${lqipBuf.toString('base64')}`,
    };

    reportRows.push({
      slug,
      original: formatKB(originalSize),
      avif1280: formatKB(primaryAvifSize),
      webp1280: formatKB(primaryWebpSize),
      jpg1280: formatKB(primaryJpgSize),
      thumb: formatKB(thumbRes.buffer.length),
    });
  }

  fs.writeFileSync(manifestOutPath, JSON.stringify(manifest, null, 2));
  await generateFaviconsAndOG();
  await optimizeSvgs();

  console.table(reportRows);
  console.log('Generated image manifest, favicons, OG image, and optimized SVGs.');
}

run().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
