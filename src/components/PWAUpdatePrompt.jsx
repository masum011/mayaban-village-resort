import { useEffect, useState } from 'react';
import { Download, RefreshCw, WifiOff, X } from 'lucide-react';
import { registerSW } from 'virtual:pwa-register';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export function PWAInstallButton({ className = '' }) {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) return null;

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A227]/50 text-xs font-semibold tracking-wider uppercase text-[#DFC15E] hover:bg-[#C9A227] hover:text-[#14291C] transition-colors ${className}`}
      >
        <Download className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Install App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A227]/50 text-xs font-semibold tracking-wider uppercase text-[#DFC15E] hover:bg-[#C9A227] hover:text-[#14291C] transition-colors ${className}`}
        >
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Add to Home Screen</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#14291C]/75 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-[#FAF7F0] text-[#1F3D2B] p-6 shadow-elevated border border-[#C9A227]/30">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-semibold">Install Mayaban App</h3>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Close install instructions"
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#1F3D2B]/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-3 text-sm text-[#57534E] leading-relaxed">
                1. Tap the <strong>Share</strong> icon in your Safari toolbar.
                <br />
                2. Scroll down and select <strong>Add to Home Screen</strong>.
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
}

export function PWAUpdatePrompt() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [updateServiceWorker, setUpdateServiceWorker] = useState(null);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return undefined;

    const updateSW = registerSW({
      onNeedRefresh() {
        setNeedRefresh(true);
      },
      onOfflineReady() {
        // App shell cached quietly for repeat visits
      },
    });

    setUpdateServiceWorker(() => updateSW);
    return undefined;
  }, []);

  return (
    <>
      {!isOnline && (
        <div
          role="status"
          className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14291C] text-[#F6F1E7] border border-[#C9A227]/40 text-xs font-medium shadow-elevated"
        >
          <WifiOff className="w-3.5 h-3.5 text-[#DFC15E]" aria-hidden="true" />
          <span>Offline Mode · Viewing Cached Resort Pages</span>
        </div>
      )}

      {needRefresh && (
        <div
          role="alert"
          className="fixed bottom-20 right-5 z-50 max-w-xs bg-[#14291C] text-[#F6F1E7] rounded-2xl border border-[#C9A227] p-4 shadow-elevated space-y-3"
        >
          <p className="text-xs font-medium leading-relaxed">
            New version available, refresh to load the latest Mayaban Village Resort updates.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updateServiceWorker && updateServiceWorker(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C9A227] text-[#14291C] text-xs font-semibold uppercase tracking-wider"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={() => setNeedRefresh(false)}
              className="px-3 py-2 text-xs text-[#F6F1E7]/75 hover:text-white"
            >
              Later
            </button>
          </div>
        </div>
      )}
    </>
  );
}
