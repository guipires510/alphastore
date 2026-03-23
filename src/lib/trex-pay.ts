/**
 * @fileOverview Serviço de integração com a API Trex Pay.
 * Utiliza as credenciais configuradas no arquivo .env.
 */

const TREX_PAY_API_URL = process.env.TREX_PAY_API_URL || 'https://app.trexpay.com.br';
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
  if (!TREX_PAY_TOKEN || !TREX_PAY_SECRET) {
    return {
      success: false,
      pixPayload: '',
      qrCodeUrl: '',
      paymentId: '',
      error: 'Credenciais Trex Pay não configuradas.',
    };
  }

  // Ajustado para o endpoint mais comum de criação de PIX na Trex Pay
  const endpoint = `${TREX_PAY_API_URL.replace(/\/$/, '')}/api/v1/pix`;

  try {
    const payload = {
      amount: Math.round(data.amount * 100), // Valor em centavos
      external_id: data.orderId,
      customer: {
        name: data.customer.name,
        email: data.customer.email,
        document: data.customer.document.replace(/\D/g, "") || "00000000000",
        phone: data.customer.phone.replace(/\D/g, ""),
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${TREX_PAY_TOKEN}`,
        'X-Secret-Key': TREX_PAY_SECRET,
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    let result;

    try {
      result = JSON.parse(responseText);
    } catch (e) {
      // Se não for JSON, o servidor retornou um HTML (erro 404, 500 ou Login)
      return {
        success: false,
        pixPayload: '',
        qrCodeUrl: '',
        paymentId: '',
        error: `O servidor retornou um erro inesperado (HTML). Status: ${response.status}. Verifique se a URL e as chaves estão corretas.`,
      };
    }

    if (response.ok) {
      return {
        success: true,
        pixPayload: result.pix_code || result.copy_paste || result.payload || result.pix_payload || result.data?.pix_code || '',
        qrCodeUrl: result.qr_code_url || result.image_url || result.qrcode || result.qr_code || result.data?.qr_code_url || '',
        paymentId: result.id || result.transaction_id || result.data?.id || 'N/A',
      };
    } else {
      return {
        success: false,
        pixPayload: '',
        qrCodeUrl: '',
        paymentId: '',
        error: result.message || result.error || result.errors?.[0]?.message || `Erro API (${response.status})`,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      pixPayload: '',
      qrCodeUrl: '',
      paymentId: '',
      error: `Falha de conexão: ${error.message}`,
    };
  }
}
