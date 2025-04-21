'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Bir hata oluştu');
      }

      setStatus({
        type: 'success',
        message: 'E-bülten kaydınız başarıyla alındı.',
      });
      setEmail('');
    } catch (err) {
      setStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Bir hata oluştu',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kurumsal Bilgiler */}
          <div>
            <h3 className="text-xl font-bold mb-4">Taşdanlar Otomotiv</h3>
            <p className="mb-4">Otomotiv yedek parça sektöründe güvenilir çözüm ortağınız.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white"><FaFacebook size={24} /></a>
              <a href="#" className="hover:text-white"><FaTwitter size={24} /></a>
              <a href="#" className="hover:text-white"><FaInstagram size={24} /></a>
              <a href="#" className="hover:text-white"><FaLinkedin size={24} /></a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li><Link href="/kurumsal" className="hover:text-white">Hakkımızda</Link></li>
              <li><Link href="/urunler" className="hover:text-white">Ürünlerimiz</Link></li>
              <li><Link href="/markalar" className="hover:text-white">Markalarımız</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/iletisim" className="hover:text-white">İletişim</Link></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-xl font-bold mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li>Adres: Sanayi Mah Kozalı Sk Çarşı Yapı Avm A Blok No 10 İzmit/Kocaeli</li>
              <li>Telefon: +90 (262) 335 10 15</li>
              <li>E-posta: info@tasdanlar.com.tr</li>
              <li className="flex items-center space-x-2">
                <FaWhatsapp size={20} />
                <span>WhatsApp: +90 530 938 27 51</span>
              </li>
            </ul>
          </div>

          {/* Bülten */}
          <div>
            <h3 className="text-xl font-bold mb-4">E-Bülten</h3>
            <p className="mb-4">Kampanyalardan ve yeniliklerden haberdar olun.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  disabled={loading}
                />
              </div>
              {status.type && (
                <div
                  className={`text-sm ${
                    status.type === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {status.message}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors ${
                  loading ? 'bg-blue-700 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Gönderiliyor...' : 'Abone Ol'}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Taşdanlar Otomotiv. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 