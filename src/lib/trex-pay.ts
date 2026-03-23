/**
 * @fileOverview Serviço de integração com a API Trex Pay.
 * Utiliza as credenciais configuradas no arquivo .env.
 */

// Geralmente APIs de pagamento usam o subdomínio 'api' para integrações técnicas
const TREX_PAY_API_URL = 'https://api.trexpay.com.br';
const TREX_PAY_TOKEN = '16d4f85d-28e6-46b3-86ab-321c9263e8b9';
const TREX_PAY_SECRET = '135a8d03-2d43-4a78-9020-cf712d2acaa3';

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

  // Endpoint padrão para criação de PIX
  const endpoint = `${TREX_PAY_API_URL}/api/v1/pix`;

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
      return {
        success: false,
        pixPayload: '',
        qrCodeUrl: '',
        paymentId: '',
        error: `Erro de formato na resposta (HTML recebido). Status: ${response.status}. Verifique se o endpoint ${endpoint} está correto.`,
      };
    }

    if (response.ok) {
      // Mapeamento flexível de campos para diferentes versões da API
      const pixPayload = result.pix_code || result.copy_paste || result.payload || result.pix_payload || (result.data && result.data.pix_code) || '';
      const qrCodeUrl = result.qr_code_url || result.image_url || result.qrcode || result.qr_code || (result.data && result.data.qr_code_url) || '';
      const paymentId = result.id || result.transaction_id || (result.data && result.data.id) || 'N/A';

      return {
        success: true,
        pixPayload,
        qrCodeUrl,
        paymentId,
      };
    } else {
      return {
        success: false,
        pixPayload: '',
        qrCodeUrl: '',
        paymentId: '',
        error: result.message || result.error || (result.errors && result.errors[0] && result.errors[0].message) || `Erro na API Trex Pay (Status ${response.status})`,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      pixPayload: '',
      qrCodeUrl: '',
      paymentId: '',
      error: `Falha na comunicação com a Trex Pay: ${error.message}`,
    };
  }
}
