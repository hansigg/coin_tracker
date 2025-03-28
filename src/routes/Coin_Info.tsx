import styled from "styled-components";
import ICoinInfo from "../types/coin";
import OverView from "./Info_overview";

export default function Coin_Info(props: { coinInfo: ICoinInfo | undefined }) {
  const coinInfo = props.coinInfo;

  return (
    <Info>
      <OverView coinInfo={coinInfo} />

      <Desc>
        {coinInfo?.description?.en?.trim() === "" ? (
          <NoDesc>No Description ...</NoDesc>
        ) : (
          coinInfo?.description?.en?.split("\n").map((line, index) => {
            return (
              <span key={index}>
                {line} <br />
              </span>
            );
          })
        )}
      </Desc>
    </Info>
  );
}

const GAP = "7px";
const BORDER_RADIUS = "10px";

const Info = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${GAP};
`;

const Desc = styled.div`
  background-color: ${(prop) => prop.theme.bgColor2};
  max-height: 324px;
  overflow-y: auto;
  line-height: 28px;
  padding: 20px;
  font-size: large;

  border-radius: ${BORDER_RADIUS};
`;

const NoDesc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
`;
