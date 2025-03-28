import styled from "styled-components";
import ICoinInfo from "../types/coin";

export default function OverView(props: { coinInfo: ICoinInfo | undefined }) {
  const coinInfo = props.coinInfo;

  if (!coinInfo || !coinInfo.market_data) {
    return <div>Loading...</div>;
  } else {
    return (
      <Overview>
        <Row2>
          <OverviewItem>
            <h1>Rank</h1>
            <span>{coinInfo?.market_data.market_cap_rank}</span>
          </OverviewItem>

          <OverviewItem>
            <h1 title="시가총액이라는 뜻 ㅋㅋ">* Market Cap</h1>

            <span>
              {coinInfo?.market_data.market_cap?.usd != null
                ? `$ ${coinInfo.market_data.market_cap.usd.toLocaleString()}`
                : "N/A"}
            </span>
          </OverviewItem>
        </Row2>

        <Row3>
          <OverviewItem>
            <h1>All Time High</h1>
            <span>$ {coinInfo?.market_data.ath.usd.toLocaleString()}</span>
          </OverviewItem>

          <OverviewItem>
            <h1> From ATH</h1>
            <span>
              {coinInfo?.market_data.ath_change_percentage.usd.toFixed(2)} %
            </span>
          </OverviewItem>

          <OverviewItem>
            <h1>ATH Date</h1>

            <span>
              {coinInfo?.market_data.ath_date.usd
                ? new Date(coinInfo.market_data.ath_date.usd).toLocaleString(
                    "ko-KR",
                    {
                      timeZone: "Asia/Seoul",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )
                : "데이터 없음"}
            </span>
          </OverviewItem>
        </Row3>

        <Row3>
          <OverviewItem>
            <h1>Max Supply</h1>
            <span className="supply">
              {coinInfo?.market_data.max_supply != null
                ? coinInfo?.market_data.max_supply.toLocaleString()
                : "no data"}
            </span>
          </OverviewItem>

          <OverviewItem>
            <h1>Total Supply</h1>
            <span className="supply">
              {coinInfo?.market_data.total_supply.toLocaleString()}
            </span>
          </OverviewItem>

          <OverviewItem>
            <h1 title="실제 유통 중인 코인 수량">* Circ. Supply</h1>

            <span className="supply">
              {coinInfo?.market_data.circulating_supply.toLocaleString()}
            </span>
          </OverviewItem>
        </Row3>
      </Overview>
    );
  }
}

const GAP = "7px";
const BORDER_RADIUS = "10px";

const Overview = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: ${GAP};
`;

const Row2 = styled.div`
  border-radius: ${BORDER_RADIUS};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${GAP};
`;

const Row3 = styled.div`
  border-radius: ${BORDER_RADIUS};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${GAP};
`;

const OverviewItem = styled.div`
  background-color: ${(prop) => prop.theme.bgColor2};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: ${BORDER_RADIUS};
  font-weight: 400;
  gap: 14px;

  h1 {
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
  }

  span {
    font-size: 22px;
  }

  .supply {
    font-size: 1.3rem;
  }
`;
