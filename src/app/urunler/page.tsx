'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  {
    id: 'rotor',
    title: 'Rotor',
    description: '',
    image: '/products/alter.jpg'
  },
  {
    id: 'atesleme',
    title: 'Ateşleme Modülü',
    description: '',
    image: '/products/atesleme.jpg'
  },
  {
    id: 'camsilecek',
    title: 'Cam Silecek Motoru',
    description: '',
    image: '/products/camsilecek.jpg'
  },
  {
    id: 'distributor',
    title: 'Distribütör',
    description: '',
    image: '/products/distt.jpg'
  },
  {
    id: 'alternator',
    title: 'Alternatör',
    description: '',
    image: '/products/alternatorr.png'
  },
  {
    id: 'sigorta-kutusu',
    title: 'Sigorta Kutusu',
    description: '',
    image: '/products/sigortaa.jpg'
  },  {
    id: 'mars-motoru',
    title: 'Marş Motoru',
    description: '',
    image: '/products/mars.jpg'
  },
  {
    id: 'kolifer',
    title: 'Kolifer Motoru',
    description: '',
    image: '/products/kolifer.jpg'
  },
  {
    id: 'kontak',
    title: 'Kontak Anahtarı',
    description: '',
    image: '/products/kontak.jpg'
  },
  {
    id: 'korna',
    title: 'Korna',
    description: '',
    image: '/products/korna.jpg'
  },
  {
    id: 'radyator',
    title: 'Radyatör',
    description: '',
    image: '/products/radyotor.jpg'
  },
  {
    id: 'aydınlatma',
    title: 'Far',
    description: '',
    image: '/products/farr.jpg'
  },
];

const ProductsPage = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/products/urun.jpg"
            alt="Ürünler Hero"
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
            Ürün Kategorilerimiz
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Geniş ürün yelpazemiz ile tüm araç modellerine uygun yedek parçalar
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Aradığınız ürünü bulamadınız mı?
          </h2>
          <Link
            href="/iletisim"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Bizimle İletişime Geçin
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage; 