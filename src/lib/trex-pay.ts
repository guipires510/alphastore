/**
 * @fileOverview Serviço de integração com a API Trex Pay.
 * Substitua as constantes abaixo pelas credenciais fornecidas pela Trex Pay.
 */

const TREX_PAY_API_URL = process.env.TREX_PAY_API_URL || 'https://api.trexpay.com.br/v1';
const TREX_PAY_TOKEN = process.env.TREX_PAY_TOKEN || '';

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
  // Nota: Esta é uma implementação baseada em padrões comuns de gateways de pagamento.
  // Você deve ajustar os campos de acordo com a documentação técnica exata da Trex Pay.
  
  if (!TREX_PAY_TOKEN) {
    console.warn("TREX_PAY_TOKEN não configurado. Usando modo de simulação.");
    return simulateTrexPayment(data);
  }

  try {
    const response = await fetch(`${TREX_PAY_API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TREX_PAY_TOKEN}`,
      },
      body: JSON.stringify({
        payment_method: 'pix',
        amount: data.amount,
        external_id: data.orderId,
        customer: {
          name: data.customer.name,
          email: data.customer.email,
          document: data.customer.document,
          phone: data.customer.phone,
        }
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        pixPayload: result.pix_code || result.copy_paste,
        qrCodeUrl: result.qr_code_url || result.image_url,
        paymentId: result.id,
      };
    } else {
      return {
        success: false,
        pixPayload: '',
        qrCodeUrl: '',
        paymentId: '',
        error: result.message || 'Erro ao processar pagamento na Trex Pay',
      };
    }
  } catch (error) {
    console.error("Trex Pay API Error:", error);
    return {
      success: false,
      pixPayload: '',
      qrCodeUrl: '',
      paymentId: '',
      error: 'Falha na conexão com o gateway de pagamento.',
    };
  }
}

/**
 * Simulação para desenvolvimento enquanto as chaves não são configuradas.
 */
function simulateTrexPayment(data: TrexPaymentRequest): Promise<TrexPaymentResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        pixPayload: `00020126360014BR.GOV.BCB.PIX0114TREXPAYDEMO5204000053039865802BR5920ALPHAFOLW6009SAO PAULO62070503***6304E2B1`,
        qrCodeUrl: 'https://placehold.co/400x400?text=QR+CODE+TREXPAY',
        paymentId: `TRX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      });
    }, 1000);
  });
}
