import React, { useState } from 'react';
import { ArrowRight, Gem, Menu, Phone, Ruler, ShieldCheck, Sparkles, Truck, X } from 'lucide-react';
import { contacts, nav, projectReferences } from '../data';
import { trackEvent } from '../leadService';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Кухня в Дом">
        <span className="brand-mark"><img src="/images/kuhnya-v-dom-logo.png" alt="" /></span>
        <span><strong>Кухня в Дом</strong><small>кухни и мебель на заказ</small></span>
      </a>
      <nav className="desktop-nav" aria-label="Навигация по сайту">
        {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <a className="icon-link" href={`tel:${contacts.phoneClean}`} aria-label="Позвонить" onClick={() => trackEvent('phone_click', { placement: 'header' })}>
          <Phone size={18} /><span>{contacts.phone}</span>
        </a>
        <button className="icon-button" type="button" onClick={() => setOpen(true)} aria-label="Открыть меню"><Menu size={22} /></button>
      </div>
      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Мобильное меню">
          <div className="mobile-panel">
            <button className="icon-button" type="button" onClick={() => setOpen(false)} aria-label="Закрыть меню"><X size={22} /></button>
            {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
            <a className="button primary" href="#quiz" onClick={() => setOpen(false)}>Получить проект</a>
          </div>
        </div>
      )}
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <img className="hero-bg" src={projectReferences[0].image} alt="Современная кухня на заказ в Анапе" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow"><Sparkles size={18} /> Анапа · ТЦ «Большой» · 2 этаж</p>
        <h1>Кухня,<br />в которую хочется возвращаться</h1>
        <p className="lead">Спроектируем кухню и мебель под ваш дом, привычки и бюджет. До заказа покажем планировку, фасады и ориентир сметы.</p>
        <div className="hero-actions">
          <a className="button primary" href="#quiz" onClick={() => trackEvent('quiz_open', { placement: 'hero' })}>Получить дизайн-проект <ArrowRight size={19} /></a>
          <a className="button glass" href={`tel:${contacts.phoneClean}`} onClick={() => trackEvent('phone_click', { placement: 'hero' })}><Phone size={18} /> Позвонить</a>
        </div>
        <p className="hero-note"><ShieldCheck size={16} /> Первичная консультация и проект — без оплаты</p>
      </div>
      <div className="hero-studio" aria-label="Бесплатный дизайн-проект кухни">
        <img src="/images/kuhnya-v-dom-logo.png" alt="Логотип Кухня в Дом" />
        <span>Бесплатный проект</span><strong>Планировка + фасады + ориентир сметы</strong>
        <p>Соберем основу кухни за короткий квиз и уточним детали по телефону.</p>
        <a href="#quiz">Начать квиз <ArrowRight size={16} /></a>
      </div>
      <div className="hero-proof" aria-label="Что входит в работу">
        <span><Ruler size={18} /> Замер</span><span><Gem size={18} /> 3D-проект</span><span><Truck size={18} /> Доставка</span><span><ShieldCheck size={18} /> Установка</span>
      </div>
    </section>
  );
}
