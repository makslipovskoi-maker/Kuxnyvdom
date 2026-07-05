import React, { useState } from 'react';
import { Calculator, ChevronDown, Clock3, MapPin, Phone } from 'lucide-react';
import { contacts, faqs, process, reachPoints, reviews, seoCatalogLinks } from '../data';
import { trackEvent } from '../leadService';
import { SectionTitle } from './ShowroomServices';

export function LowerSections() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <section className="section reach-section"><SectionTitle kicker="Рядом с вами" title="Анапа и Анапский район — с понятным маршрутом к проекту" text="Можно начать с квиза, позвонить или приехать в салон, чтобы увидеть материалы и обсудить кухню лично." /><div className="reach-grid">{reachPoints.map(([title, text]) => <article key={title}><MapPin size={20} /><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="section process-band" id="process"><SectionTitle kicker="Как работаем" title="Пять спокойных шагов от идеи до установленной кухни" /><div className="process-list">{process.map(([num, title, text]) => <article className="process-row" key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="section" id="reviews"><SectionTitle kicker="Отзывы" title="Клиенты ценят понятный расчет и спокойную коммуникацию" /><div className="review-grid">{reviews.map(([name, text]) => <article className="review-card" key={name}><div className="stars" aria-label="Пять звезд">★★★★★</div><p>{text}</p><strong>{name}</strong></article>)}</div></section>
      <section className="section faq-section"><SectionTitle kicker="Вопросы" title="Коротко о цене, проекте и зоне работы" /><div className="faq-list">{faqs.map(([question, answer], index) => <article className="faq-item" key={question}><button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>{question}<ChevronDown size={20} className={open === index ? 'rotated' : ''} /></button>{open === index && <p>{answer}</p>}</article>)}</div></section>
      <section className="section contacts-section" id="contacts">
        <div className="contact-copy"><p className="kicker">Контакты</p><h2>Ждем вас в ТЦ «Большой» на Анапском шоссе</h2><p className="contact-line"><Phone size={19} /><a href={`tel:${contacts.phoneClean}`} onClick={() => trackEvent('phone_click', { placement: 'contacts' })}>{contacts.phone}</a></p><p className="contact-line"><MapPin size={19} />{contacts.address}</p><p className="contact-line"><Clock3 size={19} />{contacts.worktime}</p><div className="contact-actions"><a className="button primary" href={`tel:${contacts.phoneClean}`}>Позвонить</a><a className="button secondary" href={contacts.mapUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('map_open', { placement: 'contacts' })}>Открыть карту</a></div></div>
        <a className="map-preview" href={contacts.mapUrl} target="_blank" rel="noreferrer" aria-label="Открыть адрес на карте"><MapPin size={34} /><span>Анапа</span><strong>Анапское шоссе 20</strong><small>ТЦ «Большой», 2 этаж</small></a>
      </section>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div><strong>Кухня в Дом</strong><span>Кухни и мебель на заказ в Анапе</span></div>
        <a href={`tel:${contacts.phoneClean}`}>{contacts.phone}</a>
        <a href={contacts.mapUrl} target="_blank" rel="noreferrer">{contacts.shortAddress}</a>
        <a className="footer-privacy" href="/privacy.html">Политика конфиденциальности</a>
      </div>
      <div className="footer-seo" aria-label="Популярные направления">
        {seoCatalogLinks.map((item) => <a href="#quiz" key={item}>{item}</a>)}
      </div>
    </footer>
  );
}

export function StickyBar() {
  return <div className="sticky-bar"><a href={`tel:${contacts.phoneClean}`} onClick={() => trackEvent('phone_click', { placement: 'sticky' })}><Phone size={17} /> Позвонить</a><a href="#quiz" onClick={() => trackEvent('quiz_open', { placement: 'sticky' })}><Calculator size={17} /> Заявка</a></div>;
}
