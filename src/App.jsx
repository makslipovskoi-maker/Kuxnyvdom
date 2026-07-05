import React, { useEffect } from 'react';
import { Header, Hero } from './components/HeaderHero';
import { BrandAndServices, Showroom } from './components/ShowroomServices';
import { Portfolio, ProjectAndMaterials } from './components/PortfolioProject';
import { QuizSection } from './components/QuizSection';
import { Footer, LowerSections, StickyBar } from './components/LowerSections';

function useSiteSeo() {
  useEffect(() => {
    const url = window.location.href.split('#')[0];
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', url);

    const ymId = String(import.meta.env.VITE_YM_ID || '').trim();
    if (!/^\d+$/.test(ymId) || window.ym) return;
    window.ym = function metrikaStub(...args) {
      (window.ym.a = window.ym.a || []).push(args);
    };
    window.ym.l = Date.now();

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://mc.yandex.ru/metrika/tag.js';
    script.onload = () => window.ym(Number(ymId), 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });
    document.head.appendChild(script);
  }, []);
}

export default function App() {
  useSiteSeo();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Showroom />
        <BrandAndServices />
        <Portfolio />
        <ProjectAndMaterials />
        <QuizSection />
        <LowerSections />
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
