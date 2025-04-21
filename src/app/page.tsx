'use client';

import React, { useState, useEffect } from 'react';
import Hero from '@/app/components/Hero';
import FeaturedProducts from '@/app/components/FeaturedProducts';
import Brands from '@/app/components/Brands';
import News from '@/app/components/News';
import SplashScreen from '@/app/components/SplashScreen';
import { motion } from 'framer-motion';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Local Storage'da daha önce ziyaret edilip edilmediğini kontrol et
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setShowSplash(false);
      setShowContent(true);
    } else {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setTimeout(() => setShowContent(true), 500);
  };

  return (
    <main>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Hero />
          <FeaturedProducts />
          <Brands />
          <News />
        </motion.div>
      )}
    </main>
  );
} 