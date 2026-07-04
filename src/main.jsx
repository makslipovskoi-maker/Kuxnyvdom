import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  Check,
  ChevronDown,
  Clock3,
  Gem,
  MapPin,
  Menu,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';
import { benefits, contacts, directions, faqs, materials, nav, process, reviews } from './data';
import './styles.css';

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Кухня в Дом">
        <span className="brand-mark">КД</span>
        <span>
          <strong>Кухня в Дом</strong>
          <small>кухни и мебель на заказ</small>
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Навигация">
        {nav.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="icon-link" href={`tel:${contacts.phoneClean}`} aria-label="Позвонить">
          <Phone size={18} />
          <span>{contacts.phone}</span>
        </a>
        <button className="icon-button" type="button" onClick={() => setOpen(true)} aria-label="Открыть меню">
          <Menu size={22} />
        </button>
      </div>
      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <div className="mobile-panel">
            <button className="icon-button" type="button" onClick={() => setOpen(false)} aria-label="Закрыть меню">
              <X size={22} />
            </button>
            {nav.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
            <a className="button primary" href="#quiz" onClick={() => setOpen(false)}>Получить проект</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <img className="hero-bg" src="/images/hero-kitchen.png" alt="Современная кухня на заказ в Анапе" />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow"><Sparkles size={18} /> Анапа, ТЦ Большой</p>
        <h1>Кухня в Дом</h1>
        <p className="lead">
          Кухни и мебель на заказ в Анапе с бесплатным дизайн-проектом, замером,
          подбором материалов и установкой под ключ.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#quiz">
            Получить дизайн-проект <ArrowRight size={19} />
          </a>
          <a className="button glass" href={`tel:${contacts.phoneClean}`}>
            <Phone size={18} /> Позвонить
          </a>
        </div>
      </div>
      <div className="hero-proof" aria-label="Ключевые преимущества">
        <span><Ruler size={18} /> Замер</span>
        <span><Gem size={18} /> 3D-проект</span>
        <span><Truck size={18} /> Доставка</span>
        <span><ShieldCheck size={18} /> Установка</span>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title, text }) {
  return (
    <div className="section-title">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Benefits() {
  return (
    <section className="section" id="benefits">
      <SectionTitle
        kicker="Почему выбирают нас"
        title="Лендинг продает доверие, а кухня начинается с понятного проекта"
        text="Для рекламы и поиска важны не только красивые фото, но и ясный путь клиента: увидеть, понять, оставить заявку."
      />
      <div className="benefit-grid">
        {benefits.map(([title, text], index) => (
          <article className="tile" key={title}>
            <span className="tile-number">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Directions() {
  return (
    <section className="section direction-band">
      <SectionTitle
        kicker="Что делаем"
        title="Кухни, которые попадают в размер, стиль и бюджет"
      />
      <div className="direction-grid">
        {directions.map((item) => (
          <article className="direction-card" key={item.title}>
            <span>{item.tag}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <a href="#quiz">Рассчитать <ArrowRight size={16} /></a>
          </article>
        ))}
      </div>
    </section>
  );
}

function LeadForm() {
  const [sent, setSent] = useState(false);

  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const current = JSON.parse(localStorage.getItem('kuhnya-v-dom-leads') || '[]');
    localStorage.setItem('kuhnya-v-dom-leads', JSON.stringify([{ ...values, createdAt: new Date().toISOString() }, ...current]));
    form.reset();
    setSent(true);
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <label>
        Имя
        <input name="name" placeholder="Как к вам обращаться" required />
      </label>
      <label>
        Телефон
        <input name="phone" inputMode="tel" placeholder="+7 ___ ___ __ __" required />
      </label>
      <label>
        Какая кухня нужна?
        <select name="type" defaultValue="">
          <option value="" disabled>Выберите вариант</option>
          <option>Прямая кухня</option>
          <option>Угловая кухня</option>
          <option>Кухня с островом</option>
          <option>Модульная кухня</option>
          <option>Пока нужна консультация</option>
        </select>
      </label>
      <label>
        Комментарий
        <textarea name="comment" rows="4" placeholder="Размер, стиль, сроки или важные пожелания" />
      </label>
      <button className="button primary" type="submit">
        Отправить заявку <Check size={18} />
      </button>
      {sent && (
        <div className="success">
          Заявка сохранена. Для быстрого ответа позвоните: <a href={`tel:${contacts.phoneClean}`}>{contacts.phone}</a>
        </div>
      )}
    </form>
  );
}

function Quiz() {
  return (
    <section className="section quiz-section" id="quiz">
      <div className="quiz-copy">
        <p className="kicker">Бесплатный дизайн-проект</p>
        <h2>Оставьте заявку, и мы покажем, какой может быть ваша кухня</h2>
        <p>
          Подберем планировку, фасады, столешницу и фурнитуру. Если размеров еще нет,
          начнем с консультации и договоримся о замере в Анапе.
        </p>
        <div className="mini-list">
          <span><BadgeCheck size={18} /> Без обязательств</span>
          <span><BadgeCheck size={18} /> Расчет под бюджет</span>
          <span><BadgeCheck size={18} /> Звонок в рабочее время</span>
        </div>
      </div>
      <LeadForm />
    </section>
  );
}

function Materials() {
  return (
    <section className="section" id="materials">
      <SectionTitle
        kicker="Материалы и фактуры"
        title="Покажем фасады живьем и соберем сочетание под интерьер"
        text="На сайте используем реальные материалы, чтобы клиент видел не абстрактную картинку, а будущий характер кухни."
      />
      <div className="material-grid">
        {materials.map(([title, text, image]) => (
          <article className="material-card" key={title}>
            <img src={image} alt={title} />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section process-band" id="process">
      <SectionTitle
        kicker="Как работаем"
        title="Пять спокойных шагов от идеи до установленной кухни"
      />
      <div className="process-list">
        {process.map(([num, title, text]) => (
          <article className="process-row" key={num}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section" id="reviews">
      <SectionTitle kicker="Отзывы" title="Клиенты ценят понятный расчет и спокойную коммуникацию" />
      <div className="review-grid">
        {reviews.map(([name, text]) => (
          <article className="review-card" key={name}>
            <div className="stars">★★★★★</div>
            <p>{text}</p>
            <strong>{name}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section faq-section">
      <SectionTitle kicker="Вопросы" title="Коротко о цене, проекте и зоне работы" />
      <div className="faq-list">
        {faqs.map(([question, answer], index) => (
          <article className="faq-item" key={question}>
            <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
              {question}
              <ChevronDown size={20} className={open === index ? 'rotated' : ''} />
            </button>
            {open === index && <p>{answer}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section className="section contacts-section" id="contacts">
      <div className="contact-copy">
        <p className="kicker">Контакты</p>
        <h2>Ждем вас в ТЦ Большой на Анапском шоссе</h2>
        <p className="contact-line"><Phone size={19} /><a href={`tel:${contacts.phoneClean}`}>{contacts.phone}</a></p>
        <p className="contact-line"><MapPin size={19} />{contacts.address}</p>
        <p className="contact-line"><Clock3 size={19} />{contacts.worktime}</p>
        <div className="contact-actions">
          <a className="button primary" href={`tel:${contacts.phoneClean}`}>Позвонить</a>
          <a className="button secondary" href={contacts.mapUrl} target="_blank" rel="noreferrer">Открыть карту</a>
        </div>
      </div>
      <a className="map-preview" href={contacts.mapUrl} target="_blank" rel="noreferrer" aria-label="Открыть адрес на карте">
        <MapPin size={34} />
        <span>Анапа</span>
        <strong>Анапское шоссе 20</strong>
        <small>ТЦ Большой, 2 этаж</small>
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Кухня в Дом</strong>
        <span>Кухни и мебель на заказ в Анапе</span>
      </div>
      <a href={`tel:${contacts.phoneClean}`}>{contacts.phone}</a>
      <a href={contacts.mapUrl} target="_blank" rel="noreferrer">{contacts.shortAddress}</a>
    </footer>
  );
}

function StickyBar() {
  return (
    <div className="sticky-bar">
      <a href={`tel:${contacts.phoneClean}`}><Phone size={17} /> Позвонить</a>
      <a href="#quiz"><Calculator size={17} /> Заявка</a>
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Directions />
        <Quiz />
        <Materials />
        <Process />
        <Reviews />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
