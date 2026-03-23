
/**
 * @fileOverview Serviço de integração com a API Trex Pay.
 * Utiliza as credenciais configuradas no arquivo .env.
 */

const TREX_PAY_API_URL = process.env.TREX_PAY_API_URL || 'https://api.trexpay.com.br/v1';
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
  // Se as chaves não estiverem configuradas, avisamos no console (fallback para simulação removido para segurança em produção)
  if (!TREX_PAY_TOKEN || !TREX_PAY_SECRET) {
    console.error("TREX_PAY_TOKEN ou TREX_PAY_SECRET não configurados corretamente.");
    return {
      success: false,
      pixPayload: '',
      qrCodeUrl: '',
      paymentId: '',
      error: 'Configuração de pagamento incompleta.',
    };
  }

  try {
    // Nota: Em produção, ajuste o endpoint conforme a documentação técnica final da Trex Pay
    const response = await fetch(`${TREX_PAY_API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TREX_PAY_TOKEN}`,
        'X-Secret-Key': TREX_PAY_SECRET,
      },
      body: JSON.stringify({
        payment_method: 'pix',
        amount: Math.round(data.amount * 100), // Valor em centavos
        external_id: data.orderId,
        customer: {
          name: data.customer.name,
          email: data.customer.email,
          document: data.customer.document || "00000000000",
          phone: data.customer.phone,
        }
      }),
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
