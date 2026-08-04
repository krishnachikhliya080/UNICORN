/**
 * WhatsAppButton — Floating chat button with delayed welcome message popup.
 * Design: Green WhatsApp button with pulse animation. After 8 seconds, a welcome
 * popup slides up with a greeting, brief message, and quick "Start Chat" CTA.
 * The popup can be dismissed permanently for the session.
 */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "918690354354";
const DEFAULT_MESSAGE = "Hello! I'm interested in your packaging solutions. Could you share more details?";
const POPUP_DELAY_MS = 8000;

export default function WhatsAppButton() {
  const [showPopup, setShowPopup] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hasPulse, setHasPulse] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!dismissed) setShowPopup(true);
    }, POPUP_DELAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dismissed]);

  const handleClick = () => {
    setHasPulse(false);
    setShowPopup(false);
    setDismissed(true);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDismiss = () => {
    setShowPopup(false);
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Welcome popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" as const }}
            className="bg-white rounded-sm shadow-xl shadow-charcoal/15 p-5 w-72 relative border border-charcoal/5"
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-charcoal text-white rounded-full text-[11px] flex items-center justify-center hover:bg-charcoal/80 transition-colors shadow-sm"
              aria-label="Dismiss"
            >
              ×
            </button>

            {/* Avatar + greeting */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-5 h-5 fill-[#25D366]">
                  <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.032 2.264 0 .33.043.614.143.945.372 1.374 1.176 2.75 2.163 3.896 1.074 1.247 2.335 2.335 3.982 2.964.73.272 1.547.473 2.335.473 1.303 0 2.063-.545 2.063-1.247 0-.143-.043-.302-.1-.444-.143-.287-1.045-.602-1.39-.745-.344-.144-.573-.215-.73-.215zm-7.08 12.288c-2.492 0-4.926-.674-7.06-1.935l-.502-.3-.53.072-1.547.2c-.473.072-.945.072-1.418.072-2.292 0-4.298-1.147-5.454-2.964-.573-.945-.945-2.063-.945-3.238 0-2.148.717-4.14 1.934-5.715L1.934 9.225c1.575-2.549 4.24-4.14 7.232-4.14 5.31 0 9.623 4.312 9.623 9.622 0 2.12-.674 4.126-1.934 5.715l-1.447 1.675-.072.545c.072.473.143.945.143 1.418 0 2.292-1.147 4.298-2.964 5.454z" />
                </svg>
              </div>
              <div>
                <p className="text-body text-sm font-semibold text-charcoal">Unicorn Print Pack</p>
                <p className="text-body text-[10px] text-text-muted">Typically replies instantly</p>
              </div>
            </div>

            {/* Message bubble */}
            <div className="bg-[#E8F5E9] rounded-sm rounded-tl-none p-3 mb-4">
              <p className="text-body text-xs text-charcoal leading-relaxed">
                Hi there! 👋 Need help with custom packaging? Chat with us for quick assistance and free quotes.
              </p>
            </div>

            {/* Start chat button */}
            <button
              onClick={handleClick}
              className="w-full px-4 py-2.5 bg-[#25D366] hover:bg-[#1fb855] text-white text-sm font-semibold rounded-sm transition-colors duration-200 active:scale-[0.97] shadow-sm"
            >
              Start Chat →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" as const }}
      >
        <div className="relative">
          {hasPulse && (
            <>
              <div className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping" style={{ animationDuration: "2s" }} />
              <div className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
            </>
          )}
          <button
            onClick={handleClick}
            className="relative w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 transition-colors duration-300 active:scale-[0.93]"
            aria-label="Chat on WhatsApp"
          >
            <svg viewBox="0 0 32 32" className="w-7 h-7 md:w-8 md:h-8 fill-current">
              <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.032 2.264 0 .33.043.614.143.945.372 1.374 1.176 2.75 2.163 3.896 1.074 1.247 2.335 2.335 3.982 2.964.73.272 1.547.473 2.335.473 1.303 0 2.063-.545 2.063-1.247 0-.143-.043-.302-.1-.444-.143-.287-1.045-.602-1.39-.745-.344-.144-.573-.215-.73-.215zm-7.08 12.288c-2.492 0-4.926-.674-7.06-1.935l-.502-.3-.53.072-1.547.2c-.473.072-.945.072-1.418.072-2.292 0-4.298-1.147-5.454-2.964-.573-.945-.945-2.063-.945-3.238 0-2.148.717-4.14 1.934-5.715L1.934 9.225c1.575-2.549 4.24-4.14 7.232-4.14 5.31 0 9.623 4.312 9.623 9.622 0 2.12-.674 4.126-1.934 5.715l-1.447 1.675-.072.545c.072.473.143.945.143 1.418 0 2.292-1.147 4.298-2.964 5.454z" />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
