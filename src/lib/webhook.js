// Função centralizada para disparar webhooks n8n
// Agora aceita a URL configurada pela farmácia como parâmetro

export async function triggerWebhook(payload, customUrl = null) {
  const WEBHOOK_URL = customUrl || import.meta.env.VITE_WEBHOOK_URL;

  if (!WEBHOOK_URL) {
    console.error('Webhook URL missing (Global and Custom)');
    return { success: false, error: 'URL do Webhook não configurada' };
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return { success: true };
  } catch (error) {
    console.error('Error triggering Webhook:', error);
    return { success: false, error: error.message };
  }
}

export async function triggerPedidoWebhook(payload, customUrl = null) {
  const WEBHOOK_PEDIDO_URL = customUrl || import.meta.env.VITE_WEBHOOK_PEDIDO_URL;

  if (!WEBHOOK_PEDIDO_URL) {
    console.error('Webhook Pedido URL missing (Global and Custom)');
    return { success: false, error: 'URL do Webhook de Pedido não configurada' };
  }

  try {
    const response = await fetch(WEBHOOK_PEDIDO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return { success: true };
  } catch (error) {
    console.error('Error triggering Pedido Webhook:', error);
    return { success: false, error: error.message };
  }
}

// Helper para gerar o link do fornecedor (usado no payload do webhook)
export function generateSupplierLink(cotacaoId, token) {
  const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
  return `${baseUrl}/?token=${token}`;
}
