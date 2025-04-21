'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (!showSplash) {
      // Splash screen kapandıktan sonra içeriği göster
      setTimeout(() => setContentVisible(true), 100);
    }
  }, [showSplash]);

  return (
    <html lang="tr">
      <body className={inter.className}>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        
        <AnimatePresence mode="wait">
          {contentVisible && (
            <motion.div
              initial={{
                opacity: 0,
                filter: "brightness(2)",
              }}
              animate={{
                opacity: 1,
                filter: "brightness(1)",
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.2
                }}
              >
                <Navbar />
              </motion.div>

              <motion.main
                className="min-h-screen"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.4
                }}
              >
                {children}
              </motion.main>

              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: 0.6
                }}
              >
                <Footer />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </body>
    </html>
  );
} 