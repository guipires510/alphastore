/**
 * @fileOverview Serviço de integração com a API Trex Pay.
 * Utiliza as credenciais configuradas no arquivo .env.
 */

const TREX_PAY_API_URL = process.env.TREX_PAY_API_URL || 'https://api.trexpay.com/v1';
const TREX_PAY_TOKEN = process.env.TREX_PAY_TOKEN || '';
const TREX_PAY_SECRET = process.env.TREX_PAY_SECRET || '';

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
      error: 'As chaves TREX_PAY_TOKEN ou TREX_PAY_SECRET não foram encontradas no ambiente.',
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
        pixPayload: result.pix_code || result.copy_paste || result.payload || '',
        qrCodeUrl: result.qr_code_url || result.image_url || result.qrcode || '',
        paymentId: result.id || result.transaction_id || 'N/A',
      };
    } else {
      // Captura erro específico retornado pela API
      return {
        success: false,
        pixPayload: '',
        qrCodeUrl: '',
        paymentId: '',
        error: result.message || result.error || `Erro API (${response.status}): Falha na requisição.`,
      };
    }
  } catch (error: any) {
    // Este erro acontece se o domínio estiver errado ou sem internet
    return {
      success: false,
      pixPayload: '',
      qrCodeUrl: '',
      paymentId: '',
      error: `Erro de Conexão: ${error.message || 'Verifique a URL da API da Trex Pay'}`,
    };
  }
}
