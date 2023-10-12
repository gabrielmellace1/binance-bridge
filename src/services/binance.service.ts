import { IBinanceLink } from "../interfaces";
import { hashSignature, randomString } from "../utils";
import dotenv from "dotenv";
import axios, { AxiosResponse } from "axios";
import { AppDataSource } from "../db/data-source";
import { Payment } from "../db/entity";

dotenv.config();
const { BINANCE_API_KEY, BINANCE_API_SECRET } = process.env;

const http = axios.create({
    baseURL: "https://bpay.binanceapi.com",
  });


  const paymentsRepository = AppDataSource.getRepository(Payment);

export const createPaymentLink = async (
    buyerAddress: string,
    sellerAddress: string,
    amount: string,
    currency: "USDT" | "BUSD"
  ): Promise<IBinanceLink> => {
    
    try {
    const timestamp = new Date().getTime();
    const nonce = randomString();
    
      const merchantTradeNo = new Date().getTime().toString();
      const body = {
        env: {
          terminalType: "WEB",
        },
        merchantTradeNo,
        orderAmount: amount,
        currency,
        goods: {
          goodsType: "02",
          goodsCategory: "Z000",
          referenceGoodsId: `${buyerAddress}.${sellerAddress}`,
          goodsName: "Decentral Games Deposit",
          goodsDetail: "Decentral Games Deposit",
        },
      };
      //return null;
      const payload =
        timestamp + "\n" + nonce + "\n" + JSON.stringify(body) + "\n";
      const signature = hashSignature(payload, BINANCE_API_SECRET  as string ).toUpperCase();
      const headers = {
        "Content-Type": "application/json",
        "BinancePay-Timestamp": timestamp,
        "BinancePay-Nonce": nonce,
        "BinancePay-Certificate-SN": BINANCE_API_KEY,
        "BinancePay-Signature": signature,
      };
      const binanceLinkRes: any = await http.post(
        "/binancepay/openapi/v2/order",
        body,
        {
          headers,
        }
      );
    
      if (binanceLinkRes.data.status === "SUCCESS") {
        const res: IBinanceLink = binanceLinkRes.data.data;
         const newPayment = new Payment();
        newPayment.paymentId = Number(res.prepayId);
        newPayment.buyerWallet = buyerAddress;
        newPayment.sellerWallet = sellerAddress;
        newPayment.amount = Number(amount);
        newPayment.status = 0; 
        newPayment.date = Date.now();
        newPayment.expirationDate = res.expireTime;

        await paymentsRepository.save(newPayment);
        console.log(res)    
        return res;
      } else throw new Error("Error generating payment link");
    } catch (error) {
        console.log(error);
        throw error;
    }
  };