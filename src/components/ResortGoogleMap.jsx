import { useCallback, useState } from 'react';
import {
  APIProvider,
  APILoadingStatus,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
} from '@vis.gl/react-google-maps';
import { Compass, ExternalLink, Layers, MapPin, Navigation } from 'lucide-react';
import { siteData } from '../data/site';
import { OptimizedImage } from './OptimizedImage';

const RESORT_COORDS = {
  lat: siteData.location.lat,
  lng: siteData.location.lng,
};

function MapFallbackCard({ reason }) {
  return (
    <div className="relative h-[340px] sm:h-[400px] w-full flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-[#EFE7D6]">
      <div className="absolute inset-0 opacity-25">
        <OptimizedImage
          imageKey="exterior"
          alt="Mayaban Village Resort entrance on Bikna Station Road, Bankura"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 max-w-sm space-y-3 bg-[#FAF7F0]/95 backdrop-blur-sm p-6 rounded-2xl border border-[#1F3D2B]/15 shadow-elevated">
        <div className="w-11 h-11 rounded-full bg-[#137A3D]/12 flex items-center justify-center mx-auto">
          <MapPin className="w-5 h-5 text-[#137A3D]" aria-hidden="true" />
        </div>
        <div>
          <p className="font-serif text-xl font-semibold text-[#1F3D2B]">{siteData.name}</p>
          <p className="mt-1 text-xs text-[#57534E] leading-relaxed">{siteData.address}</p>
          {reason && <p className="mt-2 text-[11px] text-[#B5654A]">{reason}</p>}
        </div>
        <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href={siteData.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-xs font-semibold tracking-wider uppercase hover:bg-[#14291C] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#DFC15E]" aria-hidden="true" />
            <span>Open Google Maps</span>
          </a>
          <a
            href={siteData.location.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#1F3D2B]/25 text-[#1F3D2B] text-xs font-semibold tracking-wider uppercase hover:bg-[#1F3D2B]/5 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-[#137A3D]" aria-hidden="true" />
            <span>Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function ResortMapInner({ heightClass = 'h-[340px] sm:h-[400px]' }) {
  const status = useApiLoadingStatus();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);
  const [mapTypeId, setMapTypeId] = useState('roadmap');
  const [cameraKey, setCameraKey] = useState(0);

  const handleCloseInfo = useCallback(() => {
    setInfoOpen(false);
  }, []);

  if (status === APILoadingStatus.AUTH_FAILURE || status === APILoadingStatus.FAILED) {
    return (
      <MapFallbackCard reason="Interactive map preview is temporarily unavailable. Open our verified pin directly in Google Maps." />
    );
  }

  return (
    <div className={`relative w-full ${heightClass}`}>
      <GoogleMap
        key={cameraKey}
        mapId="DEMO_MAP_ID"
        defaultCenter={RESORT_COORDS}
        defaultZoom={15}
        mapTypeId={mapTypeId}
        gestureHandling="cooperative"
        disableDefaultUI={false}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={true}
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
      >
        <AdvancedMarker
          ref={markerRef}
          position={RESORT_COORDS}
          title="Mayaban Village Resort — Bikna Station Road, Bankura"
          onClick={() => setInfoOpen(true)}
        >
          <Pin
            background="#1F3D2B"
            borderColor="#C9A227"
            glyphColor="#DFC15E"
            scale={1.25}
          />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow anchor={marker} maxWidth={250} onCloseClick={handleCloseInfo}>
            <div className="p-1 text-[#2B2B2B]">
              <p className="font-serif text-base font-semibold text-[#1F3D2B]">
                {siteData.name}
              </p>
              <p className="mt-1 text-xs text-[#57534E] leading-snug">
                {siteData.address}
              </p>
              <div className="mt-2.5 flex items-center gap-3 text-xs font-semibold">
                <a
                  href={siteData.location.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#137A3D] hover:underline"
                >
                  Directions →
                </a>
                <a
                  href={siteData.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1F3D2B] hover:underline"
                >
                  Open Pin
                </a>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Quick Overlay Map Controls */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() =>
            setMapTypeId((prev) => (prev === 'roadmap' ? 'hybrid' : 'roadmap'))
          }
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F0]/95 backdrop-blur-sm border border-[#1F3D2B]/15 text-[11px] font-semibold text-[#1F3D2B] shadow-soft hover:bg-white transition-colors"
        >
          <Layers className="w-3.5 h-3.5 text-[#137A3D]" aria-hidden="true" />
          <span>{mapTypeId === 'roadmap' ? 'Satellite' : 'Map'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCameraKey((k) => k + 1);
            setInfoOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F0]/95 backdrop-blur-sm border border-[#1F3D2B]/15 text-[11px] font-semibold text-[#1F3D2B] shadow-soft hover:bg-white transition-colors"
        >
          <Compass className="w-3.5 h-3.5 text-[#137A3D]" aria-hidden="true" />
          <span>Center Pin</span>
        </button>
      </div>
    </div>
  );
}

export function ResortGoogleMap({ heightClass = 'h-[340px] sm:h-[400px]' }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <MapFallbackCard />;
  }

  return (
    <APIProvider apiKey={apiKey} libraries={['marker']} language="en" region="IN">
      <ResortMapInner heightClass={heightClass} />
    </APIProvider>
  );
}

export default ResortGoogleMap;
