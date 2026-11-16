import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export function render(url) {
  const helmetContext = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <LazyMotion features={domAnimation}>
          <div className="relative min-h-screen flex flex-col bg-[#F6F1E7] text-[#2B2B2B]">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/rooms/:slug" element={<RoomDetail />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </LazyMotion>
      </StaticRouter>
    </HelmetProvider>
  );

  return { html, helmet: helmetContext.helmet };
}
