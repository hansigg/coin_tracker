export default interface ICoinInfo {
  id: string;

  symbol: string;

  name: string;

  description: { en: string };

  links: {
    homepage: string[];
  };

  image: {
    thumb: string;
    small: string;
    large: string;
  };

  market_data: {
    current_price: {
      usd: number;
    };

    ath: {
      usd: number;
    };

    ath_change_percentage: {
      usd: number;
    };

    ath_date: {
      usd: string;
    };

    market_cap_rank: number;

    market_cap: {
      usd: number;
    };

    total_supply: number;
    max_supply: number;
    circulating_supply: number;

    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
  };

  last_updated: string;
}
