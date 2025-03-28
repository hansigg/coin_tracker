import styled from "styled-components";
import OhlcChart from "./Ohlc_Chart";
import LineChart from "./Line_Chart";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCoinOhlc_1,
  fetchCoinOhlc_14,
  fetchCoinOhlc_30,
  fetchCoinOhlc_90,
  fetchCoinOhlc_180,
  fetchCoinOhlc_365,
} from "../api";
import IOhlcInfo from "../types/coin_ohlc";

interface CoinIdProp {
  coinId: string;
}

function ChartTabs({ coinId }: CoinIdProp) {
  // true이면 line, false이면 ohlc ㄱㄱ
  const [chart, setChart] = useState(true);

  function onTabClicked() {
    setChart((current) => !current);
  }

  const [days, setDays] = useState<number>(1);

  function onDaysChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setDays(Number(e.target.value));
  }

  const { isLoading, data } = useQuery({
    queryKey: ["ohlc", days, coinId],
    queryFn: () => {
      switch (days) {
        case 1:
          return fetchCoinOhlc_1(coinId);

        case 14:
          return fetchCoinOhlc_14(coinId);

        case 30:
          return fetchCoinOhlc_30(coinId);

        case 90:
          return fetchCoinOhlc_90(coinId);

        case 180:
          return fetchCoinOhlc_180(coinId);

        case 365:
          return fetchCoinOhlc_365(coinId);
      }
    },
  });

  let parsedData: IOhlcInfo[] = [];

  if (data) {
    parsedData = data.map(
      ([time, open, high, low, close]: [
        number,
        number,
        number,
        number,
        number
      ]) => ({
        time,
        open,
        high,
        low,
        close,
      })
    );
  }

  return (
    <TabBox>
      <Tabs>
        <GraphTabs>
          <Tab
            onClick={chart ? () => {} : onTabClicked}
            type={"line"}
            chart={chart}
          >
            <i className="fa-solid fa-chart-line"></i>
          </Tab>

          <Tab
            onClick={!chart ? () => {} : onTabClicked}
            type={"ohlc"}
            chart={chart}
          >
            <i className="fa-solid fa-chart-column"></i>
          </Tab>
        </GraphTabs>

        <TimeTabs>
          <select value={days} onChange={onDaysChange}>
            <option value="1" selected>
              1
            </option>
            <option value="14">14</option>
            <option value="30">30</option>
            <option value="90">90</option>
            <option value="180">180</option>
            <option value="365">365</option>
          </select>
        </TimeTabs>
      </Tabs>

      {isLoading ? (
        <Loader>Data Loading ...</Loader>
      ) : chart ? (
        <LineChart ohlc={parsedData} />
      ) : (
        <OhlcChart ohlc={parsedData} />
      )}
    </TabBox>
  );
}

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  width: 100%;
  height: 100%;
`;

const TabBox = styled.div`
  background-color: ${(prop) => prop.theme.bgColor3};
  border-radius: 10px;
`;

const Tabs = styled.div`
  display: flex;
  font-size: 18px;
  gap: 5px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Tab = styled.div<{ chart: boolean; type: string }>`
  background-color: ${(prop) =>
    prop.type === "line"
      ? prop.chart === true
        ? prop.theme.bgColor
        : prop.theme.bgColor3
      : prop.chart === true
      ? prop.theme.bgColor3
      : prop.theme.bgColor};

  padding: 12px;
  border-radius: 7px;

  transition: 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: ${(prop) =>
      prop.type === "line"
        ? prop.chart === true
          ? prop.theme.bgColor
          : prop.theme.bgColor2
        : prop.chart === true
        ? prop.theme.bgColor2
        : prop.theme.bgColor};
  }
`;

const GraphTabs = styled.div`
  display: flex;
  gap: 5px;
`;

const TimeTabs = styled.div`
  display: flex;
  gap: 10px;

  select {
    background-color: ${(props) => props.theme.bgColor}; // 배경
    color: ${(props) => props.theme.textColor}; // 글자색
    padding: 8px 12px;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 16px;

    &:hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.bgColor2};
    }

    option {
      background-color: ${(props) => props.theme.bgColor3};
      color: ${(props) => props.theme.textColor};
    }
  }
`;

export default ChartTabs;
