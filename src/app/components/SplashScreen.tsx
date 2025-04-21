'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const piecesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current || !piecesRef.current) return;

    // Logo parçalarını oluştur
    const pieces = Array.from({ length: 12 }).map((_, index) => {
      const piece = document.createElement('div');
      piece.className = 'absolute w-full h-full';
      piece.style.clipPath = `polygon(${getRandomPoints(4).join(', ')})`;
      
      const imageContainer = document.createElement('div');
      imageContainer.className = 'relative w-full h-full';
      imageContainer.innerHTML = `
        <img
          src="/logo1.png"
          alt="Logo piece"
          class="absolute w-full h-full object-contain"
          style="transform-origin: center center;"
        />
      `;
      
      piece.appendChild(imageContainer);
      piecesRef.current?.appendChild(piece);
      return piece;
    });

    // Işık efektleri
    const lights = Array.from({ length: 20 }).map(() => {
      const light = document.createElement('div');
      light.className = 'absolute w-1 h-1 rounded-full bg-gradient-to-r from-red-500 to-white';
      containerRef.current?.appendChild(light);
      return light;
    });

    // Animasyon timeline'ı
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      }
    });

    // Başlangıç durumu
    tl.set(containerRef.current, { autoAlpha: 0 })
      .set(logoRef.current, { autoAlpha: 0 })
      .set(pieces, {
        rotationX: "random(-180, 180)",
        rotationY: "random(-180, 180)",
        rotationZ: "random(-180, 180)",
        x: "random(-500, 500)",
        y: "random(-500, 500)",
        z: "random(-500, 500)",
        autoAlpha: 0,
      })
      .set(lights, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        autoAlpha: 0,
      });

    // Ana animasyon
    tl.to(containerRef.current, {
        autoAlpha: 1,
        duration: 0.5
      })
      // Işıkları göster
      .to(lights, {
        autoAlpha: 1,
        duration: 0.3,
        stagger: {
          amount: 0.5,
          from: "random"
        }
      })
      // Işıkları hareket ettir
      .to(lights, {
        x: "random(-200, 200)",
        y: "random(-200, 200)",
        duration: 1.5,
        ease: "power2.inOut"
      })
      // Parçaları göster ve döndür
      .to(pieces, {
        autoAlpha: 1,
        duration: 0.5,
        stagger: {
          amount: 0.3,
          from: "random"
        }
      })
      // Parçaları birleştir
      .to(pieces, {
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,
        ease: "power4.inOut",
        stagger: {
          amount: 0.4,
          from: "random"
        }
      })
      // Işıkları merkeze topla
      .to(lights, {
        x: 0,
        y: 0,
        scale: 0.5,
        duration: 1,
        ease: "power2.in"
      })
      // Tam logoyu göster
      .to(logoRef.current, {
        autoAlpha: 1,
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out"
      })
      // Parçaları gizle
      .to(pieces, {
        autoAlpha: 0,
        duration: 0.3
      })
      // Final parlama efekti
      .to(logoRef.current, {
        filter: "brightness(1.5)",
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      })
      // Sahneyi kapat
      .to([containerRef.current], {
        autoAlpha: 0,
        duration: 0.5,
        delay: 0.3
      });

    // Cleanup
    return () => {
      [...pieces, ...lights].forEach(element => element.remove());
    };
  }, [onComplete]);

  // Rastgele polygon noktaları oluştur
  const getRandomPoints = (count: number) => {
    const points = [];
    for (let i = 0; i < count; i++) {
      points.push(`${Math.random() * 100}% ${Math.random() * 100}%`);
    }
    return points;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-50 flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <div className="relative w-96 h-48">
        <div
          ref={piecesRef}
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        />
        <div
          ref={logoRef}
          className="absolute inset-0"
        >
          <Image
            src="/logo1.png"
            alt="Taşdanlar Otomotiv"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen; 