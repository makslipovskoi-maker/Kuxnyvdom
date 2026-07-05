import React, { useState } from 'react';
import { ArrowRight, Calculator, Check, Clock3, Ruler } from 'lucide-react';
import { contacts } from '../data';
import { sendLead, trackEvent } from '../leadService';

const steps = [
  ['layout', 'Какая планировка кухни нужна?', 'Если пока не уверены, выберите консультацию.', ['Прямая', 'Угловая', 'П-образная', 'С островом', 'Нужна консультация']],
  ['size', 'Примерная длина кухни', 'Можно указать примерно. Точный расчет сделаем после замера.', ['До 2,5 м', '2,5–4 м', '4–6 м', 'Больше 6 м', 'Не знаю размер']],
  ['style', 'Какой стиль ближе?', 'Это поможет сразу подобрать фасады и цветовую гамму.', ['Современная', 'Минимализм', 'Классика', 'Светлая кухня', 'Еще выбираю']],
  ['material', 'Какие фасады рассматриваете?', 'Если сложно выбрать, покажем образцы в салоне.', ['МДФ', 'ЛДСП', 'Пластик / эмаль', 'Комбинированные', 'Нужна помощь']],
  ['appliances', 'Нужна встроенная техника?', 'Это влияет на проект, розетки, размеры модулей и бюджет.', ['Да, вся техника', 'Частично', 'Техника уже есть', 'Пока не знаю']],
  ['deadline', 'Когда хотите получить кухню?', 'Срок поможет подобрать подходящее решение.', ['Как можно быстрее', 'В течение месяца', '1–2 месяца', 'Пока планирую']],
  ['budget', 'Какой бюджет планируете?', 'Мы подберем комплектацию без лишнего давления.', ['До 150 000 ₽', '150 000–250 000 ₽', '250 000–400 000 ₽', 'Больше 400 000 ₽', 'Хочу расчет']],
];

function estimate(answers) {
  if (answers.budget && answers.budget !== 'Хочу расчет') return answers.budget;
  if (answers.layout === 'С островом' || answers.size === 'Больше 6 м') return 'от 350 000 ₽';
  if (answers.size === '4–6 м' || answers.layout === 'П-образная') return 'от 250 000 ₽';
  if (answers.size === '2,5–4 м' || answers.layout === 'Угловая') return 'от 170 000 ₽';
  return 'от 120 000 ₽';
}

export function QuizSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const final = step === steps.length;
  const current = steps[step];
  const progress = Math.round(((step + (final ? 1 : 0)) / (steps.length + 1)) * 100);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setStatus('sending'); setError('');
    try {
      await sendLead({ ...answers, ...values, estimate: estimate(answers), source: 'professional-kitchen-quiz' });
      form.reset(); setStatus('success');
      trackEvent('lead_submit', { source: 'professional-kitchen-quiz', estimate: estimate(answers) });
    } catch (requestError) {
      setStatus('error');
      setError(requestError instanceof Error ? requestError.message : 'Не удалось отправить заявку.');
      trackEvent('lead_error', { source: 'professional-kitchen-quiz' });
    }
  }

  return (
    <section className="section quiz-pro" id="quiz">
      <div className="quiz-pro-copy">
        <p className="kicker">Квиз на 1 минуту</p><h2>Соберем вводные и подготовим бесплатный дизайн-проект кухни</h2>
        <p>Ответьте на несколько вопросов: поймем планировку, размеры, стиль, материалы и бюджет. Затем предложим понятный следующий шаг.</p>
        <div className="quiz-summary"><span><Calculator size={18} /> Предварительный ориентир: <b>{estimate(answers)}</b></span><span><Clock3 size={18} /> Ответ в рабочее время: 10:00–20:00</span><span><Ruler size={18} /> Замер и проект по Анапе</span></div>
      </div>
      <div className="quiz-card">
        <div className="quiz-top"><span>{final ? 'Финальный шаг' : `Вопрос ${step + 1} из ${steps.length}`}</span><strong>{progress}%</strong></div>
        <div className="quiz-progress" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
        {!final && <><h3>{current[1]}</h3><p>{current[2]}</p><div className="quiz-options">{current[3].map((option) => <button type="button" key={option} className={answers[current[0]] === option ? 'selected' : ''} onClick={() => setAnswers((value) => ({ ...value, [current[0]]: option }))}><span>{option}</span><Check size={18} /></button>)}</div><div className="quiz-controls"><button className="button secondary" type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>Назад</button><button className="button primary" type="button" disabled={!answers[current[0]]} onClick={() => { trackEvent('quiz_step_complete', { step: step + 1 }); setStep(step + 1); }}>Далее <ArrowRight size={18} /></button></div></>}
        {final && <form className="quiz-contact" onSubmit={submit}>
          <h3>Куда отправить расчет и проект?</h3><p>Оставьте контакты — заявка уйдет менеджеру сразу после отправки формы.</p>
          <label>Имя<input name="name" placeholder="Как к вам обращаться" autoComplete="name" required /></label>
          <label>Телефон<input name="phone" inputMode="tel" autoComplete="tel" pattern="[0-9+()\\-\\s]{10,}" placeholder="+7 ___ ___ __ __" required /></label>
          <label>Удобное время звонка<select name="callTime" defaultValue="Сегодня"><option>Сегодня</option><option>Завтра</option><option>В первой половине дня</option><option>После 16:00</option></select></label>
          <label>Комментарий<textarea name="comment" rows="3" placeholder="Адрес, размеры или пожелания" /></label>
          <label className="honeypot" aria-hidden="true">Не заполняйте<input name="website" tabIndex="-1" autoComplete="off" /></label>
          <label className="consent-field"><input name="consent" type="checkbox" required /><span>Согласен на обработку персональных данных по <a href="/privacy.html" target="_blank" rel="noreferrer">политике конфиденциальности</a>.</span></label>
          <div className="quiz-controls"><button className="button secondary" type="button" onClick={() => setStep(step - 1)} disabled={status === 'sending'}>Назад</button><button className="button primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Отправляем…' : 'Получить расчет'} <Check size={18} /></button></div>
          {status === 'success' && <div className="success" role="status">Спасибо! Заявка отправлена. Мы свяжемся с вами в рабочее время.</div>}
          {status === 'error' && <div className="form-error" role="alert">{error} Для быстрого ответа позвоните: <a href={`tel:${contacts.phoneClean}`}>{contacts.phone}</a>.</div>}
        </form>}
      </div>
    </section>
  );
}
