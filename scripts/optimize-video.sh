#!/usr/bin/env bash
set -euo pipefail

INPUT_VIDEO="${1:-public/assets/aistudio/vidssave.com__________________________Best_Resort_in_Bankura_720P__1__f302ed26.mp4}"
OUT_DIR="public/video"
mkdir -p "$OUT_DIR"

if [ ! -f "$INPUT_VIDEO" ]; then
  echo "Input video not found at $INPUT_VIDEO"
  exit 1
fi

ORIG_SIZE=$(du -h "$INPUT_VIDEO" | cut -f1)
echo "Optimizing hero background video from $INPUT_VIDEO ($ORIG_SIZE)..."

# Crop bottom ticker bar (68px) cleanly for a full-bleed hero backdrop while keeping full sky headroom
HERO_FILTER_DESKTOP="crop=iw:ih-68:0:0,scale='min(1280,iw)':-2"
HERO_FILTER_MOBILE="crop=iw:ih-68:0:0,scale='min(640,iw)':-2"

# 1. Desktop MP4 (H.264, 8s continuous entrance-to-courtyard walk before white flash)
ffmpeg -y -ss 00:00:01.5 -t 8 -i "$INPUT_VIDEO" \
  -vf "$HERO_FILTER_DESKTOP" \
  -c:v libx264 -profile:v main -level 4.0 -pix_fmt yuv420p \
  -b:v 850k -maxrate 1100k -bufsize 1700k -preset medium -movflags +faststart -an \
  "$OUT_DIR/hero-desktop.mp4" -loglevel error

# 2. Desktop WebM (VP9, muted)
ffmpeg -y -ss 00:00:01.5 -t 8 -i "$INPUT_VIDEO" \
  -vf "$HERO_FILTER_DESKTOP" \
  -c:v libvpx-vp9 -b:v 850k -maxrate 1100k -bufsize 1700k -crf 36 -row-mt 1 -deadline good -cpu-used 4 -an \
  "$OUT_DIR/hero-desktop.webm" -loglevel error

# 3. Mobile MP4 (H.264, faststart, muted)
ffmpeg -y -ss 00:00:01.5 -t 8 -i "$INPUT_VIDEO" \
  -vf "$HERO_FILTER_MOBILE" \
  -c:v libx264 -profile:v main -pix_fmt yuv420p \
  -b:v 420k -maxrate 550k -bufsize 900k -preset medium -movflags +faststart -an \
  "$OUT_DIR/hero-mobile.mp4" -loglevel error

# 4. Mobile WebM (VP9, muted)
ffmpeg -y -ss 00:00:01.5 -t 8 -i "$INPUT_VIDEO" \
  -vf "$HERO_FILTER_MOBILE" \
  -c:v libvpx-vp9 -b:v 400k -maxrate 520k -bufsize 800k -crf 38 -row-mt 1 -deadline good -cpu-used 4 -an \
  "$OUT_DIR/hero-mobile.webm" -loglevel error

# 5. Poster image (crisp courtyard + Aatchala frame at 8.5s)
ffmpeg -y -ss 00:00:08.5 -i "$INPUT_VIDEO" \
  -frames:v 1 -vf "$HERO_FILTER_DESKTOP" \
  -c:v libwebp -quality 75 \
  "$OUT_DIR/hero-poster.webp" -loglevel error

echo ""
echo "Video optimization complete:"
ls -lh "$OUT_DIR"/hero-*
