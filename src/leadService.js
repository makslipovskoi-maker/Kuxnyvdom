const webhookUrl = String(import.meta.env.VITE_LEADS_WEBHOOK_URL || '').trim();
const webhookToken = String(import.meta.env.VITE_LEADS_WEBHOOK_TOKEN || '').trim();

export function trackEvent(name, params = {}) {
  const ymId = Number(import.meta.env.VITE_YM_ID || 0);
  if (ymId && typeof window !== 'undefined' && typeof window.ym === 'function') {
    window.ym(ymId, 'reachGoal', name, params);
  }
}

function normalizePhone(value) {
  return String(value || '').replace(/[^\d+]/g, '').trim();
}

function createPayload(lead) {
  return {
    ...lead,
    phone: normalizePhone(lead.phone),
    page: typeof window === 'undefined' ? '' : window.location.href,
    referrer: typeof document === 'undefined' ? '' : document.referrer,
    submittedAt: new Date().toISOString(),
  };
}

export async function sendLead(rawLead) {
  if (rawLead.website) return { ignored: true };

  const payload = createPayload(rawLead);

  if (!webhookUrl) {
    throw new Error('Онлайн-отправка заявок ещё не подключена.');
  }

  const headers = { 'Content-Type': 'application/json' };
  if (webhookToken) headers.Authorization = `Bearer ${webhookToken}`;

  let response;
  try {
    response = await fetch(webhookUrl, {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Нет соединения с сервисом заявок.');
  }

  if (!response.ok) {
    throw new Error('Сервис заявок временно недоступен.');
  }

  return payload;
}
