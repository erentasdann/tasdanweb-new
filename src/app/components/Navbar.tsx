'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: 'Ana Sayfa', href: '/' },
    { title: 'Kurumsal', href: '/kurumsal' },
    { title: 'Ürünler', href: '/urunler' },
    { title: 'Markalarımız', href: '/markalar' },
    { title: 'Bayi Olun', href: '/bayi-ol' },
    { title: 'İnsan Kaynakları', href: '/insan-kaynaklari' },
    { title: 'İletişim', href: '/iletisim' },
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="relative w-[240px] h-[60px]">
              <Image
                src="/logo1.png"
                alt="Şirket Logo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 180px, 240px"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.title}
              </Link>
            ))}
            <Link
              href="/teklif-al"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Teklif Al
            </Link>
            <a
              href="https://odeme.tasdanlar.com.tr/Account/Login?returnUrl=%2f"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
            >
              E-Tahsilat
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <Link
              href="/teklif-al"
              className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              Teklif Al
            </Link>
            <a
              href="https://odeme.tasdanlar.com.tr/Account/Login?returnUrl=%2f"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white block px-3 py-2 mt-1 rounded-md text-base font-medium hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              E-Tahsilat
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 