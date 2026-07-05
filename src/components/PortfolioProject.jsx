import React, { useState } from 'react';
import { ArrowRight, Check, Gem } from 'lucide-react';
import { materials, portfolioCategories, portfolioInsights, portfolioProjects, projectReferences, studioCards } from '../data';
import { trackEvent } from '../leadService';
import { SectionTitle } from './ShowroomServices';

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const items = activeCategory === 'Все' ? portfolioProjects : portfolioProjects.filter((item) => item.category === activeCategory);
  const featured = items[0] || portfolioProjects[0];
  const gridItems = items.filter((item) => item.title !== featured.title);

  return (
    <section className="section portfolio-section" id="portfolio">
      <div className="portfolio-head"><SectionTitle kicker="Портфолио" title="Кухни, гардеробные, ТВ-зоны и корпусная мебель" text="Выбирайте близкое решение по стилю, задаче и форме хранения — затем адаптируем его под ваши размеры." /><a className="button secondary" href="#quiz">Подобрать похожий проект</a></div>
      <div className="portfolio-insights">{portfolioInsights.map(([title, text]) => <article key={title}><span>{title}</span><p>{text}</p></article>)}</div>
      <div className="portfolio-filters" aria-label="Фильтр портфолио">
        {portfolioCategories.map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} type="button" onClick={() => { setActiveCategory(category); trackEvent('portfolio_filter', { category }); }}>{category}</button>)}
      </div>
      <div className="portfolio-showcase">
        <article className="portfolio-feature"><img src={featured.image} alt={featured.title} loading="lazy" decoding="async" /><div><span>{featured.label}</span><h3>{featured.title}</h3><p>{featured.description}</p><div className="portfolio-tags">{featured.details.map((detail) => <small key={detail}>{detail}</small>)}{featured.source && <small>{featured.source}</small>}</div><a href="#quiz">Хочу похожий проект <ArrowRight size={16} /></a></div></article>
        <div className="portfolio-grid">{gridItems.map((item) => <article className="portfolio-card" key={item.title}><img src={item.image} alt={item.title} loading="lazy" decoding="async" /><div><span>{item.category}</span><strong>{item.title}</strong><p>{item.description}</p><div className="portfolio-tags">{item.details.slice(0, 2).map((detail) => <small key={detail}>{detail}</small>)}{item.source && <small>{item.source}</small>}</div></div></article>)}</div>
      </div>
      <div className="portfolio-cta"><strong>Не нашли свой вариант?</strong><span>Пришлите размеры или фото помещения — соберем проект под вашу задачу.</span><a className="button primary" href="#quiz">Начать с квиза <ArrowRight size={18} /></a></div>
    </section>
  );
}

export function ProjectAndMaterials() {
  return (
    <>
      <section className="section design-board" aria-label="Состав дизайн-проекта кухни">
        <div className="board-copy"><p className="kicker">Проектный лист</p><h2>После квиза у вас появляется понятная основа кухни</h2><p>Фиксируем форму, стиль, бюджет, материалы и сценарий хранения. Менеджер сразу понимает задачу, а вы видите следующий шаг.</p><a className="button primary" href="#quiz">Заполнить квиз <ArrowRight size={18} /></a></div>
        <div className="board-visual">
          <div className="board-hero"><img src={projectReferences[6].image} alt="3D-проект кухни с размерами" loading="lazy" decoding="async" /><span>3D-проект с размерами</span></div>
          <div className="board-panel"><div className="board-panel-top"><span>Кухня в Дом</span><strong>План проекта</strong></div><div className="board-tags"><span>Угловая</span><span>До потолка</span><span>Матовые фасады</span><span>Встроенная техника</span></div><div className="board-checks">{['Размеры помещения', 'Подбор фасадов', 'Ориентир бюджета', 'Удобное хранение'].map((item) => <span key={item}><Check size={16} /> {item}</span>)}</div></div>
          <div className="board-palette">{materials.slice(0, 3).map(([title, , image]) => <figure key={title}><img src={image} alt={title} loading="lazy" decoding="async" /><figcaption>{title}</figcaption></figure>)}</div>
        </div>
      </section>
      <section className="section studio-section" id="studio">
        <div className="studio-visual"><img src={projectReferences[1].image} alt="Светлая современная кухня" loading="lazy" decoding="async" /><div className="studio-badge"><Gem size={20} /><span>3D-концепция</span></div></div>
        <div className="studio-copy"><p className="kicker">Дизайн-проект как сервис</p><h2>Покажем кухню до того, как вы примете решение</h2><p>До заказа вы видите планировку, понимаете материалы и заранее обсуждаете бюджет. Так кухня становится не рискованной покупкой, а понятным домашним проектом.</p><div className="studio-grid">{studioCards.map(([title, text]) => <article key={title}><strong>{title}</strong><span>{text}</span></article>)}</div></div>
      </section>
      <section className="section" id="materials">
        <SectionTitle kicker="Материалы и фактуры" title="Покажем фасады живьем и соберем сочетание под интерьер" text="Чтобы вы видели не абстрактную картинку, а будущий характер кухни." />
        <div className="material-lab"><div><p className="kicker">Фактуры крупным планом</p><h3>Свет, дерево, камень и матовые фасады должны сочетаться до запуска производства</h3><p>В салоне можно посмотреть образцы и сравнить оттенки при разном освещении.</p></div><div className="material-lab-stack">{materials.slice(0, 3).map(([title, , image]) => <span key={title}><img src={image} alt={title} loading="lazy" decoding="async" /></span>)}</div></div>
        <div className="material-grid">{materials.map(([title, text, image]) => <article className="material-card" key={title}><img src={image} alt={title} loading="lazy" decoding="async" /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>
    </>
  );
}
