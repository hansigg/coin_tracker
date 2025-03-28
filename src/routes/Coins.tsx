import { useQuery } from "@tanstack/react-query";
import { fetchCapCoins, fetchVolumeCoins } from "../api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SideBar } from "./SideBar";

interface ICoin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const visibleCoinCount = 15;

export function Coins() {
  // 보여줄 코인 설정
  const [showAll, setShowAll] = useState<boolean>(false);

  function moreClick() {
    setShowAll(!showAll);
  }

  const [showVolume, setshowVolume] = useState(true);

  function volumeOptionClicked() {
    setshowVolume(true);
  }

  function capOptionClicked() {
    setshowVolume(false);
  }

  const { isLoading, data: coins } = useQuery<ICoin[]>({
    queryKey: ["coins", showVolume],
    queryFn: showVolume ? fetchVolumeCoins : fetchCapCoins,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선하게 유지
    refetchOnWindowFocus: false, // 창을 다시 열 때 자동으로 API 요청하지 않음
  });

  const visibleCoins = showAll ? coins : coins?.slice(0, visibleCoinCount);

  return (
    <Container>
      <SideBar></SideBar>
      <Main>
        <MainHeader>
          <HeaderImg>
            <img
              src="https://3936590801-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FuBDUa2ODcAkHHV15nEGc%2Ficon%2FdxukYF8Wxc39yBmmdpey%2FCoinGecko%20Logo.svg?alt=media&token=cc062811-ede6-4788-815a-576f31cd16f9"
              alt=""
            />
          </HeaderImg>
          <HeaderText>
            <HeaderTitle>CoinGecko</HeaderTitle>
            <HeaderDesc>
              CoinGecko는 암호화폐 시장의 펀더멘털 분석을 제공합니다.
              CoinGecko는 가격, 거래량, 시가총액과 함께 커뮤니티 성장, 오픈소스
              코드 개발, 주요 이벤트 및 온체인 측정 자료 등을 추적합니다.
            </HeaderDesc>
          </HeaderText>
        </MainHeader>

        <MainBody>
          <CoinHeader>
            <CoinHeaderTitle>
              <span>Coin List</span>

              <CoinOptions>
                <CoinOption
                  showVolume={showVolume}
                  onClick={volumeOptionClicked}
                >
                  거래량
                </CoinOption>
                <CoinOption showVolume={showVolume} onClick={capOptionClicked}>
                  시가총액
                </CoinOption>
              </CoinOptions>

              <MoreBtn onClick={moreClick} showMore={showAll}>
                {" "}
                {showAll ? "접기" : "더보기"}
              </MoreBtn>
            </CoinHeaderTitle>

            <CoinHeaderText>
              <span style={{ marginRight: "3px" }}>Power by</span>

              <a
                style={{ textDecoration: "underline" }}
                href={"https://docs.coingecko.com/reference/introduction"}
              >
                CoinGecko
              </a>
            </CoinHeaderText>
          </CoinHeader>

          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "30px",
                padding: "100px",
              }}
            >
              Coin Loading ...
            </div>
          ) : (
            <CoinList>
              {visibleCoins?.map((coin, index) => {
                return (
                  // @@ coin.tsx로 이동할 때, 디폴트로 정보부터 보여주기 @@ //
                  <Link key={coin.id} to={`/${coin.id}/change`}>
                    <Coin>
                      <img src={coin.image} alt={coin.name} />
                      <CoinInfo>
                        <h1>{coin.name.substring(0, 13)}</h1>

                        <CoinInfoPrice>
                          <span>
                            $
                            {Number(
                              coin.current_price.toFixed(2)
                            ).toLocaleString()}
                          </span>
                          <span
                            className={
                              coin.price_change_percentage_24h >= 0
                                ? "positive"
                                : "negative"
                            }
                          >
                            {coin.price_change_percentage_24h < 0
                              ? coin.price_change_percentage_24h.toFixed(2)
                              : "+" +
                                coin.price_change_percentage_24h.toFixed(2)}
                            %
                          </span>
                        </CoinInfoPrice>
                      </CoinInfo>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "14px",
                          opacity: "0.3",
                        }}
                      >
                        Each 24 OHLC Graph
                      </div>
                    </Coin>
                  </Link>
                );
              })}
            </CoinList>
          )}
        </MainBody>
      </Main>
    </Container>
  );
}

const BORDER_RADIUS = "0.3rem";
const GAP = "7px";
const SIDE_GAP = "280px";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Main = styled.div`
  margin-left: ${SIDE_GAP};
  padding: 0.5rem;
  background-color: ${(prop) => prop.theme.bgColor2};
  display: grid;
  grid-template-rows: minmax(200px, 250px) 2fr;
  gap: ${GAP};
  border-radius: ${BORDER_RADIUS};
`;

const MainHeader = styled.div`
  background-color: ${(prop) => prop.theme.bgColor3};
  border-radius: ${BORDER_RADIUS};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const HeaderImg = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    padding: 10px;
    width: 30%;
    min-width: 100px;
  }
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const HeaderTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: ${(prop) => prop.theme.textColor};
`;

const HeaderDesc = styled.div`
  opacity: 0.5;
  color: ${(prop) => prop.theme.textColor};
  line-height: 25px;
  width: 80%;
`;

const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${GAP};
`;

const CoinHeader = styled.div`
  background-color: ${(prop) => prop.theme.bgColor3};
  border-radius: ${BORDER_RADIUS};
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  color: ${(prop) => prop.theme.textColor};
`;

const CoinHeaderTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CoinHeaderText = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.4;
`;

const MoreBtn = styled.div<{ showMore: boolean }>`
  background-color: ${(prop) =>
    prop.showMore ? prop.theme.bgColor : prop.theme.bgColor2};
  padding: 10px;
  font-size: 14px;
  border-radius: ${BORDER_RADIUS};
  transition: 0.1s ease-in-out;

  &:hover {
    background-color: ${(prop) => prop.theme.bgColor};
    cursor: pointer;
    /* border-radius: ${BORDER_RADIUS}; */
  }
`;

const CoinOptions = styled.div`
  border-radius: ${BORDER_RADIUS};
  padding: 3px;
  background-color: ${(prop) => prop.theme.bgColor2};
  display: flex;
  font-size: 14px;
  /* gap: 2px; */
`;

const CoinOption = styled.div<{ showVolume: boolean }>`
  padding: 7px;
  border-radius: ${BORDER_RADIUS};
  transition: 0.2s ease-in-out;

  &:nth-child(1) {
    background-color: ${(prop) =>
      prop.showVolume ? prop.theme.bgColor : prop.theme.bgColor2};
  }

  &:nth-child(2) {
    background-color: ${(prop) =>
      prop.showVolume ? prop.theme.bgColor2 : prop.theme.bgColor};
  }

  &:hover {
    cursor: pointer;
  }
`;

const CoinList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  gap: ${GAP};
`;

const Coin = styled.div`
  padding: 20px;
  background-color: ${(prop) => prop.theme.bgColor3};
  border-radius: ${BORDER_RADIUS};
  transition: 0.1s ease-in-out;
  display: grid;
  grid-template-columns: 0.5fr 1.15fr 1fr;

  img {
    width: 50px;
    height: 50px;
  }

  &:hover {
    background-color: ${(prop) => prop.theme.bgColor2};
  }
`;

const CoinInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;

  h1 {
    font-size: 20px;
    font-weight: 600;
  }
`;

const CoinInfoPrice = styled.div`
  font-size: 15px;

  span {
    font-weight: 500;
  }

  :nth-child(1) {
    margin-right: 10px;
    color: ${(prop) => prop.theme.accentColor};
    font-size: 16px;
    font-weight: 500;
  }

  .negative {
    color: ${(prop) => prop.theme.negative};
  }

  .positive {
    color: ${(prop) => prop.theme.positive};
  }
`;
