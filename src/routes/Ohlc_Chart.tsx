import IOhlcInfo from "../types/coin_ohlc";
import ApexChart from "react-apexcharts";
import { useTheme } from "styled-components";
import styled from "styled-components";

interface OhlcChartProp {
  ohlc: IOhlcInfo[];
}

function OhlcChart({ ohlc }: OhlcChartProp) {
  const theme = useTheme();
  return (
    <Chart>
      <ApexChart
        width={"100%"}
        height={"100%"}
        type="candlestick"
        series={[
          {
            name: "Price",
            data: ohlc.map((value) => ({
              x: new Date(value.time).toLocaleString("ko-KR", {
                timeZone: "Asia/Seoul",
                hour12: false,
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
              }),
              y: [value.open, value.high, value.low, value.close],
            })),
          },
        ]}
        options={{
          plotOptions: {
            candlestick: {
              colors: {
                upward: theme.positive,
                downward: theme.negative,
              },
            },
          },
          stroke: { curve: "smooth", width: 4, colors: ["#00bcd4"] },
          theme: {
            mode: "dark",
          },

          chart: {
            background: theme.bgColor3,
            id: "line-chart",
            toolbar: { show: false },
          },
          grid: {
            show: false,
          },

          tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
              const ohlc =
                w.globals.initialSeries[seriesIndex].data[dataPointIndex].y;
              return `
          <div style="padding: 10px; color: white">
            <strong>Open:</strong> $ ${ohlc[0].toLocaleString()}<br/>
            <strong>High:</strong> $ ${ohlc[1].toLocaleString()}<br/>
            <strong>Low:</strong> $ ${ohlc[2].toLocaleString()}<br/>
            <strong>Close:</strong> $ ${ohlc[3].toLocaleString()}
          </div>
        `;
            },
          },

          xaxis: {
            tooltip: {
              enabled: true,
            },
            axisBorder: { show: false }, // 밑줄
            axisTicks: { show: false }, // 눈금

            tickAmount: 10, // 🔥 최대 6개만 보여줌

            labels: {
              rotate: 0, // ❗ 회전 금지
              offsetY: 5,
            },
          },

          yaxis: {
            labels: {
              offsetX: -5,
              formatter: (val: number) => {
                return "$ " + val.toLocaleString();
              },
            },
            tooltip: {
              enabled: true,
            },
          },
        }}
      />
    </Chart>
  );
}

const Chart = styled.div`
  width: 100%;
  height: 300px;
`;

export default OhlcChart;
