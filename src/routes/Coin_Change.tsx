import styled from "styled-components";
import ICoinInfo from "../types/coin";
import OverView from "./Info_overview";

export default function Coin_Price(props: { coinInfo: ICoinInfo | undefined }) {
  function ChangeComponent(number: number, text: string) {
    return (
      <>
        <h1>{text}</h1>
        <ChangeBox positive={number ?? 0}>
          <i
            className={
              (number ?? 0) > 0
                ? "fa-solid fa-arrow-trend-up"
                : "fa-solid fa-arrow-trend-down"
            }
          ></i>

          <span>{number.toFixed(2)} %</span>
        </ChangeBox>
      </>
    );
  }

  const coinInfo = props.coinInfo;

  return (
    <Change>
      <OverView coinInfo={coinInfo} />

      <ChangeOverview>
        <ChangeOverviewRow>
          <ChangeOverviewItem>
            {ChangeComponent(
              coinInfo?.market_data.price_change_percentage_7d ?? 0,
              "7-Days Change"
            )}
          </ChangeOverviewItem>

          <ChangeOverviewItem>
            {ChangeComponent(
              coinInfo?.market_data.price_change_percentage_14d ?? 0,
              "14-Days Change"
            )}
          </ChangeOverviewItem>
        </ChangeOverviewRow>

        <ChangeOverviewRow>
          <ChangeOverviewItem>
            {ChangeComponent(
              coinInfo?.market_data.price_change_percentage_30d ?? 0,
              "30-Days Change"
            )}
          </ChangeOverviewItem>

          <ChangeOverviewItem>
            {ChangeComponent(
              coinInfo?.market_data.price_change_percentage_60d ?? 0,
              "60-Days Change"
            )}
          </ChangeOverviewItem>
        </ChangeOverviewRow>

        <ChangeOverviewRow>
          <ChangeOverviewItem>
            {ChangeComponent(
              coinInfo?.market_data.price_change_percentage_200d ?? 0,
              "200-Days Change"
            )}
          </ChangeOverviewItem>

          <ChangeOverviewItem>
            {ChangeComponent(
              coinInfo?.market_data.price_change_percentage_1y ?? 0,
              "1-Year Change"
            )}
          </ChangeOverviewItem>
        </ChangeOverviewRow>
      </ChangeOverview>
    </Change>
  );
}

const GAP = "7px";
const BORDER_RADIUS = "10px";

const Change = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${GAP};
  border-radius: ${BORDER_RADIUS};
`;

const ChangeOverview = styled.div`
  border-radius: ${BORDER_RADIUS};
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: ${GAP};
`;

const ChangeOverviewRow = styled.div`
  border-radius: inherit;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${GAP};
`;

const ChangeOverviewItem = styled.div`
  background-color: ${(prop) => prop.theme.bgColor2};
  /* border-radius: ${BORDER_RADIUS}; */
  border-radius: ${BORDER_RADIUS};
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  height: 100%;

  gap: 5px;
  padding: 10px;

  h1 {
    margin-left: 5px;
  }
`;

const ChangeBox = styled.div<{ positive: number }>`
  color: ${(prop) =>
    prop.positive > 0 ? prop.theme.positive : prop.theme.negative};
  font-size: 30px;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  i {
    margin-right: 20px;
  }
`;
