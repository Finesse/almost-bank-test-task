export interface ExchangeRatesBase {
  baseCurrency: string;
  rates: {
    [counterCurrency: string]: number; // How much counter currency can be bought for 1 base currency unit
  };
}

export interface BalanceDictionary {
  [currency: string]: number;
}

export type RatesSource = () => Promise<ExchangeRatesBase>;
