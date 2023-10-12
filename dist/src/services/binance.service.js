"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentLink = void 0;
const utils_1 = require("../utils");
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const data_source_1 = require("../db/data-source");
const entity_1 = require("../db/entity");
dotenv_1.default.config();
const { BINANCE_API_KEY, BINANCE_API_SECRET } = process.env;
const http = axios_1.default.create({
    baseURL: "https://bpay.binanceapi.com",
});
const paymentsRepository = data_source_1.AppDataSource.getRepository(entity_1.Payment);
const createPaymentLink = (buyerAddress, sellerAddress, amount, currency) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const timestamp = new Date().getTime();
        const nonce = (0, utils_1.randomString)();
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
        const payload = timestamp + "\n" + nonce + "\n" + JSON.stringify(body) + "\n";
        const signature = (0, utils_1.hashSignature)(payload, BINANCE_API_SECRET).toUpperCase();
        const headers = {
            "Content-Type": "application/json",
            "BinancePay-Timestamp": timestamp,
            "BinancePay-Nonce": nonce,
            "BinancePay-Certificate-SN": BINANCE_API_KEY,
            "BinancePay-Signature": signature,
        };
        const binanceLinkRes = yield http.post("/binancepay/openapi/v2/order", body, {
            headers,
        });
        if (binanceLinkRes.data.status === "SUCCESS") {
            const res = binanceLinkRes.data.data;
            const newPayment = new entity_1.Payment();
            newPayment.paymentId = Number(res.prepayId);
            newPayment.buyerWallet = buyerAddress;
            newPayment.sellerWallet = sellerAddress;
            newPayment.amount = Number(amount);
            newPayment.status = 0;
            newPayment.date = Date.now();
            newPayment.expirationDate = res.expireTime;
            yield paymentsRepository.save(newPayment);
            console.log(res);
            return res;
        }
        else
            throw new Error("Error generating payment link");
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.createPaymentLink = createPaymentLink;
