import styled from "styled-components";
import IOhlcInfo from "../types/coin_ohlc";
import ApexChart from "react-apexcharts";
import { useTheme } from "styled-components";

interface LineChartProp {
  ohlc: IOhlcInfo[];
}

function LineChart({ ohlc }: LineChartProp) {
  const theme = useTheme();
  return (
    <Chart>
      <ApexChart
        width={"100%"}
        height={"100%"}
        type="line"
        series={[
          {
            name: "Price",
            data: ohlc.map((value) => ({
              x: new Date(value.time),
              // x: new Date(value.time).toLocaleString("ko-KR", {
              //   timeZone: "Asia/Seoul",
              //   hour12: false,
              //   month: "2-digit",
              //   day: "2-digit",
              //   hour: "2-digit",
              //   minute: "2-digit",
              // }),

              y: value.close,
            })),
          },
        ]}
        options={{
          stroke: { curve: "smooth", width: 4, colors: [theme.accentColor] },
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

          xaxis: {
            type: "datetime", // 👈 datetime 꼭 설정!

            axisBorder: { show: false }, // 밑줄
            axisTicks: { show: false }, // 눈금
            tickAmount: 10, // 🔥 최대 6개만 보여줌
            labels: {
              rotate: 0, // ❗ 회전 금지
              // offsetY: 5,
              datetimeUTC: false,
              datetimeFormatter: {
                hour: "HH:mm",
              },
            },
          },

          yaxis: {
            labels: {
              offsetX: -5,
              formatter: (val: number) => {
                return "$ " + val.toLocaleString();
              },
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

export default LineChart;
