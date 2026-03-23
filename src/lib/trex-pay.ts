/**
 * @fileOverview Serviço de integração com a API Trex Pay seguindo a documentação oficial.
 */

const TREX_PAY_ENDPOINT = 'https://app.trexpay.com.br/api/wallet/deposit/payment';
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

  try {
    const payload = {
      token: TREX_PAY_TOKEN,
      secret: TREX_PAY_SECRET,
      postback: `https://alphaflow-ecommerce.web.app/api/webhook/trex?orderId=${data.orderId}`,
      amount: data.amount,
      debtor_name: data.customer.name,
      email: data.customer.email,
      debtor_document_number: data.customer.document.replace(/\D/g, "") || "00000000000",
      phone: data.customer.phone.replace(/\D/g, ""),
      method_pay: "pix",
      src: "alphaflow_store",
      utm_source: "direct",
      utm_campaign: "checkout_alpha"
    };

    const response = await fetch(TREX_PAY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    let result: any;

    try {
      result = JSON.parse(responseText);
    } catch (e) {
      return {
        success: false,
        pixPayload: '',
        qrCodeUrl: '',
        paymentId: '',
        error: `Erro: O servidor retornou algo que não é um JSON. Status: ${response.status}`,
      };
    }

    // Verificamos sucesso tanto pelo status HTTP quanto pelo conteúdo do JSON
    if (response.ok || result.status === 'success' || result.success === true || result.pix_code) {
      
      // Busca profunda por campos comuns de PIX
      const pixPayload = result.pix_code || 
                        result.copy_paste || 
                        result.payload || 
                        result.pix_payload || 
                        (result.data && (result.data.pix_code || result.data.copy_paste || result.data.payload)) || 
                        '';

      const qrCodeUrl = result.qr_code_url || 
                       result.image_url || 
                       result.qrcode || 
                       result.qr_code || 
                       (result.data && (result.data.qr_code_url || result.data.image_url || result.data.qrcode)) || 
                       '';

      const paymentId = result.id || 
                       result.transaction_id || 
                       result.payment_id || 
                       (result.data && (result.data.id || result.data.transaction_id)) || 
                       'N/A';

      if (!pixPayload) {
        const keysFound = Object.keys(result).join(', ');
        return {
          success: false,
          pixPayload: '',
          qrCodeUrl: '',
          paymentId: '',
          error: `API respondeu sucesso, mas não achamos o código PIX. Campos recebidos: ${keysFound}. Informe ao suporte Alpha.`,
        };
      }

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
        error: result.message || result.error || "A API da Trex Pay retornou um erro na criação do PIX.",
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
