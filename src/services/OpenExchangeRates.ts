const BASE_URL = 'https://openexchangerates.org/api';

export interface LatestResponse {
  disclaimer: string;
  license: string;
  timestamp: number; // Unix seconds
  base: string;
  rates: {
    [currency: string]: number; // How much base units the currency costs
  };
}

/**
 * A small Open Exchange Rates API client
 * 
 * @link https://openexchangerates.org/signup/free Get an app ID
 */
export default class OpenExchangeRates {
  constructor(protected readonly appId: string) {}

  /**
   * @link https://docs.openexchangerates.org/docs/latest-json
   */
  public async latest(): Promise<LatestResponse> {
    const response = await fetch(`${BASE_URL}/latest.json?app_id=${encodeURIComponent(this.appId)}`);
    if (response.status < 200 || response.status >= 300) {
      throw await this.getErrorFromResponse(response);
    }
    return await response.json();
  }

  protected async getErrorFromResponse(response: Response): Promise<Error> {
    try {
      const data = await response.json();
      if (typeof data.description === 'string') {
        return new Error(data.description);
      }
    } catch (error) {}

    return new Error(response.body && response.body.toString() || 'Unknown error in an Open Exchange Rates client');
  }
} 
