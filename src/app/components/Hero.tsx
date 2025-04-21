'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

const slides = [
  {
    id: 1,
    title: 'Gücünüze Güç Katar',
    description: 'Otomotiv yedek parça sektöründe 40 yılı aşkın tecrübemizle yanınızdayız.',
    image: '/slider/guc.jpg',
    buttonText: 'Hemen Teklif Al',
    buttonLink: '/teklif-al'
  },
  {
    id: 2,
    title: 'Kalite ve Güvenin Adresi',
    description: 'Orijinal yedek parça garantisi ile araçlarınız güvende.',
    image: '/slider/guven.jpg',
    buttonText: 'Ürünleri İncele',
    buttonLink: '/urunler'
  },
  {
    id: 3,
    title: 'Hızlı Teslimat',
    description: 'Türkiyenin her yerine aynı gün kargo imkanı.',
    image: '/slider/hızlı.jpg',
    buttonText: 'Detaylı Bilgi',
    buttonLink: '/hizmetler'
  },
  {
    id: 4,
    title: 'Profesyonel Destek',
    description: 'Uzman ekibimiz ile ürün desteği.',
    image: '/slider/destek.jpg',
    buttonText: 'İletişime Geç',
    buttonLink: '/iletisim'
  },
  {
    id: 5,
    title: 'Geniş Ürün Yelpazesi',
    description: 'Tüm marka ve modeller için uygun yedek parçalar.',
    image: '/slider/genisurun.jpg',
    buttonText: 'Markalarımız',
    buttonLink: '/markalar'
  }
];

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="mySwiper h-full w-full [&_.swiper-slide]:h-full [&_.swiper-slide]:w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Arka plan görsel */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover brightness-90"
                  loading="eager"
                />
              </div>

              {/* İçerik */}
              <div className="relative h-full z-10 flex items-center justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Link
                      href={slide.buttonLink}
                      className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      {slide.buttonText}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Aşağı kaydırma indikatörü */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-2 h-2 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero; 