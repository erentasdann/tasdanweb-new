'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Rotor',
    image: '/products/alter.jpg',
    link: '/urunler/rotor'
  },
  {
    id: 2,
    name: 'Ateşleme Modülü',
    image: '/products/atesleme.jpg',
    link: '/urunler/atesleme'
  },
  {
    id: 3,
    name: 'Cam Silecek Motoru',
    image: '/products/camsilecek.jpg',
    link: '/urunler/cam-silecek'
  },
  {
    id: 4,
    name: 'Distribütör',
    description: '',
    image: '/products/distt.jpg',
    link: '/urunler/distributor'
  },
  {
    id: 5,
    name: 'Alternatör',
    description: '',
    image: '/products/alternatorr.png',
    link: '/urunler/alternator'
  },
  {
    id: 6,
    name: 'Sigorta Kutusu',
    image: '/products/sigortaa.jpg',
    link: '/urunler/sigorta-kutusu'
  },
  {
    id: 7,
    name: 'Marş Motoru',
    image: '/products/mars.jpg',
    link: '/urunler/mars-motoru'
  }
];

// Ürünleri iki kez tekrarlayalım ki sürekli kayma efekti olsun
const duplicatedProducts = [...products, ...products];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Öne Çıkan Ürünlerimiz
          </h2>
          <p className="text-xl text-gray-600">
            En çok tercih edilen yedek parça kategorilerimiz
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll">
            {duplicatedProducts.map((product, index) => (
              <div 
                key={`${product.id}-${index}`}
                className="flex-shrink-0 w-[280px] mx-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full"
                >
                  <Link href={product.link} className="block h-full">
                    <div className="relative h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/urunler"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Tüm Ürünleri İncele
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
          min-width: fit-content;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts; 