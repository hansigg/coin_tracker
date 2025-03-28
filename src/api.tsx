const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-vKYRWniSnjstaQdqQ9EJ2PC7",
  },
};

const BASE_URL = "https://api.coingecko.com/api/v3/coins";

// ("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=2&price_change_percentage=1h%2C24h%2C7d");

// 시가총액 기준 top 50
const coins_cap =
  "/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&per_page=51&price_change_percentage=1h%2C24h%2C7d%2C30d";

// 거래량 기준 top 50
const coins_volume =
  "/markets?vs_currency=usd&category=layer-1&order=volume_desc&per_page=51&price_change_percentage=1h%2C24h%2C7d";

// 코인 24시간 정보
const coin_24 = "/ohlc?vs_currency=usd&days=1";

// 코인 정보
const coin_info = "?localization=false";

// 코인 OHLC - <Open High Low Close> - 14일 OHLC?
const coin_ohlc_1 = "/ohlc?vs_currency=usd&days=1";
const coin_ohlc_3 = "/ohlc?vs_currency=usd&days=3";
const coin_ohlc_14 = "/ohlc?vs_currency=usd&days=14";
const coin_ohlc_30 = "/ohlc?vs_currency=usd&days=30";
const coin_ohlc_90 = "/ohlc?vs_currency=usd&days=90";
const coin_ohlc_180 = "/ohlc?vs_currency=usd&days=180";
const coin_ohlc_365 = "/ohlc?vs_currency=usd&days=365";

// ------------------------------------------------------------------------ //

// 시가총액 기준
export async function fetchCapCoins() {
  const coins = await fetch(BASE_URL + coins_cap, options);

  console.log(BASE_URL + coins_cap);

  const coins_json = await coins.json();

  return coins_json;
}

// 거래량 기준
export async function fetchVolumeCoins() {
  const coins = await fetch(BASE_URL + coins_volume, options);
  const coins_json = await coins.json();

  return coins_json;
}

// ------------------------------------------------------------------------ //

// 코인 정보
export async function fetchCoinInfo(coinId: string) {
  const info = await fetch(BASE_URL + `/${coinId}` + coin_info);
  const info_json = await info.json();

  console.log("coin info request!");

  return info_json;
}

// ------------------------------------------------------------------------ //

// 코인 1일 가격 정보
export async function fetchCoinOhlc_1(coinId: string) {
  const ohlc = await fetch(BASE_URL + `/${coinId}` + coin_ohlc_1);

  const ohlc_json = await ohlc.json();

  return ohlc_json;
}

export async function fetchCoinOhlc_2(coinId: string) {
  const ohlc = await fetch(BASE_URL + `/${coinId}` + coin_ohlc_3);

  const ohlc_json = await ohlc.json();

  return ohlc_json;
}

// 코인 1일 가격 정보
export async function fetchCoinOhlc_3(coinId: string) {
  const ohlc = await fetch(BASE_URL + `/${coinId}` + coin_ohlc_3);

  const ohlc_json = await ohlc.json();

  return ohlc_json;
}

// 코인 14일 가격 정보
export async function fetchCoinOhlc_14(coinId: string) {
  const ohlc = await fetch(BASE_URL + `/${coinId}` + coin_ohlc_14);

  if (!ohlc.ok) {
    throw new Error("Failed to fetch OHLC data");
  }

  const ohlc_json = await ohlc.json();

  return ohlc_json;
}

// 코인 30일 가격 정보
export async function fetchCoinOhlc_30(coinId: string) {
  const ohlc = await fetch(BASE_URL + `/${coinId}` + coin_ohlc_30);

  if (!ohlc.ok) {
    throw new Error("Failed to fetch OHLC data");
  }

  const ohlc_json = await ohlc.json();

  return ohlc_json;
}

// 코인 90일 가격 정보
export async function fetchCoinOhlc_90(coinId: string) {
  const ohlc = await fetch(BASE_URL + `/${coinId}` + coin_ohlc_90);

  if (!ohlc.ok) {
    throw new Error("Failed to fetch OHLC data");
  }

  const ohlc_json = await ohlc.json();

  return ohlc_json;
}

// 코인 180일 가격 정보
export async function fetchCoinOhlc_180(coinId: string) {
  const ohlc = await fetch(BASE_URL + `/${coinId}` + coin_ohlc_180);

  if (!ohlc.ok) {
    throw new Error("Failed to fetch OHLC data");
  }

  const ohlc_json = await ohlc.json();

  return ohlc_json;
}

// 코인 365일 가격 정보
export async function fetchCoinOhlc_365(coinId: string) {
  const ohlc = await fetch(BASE_URL + `/${coinId}` + coin_ohlc_365);

  if (!ohlc.ok) {
    throw new Error("Failed to fetch OHLC data");
  }

  const ohlc_json = await ohlc.json();

  return ohlc_json;
}

// ------------------------------------------------------------------------ //

// 24시간 가격 정보
export async function fetchCoin24Price(coinId: string) {
  const coin24Prices = await fetch(BASE_URL + `/${coinId}` + coin_24);
  const coin24Prices_json = await coin24Prices.json();

  return coin24Prices_json.map((coin24Price: number[]) => ({
    timestamp: coin24Price[0],
    open: coin24Price[1],
    high: coin24Price[2],
    low: coin24Price[3],
    close: coin24Price[4],
  }));

  // return coinPrices_json;
}
