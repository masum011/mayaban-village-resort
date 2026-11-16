import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';
import { prefetchRoute } from '../utils/routePrefetch';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The requested page on Mayaban Village Resort, Bankura could not be found. Return home to explore cottage suites, deluxe rooms, and banquet halls."
        path="/404"
        robots="noindex, nofollow"
      />
      <section className="min-h-[75vh] flex items-center justify-center bg-[#F6F1E7] px-4 pt-28 pb-20 text-center">
        <div className="max-w-lg space-y-5">
          <p className="text-xs tracking-[0.26em] uppercase text-[#B5654A] font-medium">
            404 · Trail Not Found
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-semibold text-[#1F3D2B]">
            Return to the Courtyard
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            The page you requested has moved or does not exist. Let us guide you back to Mayaban
            Village Resort.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              onMouseEnter={() => prefetchRoute('/')}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-xs font-semibold tracking-wider uppercase hover:bg-[#14291C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#DFC15E]" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/rooms"
              onMouseEnter={() => prefetchRoute('/rooms')}
              className="btn-gold-outline px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#1F3D2B] hover:text-[#14291C]"
            >
              Explore Rooms
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
