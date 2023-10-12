"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Binance = void 0;
const tsoa_1 = require("tsoa");
const binanceService = __importStar(require("../services/binance.service"));
let Binance = class Binance extends tsoa_1.Controller {
    getBinancePaymentLink(buyerAddress, sellerAddress, amount, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!buyerAddress || !sellerAddress || !amount || !currency) {
                const fields = {
                    address: {
                        message: "all fields are required",
                        value: buyerAddress,
                    },
                };
                throw new tsoa_1.ValidateError(fields, "Error generating payment link");
            }
            const upperCurrency = currency.toUpperCase();
            if (upperCurrency !== "USDT") {
                const fields = {
                    resourceId: {
                        message: "Wrong Currency, accepted values: USDT",
                        value: currency,
                    },
                };
                throw new tsoa_1.ValidateError(fields, "Error generating payment link");
            }
            try {
                const paymentUrl = yield binanceService.createPaymentLink(buyerAddress, sellerAddress, amount, currency);
                return {
                    status: 200,
                    data: paymentUrl,
                    message: "Payment link generated succesfully",
                };
            }
            catch (e) {
                throw new tsoa_1.ValidateError({}, '');
            }
        });
    }
};
exports.Binance = Binance;
__decorate([
    (0, tsoa_1.Get)("/getBinancePaymentLink"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], Binance.prototype, "getBinancePaymentLink", null);
exports.Binance = Binance = __decorate([
    (0, tsoa_1.Route)("binance"),
    (0, tsoa_1.Tags)("binance")
], Binance);
