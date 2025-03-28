import styled from "styled-components";
import ICoinInfo from "../types/coin";

export default function CoinHeader(props: { coinInfo: ICoinInfo | undefined }) {
  const coinInfo = props.coinInfo;

  if (!coinInfo) return null; // 데이터가 없을 경우 렌더링 방지

  return (
    <CoinInfoHeader>
      <div className="coinInfoImg">
        <img src={coinInfo?.image.large} alt="coin img" />
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <h1 className="coinInfoTitle">{coinInfo?.name}</h1>
        </div>

        <div className="coinInfoPriceBox">
          <span className="coinInfoPrice">
            <span className="coinInfoPrice">
              $ {coinInfo.market_data.current_price.usd.toLocaleString()}
            </span>

            {/* ${" "}
            {coinInfo?.market_data?.current_price?.usd
              ? "Data Loading ..."
              : coinInfo?.market_data.current_price.usd.toLocaleString()} */}
          </span>
          <CoinInfoChange
            positive={
              Number(coinInfo?.market_data.price_change_percentage_24h) > 0
            }
          >
            <div>
              {Number(coinInfo?.market_data.price_change_percentage_24h) > 0 ? (
                <div className="changeRate">
                  <i className="fa-solid fa-up-long"></i>{" "}
                  <span>
                    {coinInfo?.market_data.price_change_percentage_24h.toFixed(
                      2
                    )}
                    %
                  </span>
                </div>
              ) : (
                <div className="changeRate">
                  <i className="fa-solid fa-down-long"></i>{" "}
                  <span>
                    {coinInfo?.market_data.price_change_percentage_24h.toFixed(
                      2
                    )}
                    %
                  </span>
                </div>
              )}
            </div>

            <span className="_24h">24h</span>
          </CoinInfoChange>
        </div>
      </div>
    </CoinInfoHeader>
  );
}

const BORDER_RADIUS = "0.3rem";
const GAP = "25px";

const CoinInfoHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(prop) => prop.theme.bgColor3};
  gap: ${GAP};
  padding: 2rem;
  border-radius: ${BORDER_RADIUS};

  .coinInfoTitle {
    font-size: 60px;
    margin-right: ${GAP};
    font-weight: 600;
  }

  .coinInfoImg {
    img {
      width: 80px;
      height: 80px;
    }
  }

  .coinInfoPrice {
    font-size: 40px;
    margin-right: ${GAP};
    font-weight: 700;
    color: ${(prop) => prop.theme.accentColor};
  }

  .coinInfoPriceBox {
    display: flex;
    align-items: end;
  }
`;

const CoinInfoChange = styled.div<{ positive: Boolean }>`
  display: flex;
  align-items: end;
  gap: 5px;
  font-weight: 600;
  padding: 10px;
  border-radius: ${BORDER_RADIUS};
  background-color: ${(prop) => (prop.positive ? "tomato" : "#70a1ff")};

  .changeRate {
    font-size: 20px;
  }

  ._24h {
    color: lightgray;
    font-size: 15px;
  }
`;
