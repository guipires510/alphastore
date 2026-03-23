/**
 * @fileOverview Serviço de integração com a API de pagamento seguindo a documentação oficial.
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
      error: 'Credenciais de pagamento não configuradas.',
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
        error: `Erro: O servidor retornou uma resposta inválida. Status: ${response.status}`,
      };
    }

    if (response.ok || result.status === 'success' || result.qrcode) {
      const pixPayload = result.qrcode || result.pix_code || result.copy_paste || result.payload || '';
      const qrCodeUrl = result.qr_code_image_url || result.qr_code_url || result.image_url || '';
      const paymentId = result.idTransaction || result.transaction_id || result.id || 'N/A';

      if (!pixPayload) {
        return {
          success: false,
          pixPayload: '',
          qrCodeUrl: '',
          paymentId: '',
          error: `API respondeu sucesso, mas não achamos o código PIX. Informe ao suporte Alpha.`,
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
        error: result.message || result.error || "Erro na criação do PIX pela plataforma Alpha.",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      pixPayload: '',
      qrCodeUrl: '',
      paymentId: '',
      error: `Falha na comunicação com o sistema de pagamento Alpha: ${error.message}`,
    };
  }
}
