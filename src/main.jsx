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
import {
  benefits,
  brandPillars,
  contacts,
  directions,
  faqs,
  materials,
  nav,
  portfolioCategories,
  portfolioInsights,
  portfolioProjects,
  process,
  projectReferences,
  reachPoints,
  reviews,
  studioCards,
} from './data';
import './styles.css';

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Кухня в Дом">
        <span className="brand-mark">
          <img src="/images/kuhnya-v-dom-logo.png" alt="" />
        </span>
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
      <img className="hero-bg" src={projectReferences[0].image} alt="Интернет-референс кухни на заказ в Анапе" />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow"><Sparkles size={18} /> Анапа, ТЦ Большой, 2 этаж</p>
        <h1>Кухня в Дом</h1>
        <p className="lead">
          Премиальные кухни и мебель на заказ в Анапе: сначала собираем
          дизайн-проект, материалы и бюджет, потом запускаем кухню в работу.
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
      <div className="hero-studio" aria-label="Бесплатный дизайн-проект кухни">
        <img src="/images/kuhnya-v-dom-logo.png" alt="Логотип Кухня в Дом" />
        <span>Бесплатный проект</span>
        <strong>Планировка + фасады + ориентир сметы</strong>
        <p>Соберем основу кухни за один короткий квиз и уточним детали по телефону.</p>
        <a href="#quiz">Начать квиз <ArrowRight size={16} /></a>
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

function ShowroomScene() {
  return (
    <section className="showroom-scene" aria-label="Витрина салона Кухня в Дом">
      <div className="showroom-copy">
        <p className="kicker">Салон в Анапе</p>
        <h2>Выбирайте кухню<br />не по картинке, а по ощущению<br />будущего дома</h2>
        <p>
          Мы собрали лендинг как цифровой шоурум: крупный визуал кухни, реальные фактуры,
          понятный маршрут к проекту и быстрый квиз для заявки.
        </p>
        <div className="showroom-actions">
          <a className="button primary" href="#quiz">Собрать мою кухню <ArrowRight size={18} /></a>
          <a className="button secondary" href={contacts.mapUrl} target="_blank" rel="noreferrer">Посмотреть адрес</a>
        </div>
      </div>
      <div className="showroom-collage">
        <img className="showroom-main" src={projectReferences[3].image} alt="Премиальный референс кухни Кухня в Дом" />
        <div className="showroom-logo-card">
          <img src="/images/kuhnya-v-dom-logo.png" alt="Логотип Кухня в Дом" />
          <span>Кухни и мебель на заказ</span>
        </div>
        <div className="showroom-materials" aria-label="Примеры фасадов и материалов">
          {projectReferences.slice(0, 4).map((item) => (
            <span key={item.title}>
              <img src={item.image} alt={item.title} />
            </span>
          ))}
        </div>
      </div>
      <div className="showroom-stats">
        <span><strong>10-20</strong> ежедневно</span>
        <span><strong>ТЦ Большой</strong> 2 этаж</span>
        <span><strong>0 руб.</strong> первичный проект</span>
      </div>
    </section>
  );
}

function BrandManifesto() {
  return (
    <section className="section brand-manifesto" id="brand">
      <div className="brand-intro">
        <p className="kicker">Ребрендинг</p>
        <h2>Кухня в Дом — не просто гарнитур, а центр будущего дома</h2>
        <p>
          Мы начинаем с понятного проекта: показываем, какой может быть кухня,
          какие материалы подойдут под интерьер и как спокойно перейти от идеи
          к установленной мебели.
        </p>
      </div>
      <div className="brand-pillars">
        {brandPillars.map(([title, text]) => (
          <article key={title}>
            <span>{title}</span>
            <p>{text}</p>
          </article>
        ))}
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

function DesignBoard() {
  return (
    <section className="section design-board" aria-label="Проектный лист кухни">
      <div className="board-copy">
        <p className="kicker">Проектный лист</p>
        <h2>После квиза у клиента появляется не хаос, а понятная основа кухни</h2>
        <p>
          Мы фиксируем форму, стиль, бюджет, материалы и сценарий хранения. Это делает заявку
          качественной: менеджер сразу понимает задачу, а клиент видит следующий шаг.
        </p>
        <a className="button primary" href="#quiz">Заполнить квиз <ArrowRight size={18} /></a>
      </div>
      <div className="board-visual">
        <div className="board-hero">
          <img src={projectReferences[6].image} alt="3D-проект кухни с размерами в Анапе" />
          <span>3D-проект с размерами</span>
        </div>
        <div className="board-panel">
          <div className="board-panel-top">
            <span>Кухня в Дом</span>
            <strong>План проекта</strong>
          </div>
          <div className="board-tags">
            <span>Угловая</span>
            <span>До потолка</span>
            <span>Матовые фасады</span>
            <span>Встроенная техника</span>
          </div>
          <div className="board-checks">
            {['Размеры помещения', 'Подбор фасадов', 'Ориентир бюджета', 'Удобное хранение'].map((item) => (
              <span key={item}><Check size={16} /> {item}</span>
            ))}
          </div>
        </div>
        <div className="board-palette">
          {materials.slice(0, 3).map(([title, , image]) => (
            <figure key={title}>
              <img src={image} alt={title} />
              <figcaption>{title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProfessionalPortfolio() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const filteredProjects = activeCategory === 'Все'
    ? portfolioProjects
    : portfolioProjects.filter((item) => item.category === activeCategory);
  const featured = filteredProjects[0] || portfolioProjects[0];
  const gridItems = filteredProjects.filter((item) => item.title !== featured.title);

  return (
    <section className="section portfolio-section" id="portfolio">
      <div className="portfolio-head">
        <SectionTitle
          kicker="Профессиональное портфолио"
          title="Кухни, гардеробные, ТВ-зоны и корпусная мебель в одном каталоге"
          text="Собрали реальные проекты и проектные визуализации так, как клиент ищет в интернете: по стилю, задаче, форме хранения и готовности к расчету."
        />
        <a className="button secondary" href="#quiz">Подобрать похожий проект</a>
      </div>
      <div className="portfolio-insights" aria-label="Самые просматриваемые направления">
        {portfolioInsights.map(([title, text]) => (
          <article key={title}>
            <span>{title}</span>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className="portfolio-filters" aria-label="Фильтр портфолио">
        {portfolioCategories.map((category) => (
          <button
            className={activeCategory === category ? 'active' : ''}
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="portfolio-showcase">
        <article className="portfolio-feature">
          <img src={featured.image} alt={featured.title} />
          <div>
            <span>{featured.label}</span>
            <h3>{featured.title}</h3>
            <p>{featured.description}</p>
            <div className="portfolio-tags">
              {featured.details.map((detail) => (
                <small key={detail}>{detail}</small>
              ))}
              {featured.source && <small>{featured.source}</small>}
            </div>
            <a href="#quiz">Хочу похожий проект <ArrowRight size={16} /></a>
          </div>
        </article>
        <div className="portfolio-grid">
          {gridItems.map((item) => (
            <article className="portfolio-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <div>
                <span>{item.category}</span>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
                <div className="portfolio-tags">
                  {item.details.slice(0, 2).map((detail) => (
                    <small key={detail}>{detail}</small>
                  ))}
                  {item.source && <small>{item.source}</small>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="portfolio-cta">
        <strong>Не нашли свой вариант?</strong>
        <span>Пришлите размеры или фото помещения, и мы соберем проект под вашу задачу.</span>
        <a className="button primary" href="#quiz">Начать с квиза <ArrowRight size={18} /></a>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="section" id="benefits">
      <SectionTitle
        kicker="Почему выбирают нас"
        title="Покупателю не нужно разбираться в кухнях одному"
        text="Мы превращаем сложный выбор в понятный маршрут: стиль, размеры, материалы, бюджет и установка."
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

function ProjectStudio() {
  return (
    <section className="section studio-section" id="studio">
      <div className="studio-visual">
        <img src={projectReferences[1].image} alt="Референс светлой кухни Кухня в Дом" />
        <div className="studio-badge">
          <Gem size={20} />
          <span>3D-концепция</span>
        </div>
      </div>
      <div className="studio-copy">
        <p className="kicker">Дизайн-проект как сервис</p>
        <h2>Покажем кухню до того, как вы примете решение</h2>
        <p>
          До заказа вы видите планировку, понимаете материалы и заранее
          обсуждаете бюджет. Так кухня становится не рискованной покупкой,
          а понятным домашним проектом.
        </p>
        <div className="studio-grid">
          {studioCards.map(([title, text]) => (
            <article key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocalReach() {
  return (
    <section className="section reach-section">
      <SectionTitle
        kicker="Охват в Анапе"
        title="Мы рядом: в Анапе, в ТЦ Большой, с понятным маршрутом к проекту"
        text="Можно начать с квиза, позвонить с телефона или приехать в салон, чтобы увидеть материалы и обсудить кухню лично."
      />
      <div className="reach-grid">
        {reachPoints.map(([title, text]) => (
          <article key={title}>
            <MapPin size={20} />
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

const quizSteps = [
  {
    id: 'layout',
    title: 'Какая планировка кухни нужна?',
    hint: 'Если пока не уверены, выберите консультацию. Мы подскажем после замера.',
    options: ['Прямая', 'Угловая', 'П-образная', 'С островом', 'Нужна консультация'],
  },
  {
    id: 'size',
    title: 'Примерная длина кухни',
    hint: 'Можно указать примерно. Точный расчет сделаем после проекта или замера.',
    options: ['До 2,5 м', '2,5-4 м', '4-6 м', 'Больше 6 м', 'Не знаю размер'],
  },
  {
    id: 'style',
    title: 'Какой стиль ближе?',
    hint: 'Это поможет сразу подобрать фасады, ручки и цветовую гамму.',
    options: ['Современная', 'Минимализм', 'Классика', 'Светлая кухня', 'Еще выбираю'],
  },
  {
    id: 'material',
    title: 'Какие фасады рассматриваете?',
    hint: 'Если сложно выбрать, покажем образцы в салоне и объясним разницу.',
    options: ['МДФ', 'ЛДСП', 'Пластик / эмаль', 'Комбинированные', 'Нужна помощь'],
  },
  {
    id: 'appliances',
    title: 'Нужна встроенная техника?',
    hint: 'Это влияет на проект, розетки, размеры модулей и итоговый бюджет.',
    options: ['Да, вся техника', 'Частично', 'Техника уже есть', 'Пока не знаю'],
  },
  {
    id: 'deadline',
    title: 'Когда хотите получить кухню?',
    hint: 'Срок поможет подобрать решение: модульное, индивидуальное или комбинированное.',
    options: ['Как можно быстрее', 'В течение месяца', '1-2 месяца', 'Пока планирую'],
  },
  {
    id: 'budget',
    title: 'Какой бюджет планируете?',
    hint: 'Мы предложим комплектацию без лишнего давления и скрытых ожиданий.',
    options: ['До 150 000 ₽', '150 000-250 000 ₽', '250 000-400 000 ₽', 'Больше 400 000 ₽', 'Хочу расчет'],
  },
];

function estimateBudget(answers) {
  const size = answers.size;
  const layout = answers.layout;
  const budget = answers.budget;

  if (budget && budget !== 'Хочу расчет') return budget;
  if (layout === 'С островом' || size === 'Больше 6 м') return 'от 350 000 ₽';
  if (size === '4-6 м' || layout === 'П-образная') return 'от 250 000 ₽';
  if (size === '2,5-4 м' || layout === 'Угловая') return 'от 170 000 ₽';
  return 'от 120 000 ₽';
}

function ProfessionalQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sent, setSent] = useState(false);
  const isContactStep = step === quizSteps.length;
  const current = quizSteps[step];
  const progress = Math.round(((step + (isContactStep ? 1 : 0)) / (quizSteps.length + 1)) * 100);
  const canGoNext = isContactStep || Boolean(answers[current?.id]);

  function choose(id, option) {
    setAnswers((value) => ({ ...value, [id]: option }));
  }

  function next() {
    if (step < quizSteps.length && canGoNext) setStep((value) => value + 1);
  }

  function back() {
    setStep((value) => Math.max(0, value - 1));
  }

  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const lead = {
      ...answers,
      ...values,
      estimate: estimateBudget(answers),
      source: 'professional-kitchen-quiz',
      createdAt: new Date().toISOString(),
    };
    const currentLeads = JSON.parse(localStorage.getItem('kuhnya-v-dom-leads') || '[]');
    localStorage.setItem('kuhnya-v-dom-leads', JSON.stringify([lead, ...currentLeads]));
    form.reset();
    setSent(true);
  }

  return (
    <section className="section quiz-pro" id="quiz">
      <div className="quiz-pro-copy">
        <p className="kicker">Квиз на 1 минуту</p>
        <h2>Соберем вводные и подготовим бесплатный дизайн-проект кухни</h2>
        <p>
          Ответьте на несколько вопросов: мы поймем планировку, размеры, стиль,
          материалы и бюджет. После этого менеджер свяжется с вами и предложит
          следующий шаг без навязывания.
        </p>
        <div className="quiz-summary">
          <span><Calculator size={18} /> Предварительный ориентир: <b>{estimateBudget(answers)}</b></span>
          <span><Clock3 size={18} /> Ответ в рабочее время: 10:00-20:00</span>
          <span><Ruler size={18} /> Замер и проект по Анапе</span>
        </div>
      </div>

      <div className="quiz-card">
        <div className="quiz-top">
          <span>{isContactStep ? 'Финальный шаг' : `Вопрос ${step + 1} из ${quizSteps.length}`}</span>
          <strong>{progress}%</strong>
        </div>
        <div className="quiz-progress" aria-hidden="true">
          <i style={{ width: `${progress}%` }} />
        </div>

        {!isContactStep && (
          <>
            <h3>{current.title}</h3>
            <p>{current.hint}</p>
            <div className="quiz-options">
              {current.options.map((option) => (
                <button
                  className={answers[current.id] === option ? 'selected' : ''}
                  key={option}
                  type="button"
                  onClick={() => choose(current.id, option)}
                >
                  <span>{option}</span>
                  <Check size={18} />
                </button>
              ))}
            </div>
            <div className="quiz-controls">
              <button className="button secondary" type="button" onClick={back} disabled={step === 0}>Назад</button>
              <button className="button primary" type="button" onClick={next} disabled={!canGoNext}>
                Далее <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}

        {isContactStep && (
          <form className="quiz-contact" onSubmit={submit}>
            <h3>Куда отправить расчет и проект?</h3>
            <p>Оставьте контакты. Заявка сохранится на сайте, а быстрый ответ можно получить по телефону.</p>
            <label>
              Имя
              <input name="name" placeholder="Как к вам обращаться" required />
            </label>
            <label>
              Телефон
              <input name="phone" inputMode="tel" placeholder="+7 ___ ___ __ __" required />
            </label>
            <label>
              Удобное время звонка
              <select name="callTime" defaultValue="Сегодня">
                <option>Сегодня</option>
                <option>Завтра</option>
                <option>В первой половине дня</option>
                <option>После 16:00</option>
              </select>
            </label>
            <label>
              Комментарий
              <textarea name="comment" rows="3" placeholder="Адрес, размеры или пожелания" />
            </label>
            <div className="quiz-controls">
              <button className="button secondary" type="button" onClick={back}>Назад</button>
              <button className="button primary" type="submit">Получить расчет <Check size={18} /></button>
            </div>
            {sent && (
              <div className="success">
                Заявка сохранена. Для срочного ответа позвоните: <a href={`tel:${contacts.phoneClean}`}>{contacts.phone}</a>
              </div>
            )}
          </form>
        )}
      </div>
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
      <div className="material-lab">
        <div>
          <p className="kicker">Фактуры крупным планом</p>
          <h3>Свет, дерево, камень и матовые фасады должны сочетаться до запуска производства</h3>
          <p>
            Поэтому на сайте показываем не абстрактный каталог, а атмосферу будущей кухни:
            спокойную палитру, теплые древесные детали и практичные поверхности.
          </p>
        </div>
        <div className="material-lab-stack" aria-label="Визуальная подборка материалов">
          {materials.slice(0, 3).map(([title, , image]) => (
            <span key={title}>
              <img src={image} alt={title} />
            </span>
          ))}
        </div>
      </div>
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
        <ShowroomScene />
        <BrandManifesto />
        <Benefits />
        <Directions />
        <ProfessionalPortfolio />
        <DesignBoard />
        <ProfessionalQuiz />
        <ProjectStudio />
        <Materials />
        <LocalReach />
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
