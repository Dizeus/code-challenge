import { AxiosResponse } from "axios";
import api from "./api";
import { ICurrency } from "../utils/types/ICurrency";

export default class CurrencyService {
  static fetchPrices(): Promise<AxiosResponse<ICurrency[]>> {
    return api.get<ICurrency[]>("prices.json");
  }
}
