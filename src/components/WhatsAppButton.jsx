import { MessageCircle } from 'lucide-react';
import { siteData } from '../data/site';

export function WhatsAppButton() {
  return (
    <a
      href={siteData.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp for Mayaban Village Resort room tariffs"
      className="fixed bottom-5 right-5 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1F3D2B] text-[#F6F1E7] border border-[#C9A227] shadow-elevated flex items-center justify-center hover:bg-[#14291C] hover:scale-105 transition-all duration-200"
    >
      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#DFC15E]" aria-hidden="true" />
    </a>
  );
}
