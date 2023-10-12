export interface IBinanceLink {
  prepayId: string;
  terminalType: string;
  expireTime: number;
  qrcodeLink: string;
  qrContent: string;
  checkoutUrl: string;
  deeplink: string;
  universalUrl: string;
}

export interface IBinanceQueryOrder {
  status: string;
  code: string;
  data: OrderData;
}

export interface OrderData {
  merchantId: number;
  prepayId: string;
  transactionId: string;
  merchantTradeNo: string;
  status: string;
  currency: string;
  openUserId: string;
  transactTime: number;
  createTime: number;
  orderAmount: string;
}
