import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { catalogSections, contacts, factoryFacts } from '../data';
import { sendLead, trackEvent } from '../leadService';
import { SectionTitle } from './ShowroomServices';

export function TopInfoBar() {
  return (
    <div className="top-info-bar">
      <span>Анапа, Анапское шоссе 20, ТЦ Большой, 2 этаж</span>
      <span>Ежедневно 10:00-20:00</span>
      <a href={`tel:${contacts.phoneClean}`} onClick={() => trackEvent('phone_click', { placement: 'top_bar' })}>{contacts.phone}</a>
      <a href="#measure" onClick={() => trackEvent('measure_open', { placement: 'top_bar' })}>Вызвать замерщика</a>
    </div>
  );
}

export function CatalogShowcase() {
  return (
    <section className="section catalog-section" id="catalog">
      <div className="catalog-head">
        <SectionTitle
          kicker="Каталог мебели"
          title="Все направления сразу: кухни, шкафы, гардеробные, ТВ-зоны и мебель под размер"
          text="Страница стала ближе к полноценному мебельному сайту: клиент видит каталог решений и быстро выбирает, что ему нужно рассчитать."
        />
        <div className="catalog-callout">
          <strong>Бесплатный дизайн-проект</strong>
          <span>Планировка, фасады, хранение и ориентир стоимости после короткого квиза.</span>
        </div>
      </div>
      <div className="catalog-grid">
        {catalogSections.map((item, index) => (
          <article className={index === 0 ? 'catalog-card featured' : 'catalog-card'} key={item.title}>
            <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
            <div>
              <span>{item.price}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a href={item.href} onClick={() => trackEvent('catalog_click', { category: item.title })}>Рассчитать проект <ArrowRight size={16} /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MeasureLeadForm() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setStatus('sending');
    setError('');
    try {
      await sendLead({ ...values, source: 'measure-designer-form' });
      form.reset();
      setStatus('success');
      trackEvent('lead_submit', { source: 'measure-designer-form' });
    } catch (requestError) {
      setStatus('error');
      setError(requestError instanceof Error ? requestError.message : 'Не удалось отправить заявку.');
      trackEvent('lead_error', { source: 'measure-designer-form' });
    }
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <label>Имя<input name="name" placeholder="Как к вам обращаться" autoComplete="name" required /></label>
      <label>Телефон<input name="phone" inputMode="tel" autoComplete="tel" pattern="[0-9+()\\-\\s]{10,}" placeholder="+7 ___ ___ __ __" required /></label>
      <label>Что нужно рассчитать?
        <select name="type" defaultValue="" required>
          <option value="" disabled>Выберите вариант</option>
          <option>Кухня на заказ</option>
          <option>Шкаф или гардеробная</option>
          <option>ТВ-зона / гостиная</option>
          <option>Другая мебель под размер</option>
        </select>
      </label>
      <label>Комментарий<textarea name="comment" rows="4" placeholder="Размер, стиль, сроки или важные пожелания" /></label>
      <label className="honeypot" aria-hidden="true">Не заполняйте<input name="website" tabIndex="-1" autoComplete="off" /></label>
      <label className="consent-field"><input name="consent" type="checkbox" required /><span>Согласен на обработку персональных данных по <a href="/privacy.html" target="_blank" rel="noreferrer">политике конфиденциальности</a>.</span></label>
      <button className="button primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Отправляем...' : 'Отправить заявку'} <Check size={18} />
      </button>
      {status === 'success' && <div className="success" role="status">Спасибо! Заявка отправлена. Мы свяжемся с вами в рабочее время.</div>}
      {status === 'error' && <div className="form-error" role="alert">{error} Для быстрого ответа позвоните: <a href={`tel:${contacts.phoneClean}`}>{contacts.phone}</a>.</div>}
    </form>
  );
}

export function MeasurementBanner() {
  return (
    <section className="section measure-section" id="measure">
      <div className="measure-card">
        <div>
          <p className="kicker">Замерщик и дизайнер</p>
          <h2>Оставьте заявку, и мы подготовим проект по размерам вашего помещения</h2>
          <p>
            Можно начать с фото помещения, примерных размеров или визита в салон. После заявки уточним задачу,
            подберем материалы и предложим следующий шаг без давления.
          </p>
          <div className="factory-steps">
            {factoryFacts.map(([num, text]) => (
              <span key={num}><b>{num}</b>{text}</span>
            ))}
          </div>
        </div>
        <MeasureLeadForm />
      </div>
    </section>
  );
}
