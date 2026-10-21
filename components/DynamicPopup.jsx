'use client'
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DynamicPopup() {
  const [popup, setPopup] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const res = await fetch("/api/popups", { cache: 'no-store' });
        const data = await res.json();
        if (data && data.active && !checkIfShown(data.id)) {
          setPopup(data);
          setVisible(true);
          markAsShown(data.id);
        }
      } catch (err) {
        console.error("Popup fetch failed:", err);
      }
    };
    fetchPopup();
  }, []);

  // Lock scrolling only while a popup is actually open.
  useEffect(() => {
    if (!visible) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const properties = ["overflow", "position", "top", "width", "height", "overscrollBehavior"];
    const previous = Object.fromEntries(properties.map(key => [key, body.style[key]]));
    Object.assign(body.style, {
      overflow: "hidden", position: "fixed", top: `-${scrollY}px`,
      width: "100%", height: "100%", overscrollBehavior: "none",
    });
    return () => {
      Object.assign(body.style, previous);
      window.scrollTo(0, scrollY);
    };
  }, [visible]);

  const checkIfShown = (id) => {
    if (typeof window === "undefined") return false;
    return getCookie(`popup_${id}_shown`) === "true";
  };

  const markAsShown = (id) => {
    if (typeof window === "undefined") return;
    setCookie(`popup_${id}_shown`, "true", 7);
  };

  const closePopup = () => {
    setVisible(false);
  };

  function getCookie(name) {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  function setCookie(name, value, days) {
    if (typeof document === "undefined") return;
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // 🔥 Detect clicks inside popup custom content
  useEffect(() => {
    if (!visible) return;

    const handleClick = (e) => {
      const target = e.target;
      if (!target) return;

      // Check if user clicked a known "close" button or something with data-close-popup
      const text = target.textContent?.trim().toLowerCase();
      const shouldClose =
        target.hasAttribute("data-close-popup") ||
        ["no thanks", "buy later", "not now", "close", "cancel"].includes(text);

      if (shouldClose) {
        e.preventDefault();
        closePopup();
      }
    };

    // Attach listener inside popup area
    const container = document.getElementById("dynamic-popup-container");
    container?.addEventListener("click", handleClick);

    return () => container?.removeEventListener("click", handleClick);
  }, [visible, popup]);

  if (!popup || !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="popup-backdrop"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            key="popup-container"
            id="dynamic-popup-container"
            className="relative bg-white rounded-3xl shadow-2xl flex flex-col w-full max-w-3xl overflow-hidden"
            style={{ maxHeight: "90vh" }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              aria-label="Close popup"
              className="absolute top-3 right-3 z-10 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all rounded-full w-9 h-9 flex items-center justify-center"
            >
              ✕
            </button>

            {/* Scrollable Content */}
            <div
              className="w-full h-full p-5 sm:p-8 overflow-y-auto text-center flex flex-col items-center justify-center scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            >
              <div
                className="w-full [&_img]:max-w-full [&_iframe]:max-w-full [&_p]:text-balance"
                dangerouslySetInnerHTML={{ __html: popup.customCode }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}