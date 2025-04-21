'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const positions = [
  {
    title: 'Satış Danışmanı',
    department: 'Satış',
    location: 'Kocaeli',
    type: 'Tam Zamanlı',
    description: 'Otomotiv yedek parça satışında deneyimli, müşteri ilişkilerinde başarılı satış danışmanları arıyoruz.'
  },
  {
    title: 'Depo Sorumlusu',
    department: 'Lojistik',
    location: 'Kocaeli',
    type: 'Tam Zamanlı',
    description: 'Yedek parça depo yönetimi ve stok kontrolünde deneyimli depo sorumlusu arayışımız bulunmaktadır.'
  },
  {
    title: 'Muhasebe Uzmanı',
    department: 'Muhasebe',
    location: 'Kocaeli',
    type: 'Tam Zamanlı',
    description: 'Şirketimizin muhasebe departmanında görev alacak, tercihen otomotiv sektöründe deneyimli muhasebe uzmanı arayışımız bulunmaktadır.'
  },
  {
    title: 'Plasiyer',
    department: 'Saha Satış',
    location: 'Kocaeli',
    type: 'Tam Zamanlı',
    description: 'Otomotiv yedek parça sektöründe saha satış deneyimi olan, aktif araç kullanabilen, müşteri ilişkilerinde başarılı plasiyer arıyoruz.'
  }
];

const HumanResourcesPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    education: '',
    message: ''
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const formDataToSend = new FormData();
      
      // Form verilerini FormData'ya ekle
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // CV dosyasını ekle
      if (cvFile) {
        formDataToSend.append('cv', cvFile);
      }

      const response = await fetch('/api/send-hr-email', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Başvurunuz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          education: '',
          message: ''
        });
        setCvFile(null);
      } else {
        throw new Error(data.message || 'Bir hata oluştu');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Başvuru gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Dosya boyutu kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitStatus({
          type: 'error',
          message: 'CV dosyası 5MB\'dan küçük olmalıdır.',
        });
        return;
      }
      // Dosya tipi kontrolü
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setSubmitStatus({
          type: 'error',
          message: 'Lütfen PDF veya Word formatında bir CV yükleyin.',
        });
        return;
      }
      setCvFile(file);
      setSubmitStatus({ type: null, message: '' });
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/hr/ik.jpg"
            alt="İnsan Kaynakları"
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
            Kariyer Fırsatları
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Otomotiv sektörünün lider şirketinde kariyer fırsatlarını keşfedin
          </motion.p>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Açık Pozisyonlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {position.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {position.department}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {position.location}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {position.type}
                  </span>
                </div>
                <p className="text-gray-600">
                  {position.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white shadow-xl rounded-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              İş Başvuru Formu
            </h2>

            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başvurulan Pozisyon
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    disabled={loading}
                  >
                    <option value="">Seçiniz</option>
                    {positions.map(position => (
                      <option key={position.title} value={position.title}>
                        {position.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eğitim Bilgileri
                </label>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  disabled={loading}
                  placeholder="Eğitim durumunuz ve mezun olduğunuz okullar"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İş Deneyimi
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  disabled={loading}
                  placeholder="Önceki iş deneyimleriniz ve pozisyonlarınız"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eklemek İstedikleriniz
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  disabled={loading}
                  placeholder="Eklemek istediğiniz bilgiler"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CV Yükle (PDF veya Word - Max. 5MB)
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100
                      cursor-pointer"
                    disabled={loading}
                  />
                </div>
                {cvFile && (
                  <p className="mt-2 text-sm text-gray-600">
                    Seçilen dosya: {cvFile.name}
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center ${
                    loading ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Gönderiliyor...
                    </>
                  ) : (
                    'Başvuru Yap'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HumanResourcesPage; 