"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Exibe loader ao entrar no site
    setLoading(true);

    // Simula carregamento de rota (tempo mínimo de exibição)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [pathname]); // dispara toda vez que a rota mudar

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-[#000d2e] via-[#0a1b3d] to-[#4a00e0] flex items-center justify-center z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Bola girando */}
            <motion.div
              animate={{ rotate: 180 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <Image
                src="/img/bolaGrande.svg"
                alt="Logo"
                width={100}
                height={100}
                priority
                className="drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
