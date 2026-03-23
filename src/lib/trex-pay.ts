/**
 * @fileOverview Serviço de integração com a API Trex Pay.
 * Utiliza as credenciais configuradas no arquivo .env.
 */

// URL padrão corrigida para o endpoint brasileiro da Trex Pay
const TREX_PAY_API_URL = process.env.TREX_PAY_API_URL || 'https://api.trexpay.com.br/v1';
const TREX_PAY_TOKEN = process.env.TREX_PAY_TOKEN || '16d4f85d-28e6-46b3-86ab-321c9263e8b9';
const TREX_PAY_SECRET = process.env.TREX_PAY_SECRET || '135a8d03-2d43-4a78-9020-cf712d2acaa3';

export interface TrexPaymentRequest {
  amount: number;
  customer: {
    name: string;
    email: string;
    document: string; // CPF/CNPJ
    phone: string;
  };
  orderId: string;
}

export interface TrexPaymentResponse {
  success: boolean;
  pixPayload: string;
  qrCodeUrl: string;
  paymentId: string;
  error?: string;
}

export async function createPixPayment(data: TrexPaymentRequest): Promise<TrexPaymentResponse> {
  // Verificação de segurança das chaves
  if (!TREX_PAY_TOKEN || !TREX_PAY_SECRET) {
    return {
      success: false,
      pixPayload: '',
      qrCodeUrl: '',
      paymentId: '',
      error: 'Credenciais Trex Pay não configuradas.',
    };
  }

  try {
    // Preparação do payload seguindo o padrão REST da Trex Pay
    const payload = {
      payment_method: 'pix',
      amount: Math.round(data.amount * 100), // Valor em centavos
      external_id: data.orderId,
      customer: {
        name: data.customer.name,
        email: data.customer.email,
        document: data.customer.document.replace(/\D/g, "") || "00000000000",
        phone: data.customer.phone.replace(/\D/g, ""),
      }
    };

    console.log(`[TrexPay] Iniciando requisição para ${TREX_PAY_API_URL}/payments`);

    const response = await fetch(`${TREX_PAY_API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TREX_PAY_TOKEN}`,
        'X-Secret-Key': TREX_PAY_SECRET,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        pixPayload: result.pix_code || result.copy_paste || result.payload || result.pix_payload || '',
        qrCodeUrl: result.qr_code_url || result.image_url || result.qrcode || result.qr_code || '',
        paymentId: result.id || result.transaction_id || 'N/A',
      };
    } else {
      console.error('[TrexPay] Erro na resposta da API:', result);
      return {
        success: false,
        pixPayload: '',
        qrCodeUrl: '',
        paymentId: '',
        error: result.message || result.error || `Erro API (${response.status})`,
      };
    }
  } catch (error: any) {
    console.error('[TrexPay] Falha crítica de conexão:', error);
    return {
      success: false,
      pixPayload: '',
      qrCodeUrl: '',
      paymentId: '',
      error: `Erro de Conexão: Certifique-se de que a URL ${TREX_PAY_API_URL} está acessível. Detalhe: ${error.message}`,
    };
  }
}
