import { Route, Tags, Controller, Get, Query, FieldErrors, ValidateError } from "tsoa";
import { IAPIResponse, IBinanceLink } from "../interfaces";
import * as binanceService from "../services/binance.service";

@Route("binance")
@Tags("binance")
export class Binance extends Controller {
  @Get("/getBinancePaymentLink")
  public async getBinancePaymentLink(
    @Query() buyerAddress: string,
    @Query() sellerAddress: string,
    @Query() amount: string,
    @Query() currency:  "USDT"
  ): Promise<IAPIResponse<IBinanceLink>> {
    if (!buyerAddress || !sellerAddress || !amount || !currency) {
      const fields: FieldErrors = {
        address: {
          message: "all fields are required",
          value: buyerAddress,
        },
      };
      throw new ValidateError(fields, "Error generating payment link");
    }
    
    const upperCurrency = currency.toUpperCase();

    if ( upperCurrency !== "USDT") {
      const fields: FieldErrors = {
        resourceId: {
          message: "Wrong Currency, accepted values: USDT",
          value: currency,
        },
      };
      throw new ValidateError(fields, "Error generating payment link");
    }
    try {
      const paymentUrl = await binanceService.createPaymentLink(
        buyerAddress,
        sellerAddress,
        amount,
        currency
      );
      return {
        status: 200,
        data: paymentUrl,
        message: "Payment link generated succesfully",
      };
    } catch (e) {
        throw new ValidateError({}, '');
      }
  }
}