'use client';

import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  {
    id: 'mako',
    name: 'Mako',
    description: 'Otomotiv teknolojisinde dünya lideri',
    logo: '/brands/mako.png',
    website: 'https://www.mako.com.tr/tr/'
  },
  {
    id: 'magnetti-marelli',
    name: 'Marelli',
    description: 'Yenilikçi otomotiv teknolojileri',
    logo: '/brands/MARELLİ.png',
    website: 'https://www.marelli.com/'
  }
];

const BrandsPage = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/brands/marka.jpg"
            alt="Markalarımız"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            İş Ortaklarımız
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Sektörün önde gelen markaları ile güvenilir çözümler sunuyoruz
          </motion.p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {brands.map((brand, index) => (
              <motion.a
                key={brand.id}
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-12">
                  <div className="h-32 flex items-center justify-center mb-8">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 text-center mb-4">
                    {brand.name}
                  </h3>
                  <p className="text-lg text-gray-600 text-center">
                    {brand.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 mb-8"
          >
            Kalite ve Güven
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Tüm ürünlerimiz orijinal ve garantilidir. Sektörün lider markalarıyla çalışarak
            müşterilerimize en kaliteli yedek parçaları sunuyoruz.
          </motion.p>
        </div>
      </section>
    </div>
  );
};

export default BrandsPage; 