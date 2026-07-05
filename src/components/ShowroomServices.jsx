import React from 'react';
import { ArrowRight } from 'lucide-react';
import { benefits, brandPillars, contacts, directions, projectReferences } from '../data';
import { trackEvent } from '../leadService';

export function SectionTitle({ kicker, title, text }) {
  return <div className="section-title"><p className="kicker">{kicker}</p><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

export function Showroom() {
  return (
    <section className="showroom-scene" aria-label="Салон Кухня в Дом">
      <div className="showroom-copy">
        <p className="kicker">Салон в Анапе</p>
        <h2>Выбирайте кухню не по картинке, а по ощущению будущего дома</h2>
        <p>Приезжайте посмотреть фасады и столешницы вживую, обсудить задачу и собрать решение под ваше пространство. Начать можно и онлайн — с короткого квиза.</p>
        <div className="showroom-actions">
          <a className="button primary" href="#quiz">Собрать мою кухню <ArrowRight size={18} /></a>
          <a className="button secondary" href={contacts.mapUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('map_open', { placement: 'showroom' })}>Посмотреть адрес</a>
        </div>
      </div>
      <div className="showroom-collage">
        <img className="showroom-main" src={projectReferences[3].image} alt="Кухня в теплой премиальной отделке" loading="lazy" decoding="async" />
        <div className="showroom-logo-card"><img src="/images/kuhnya-v-dom-logo.png" alt="Логотип Кухня в Дом" loading="lazy" decoding="async" /><span>Кухни и мебель на заказ</span></div>
        <div className="showroom-materials" aria-label="Примеры стилей">
          {projectReferences.slice(0, 4).map((item) => <span key={item.title}><img src={item.image} alt={item.title} loading="lazy" decoding="async" /></span>)}
        </div>
      </div>
      <div className="showroom-stats"><span><strong>10:00–20:00</strong> ежедневно</span><span><strong>ТЦ «Большой»</strong> 2 этаж</span><span><strong>0 ₽</strong> первичный проект</span></div>
    </section>
  );
}

export function BrandAndServices() {
  return (
    <>
      <section className="section brand-manifesto" id="brand">
        <div className="brand-intro"><p className="kicker">Подход к проекту</p><h2>Кухня — не просто гарнитур, а центр будущего дома</h2><p>Начинаем с понятного проекта: показываем, какой может быть кухня, какие материалы подойдут под интерьер и как перейти от идеи к установленной мебели.</p></div>
        <div className="brand-pillars">{brandPillars.map(([title, text]) => <article key={title}><span>{title}</span><p>{text}</p></article>)}</div>
      </section>
      <section className="section" id="benefits">
        <SectionTitle kicker="Почему выбирают нас" title="Покупателю не нужно разбираться в кухнях одному" text="Превращаем сложный выбор в понятный маршрут: стиль, размеры, материалы, бюджет и установка." />
        <div className="benefit-grid">{benefits.map(([title, text], index) => <article className="tile" key={title}><span className="tile-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className="section direction-band">
        <SectionTitle kicker="Что делаем" title="Кухни и мебель, которые попадают в размер, стиль и бюджет" />
        <div className="direction-grid">{directions.map((item) => <article className="direction-card" key={item.title}><span>{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p><a href="#quiz">Рассчитать <ArrowRight size={16} /></a></article>)}</div>
      </section>
    </>
  );
}
