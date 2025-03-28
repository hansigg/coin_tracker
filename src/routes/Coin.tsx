/* eslint-disable react/jsx-pascal-case */
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { SideBar } from "./SideBar";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo } from "../api";
import CoinHeader from "./Coin_Header";

import Coin_Change from "./Coin_Change";
import Coin_Info from "./Coin_Info";
import ICoinInfo from "../types/coin";
import ChartTabs from "./Chart_Tabs";

interface ParamsProp {
  coinId: string;
}

export function Coin() {
  const params = useParams<ParamsProp>();
  const coinId = params.coinId;

  const { isLoading: isInfoLoading, data: coinInfo } = useQuery<ICoinInfo>({
    queryKey: [params.coinId],
    queryFn: () => fetchCoinInfo(params.coinId),
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선하게 유지
    refetchOnWindowFocus: false, // 창을 다시 열 때 자동으로 API 요청하지 않음
  });

  const changeMatch = useRouteMatch("/:coinId/change");
  const infoMatch = useRouteMatch("/:coinId/info");

  return (
    <Container>
      <SideBar></SideBar>
      <Main>
        <HomeBtn>
          <Link to={"/"}>
            <i className="fa-solid fa-house"></i>
          </Link>
        </HomeBtn>

        <CoinInfo>
          {isInfoLoading ? (
            <Loader>Coin Info Loading ...</Loader>
          ) : (
            <CoinHeader coinInfo={coinInfo}></CoinHeader>
          )}

          {isInfoLoading ? (
            <></>
          ) : (
            <CoinInfosBox>
              <Tabs>
                <Tab isActice={changeMatch !== null ? true : false}>
                  <Link to={`/${coinId}/change`}>
                    <i className="fa-solid fa-money-bill-trend-up"></i>
                  </Link>
                </Tab>

                <Tab isActice={infoMatch !== null ? true : false}>
                  <Link to={`/${coinId}/info`}>
                    <i className="fa-solid fa-circle-question"></i>
                  </Link>
                </Tab>
              </Tabs>

              <Switch>
                <Route path={`/:coinId/info`}>
                  <Coin_Info coinInfo={coinInfo}></Coin_Info>
                </Route>

                <Route path={`/:coinId/change`}>
                  <Coin_Change coinInfo={coinInfo}></Coin_Change>
                </Route>
              </Switch>
            </CoinInfosBox>
          )}
          {/* --------------------------------------------- */}

          <ChartTabs coinId={coinId} />
        </CoinInfo>
      </Main>
    </Container>
  );
}

const BORDER_RADIUS = "0.3rem";
const GAP = "15px";
const SIDE_GAP = "280px";

const Loader = styled.div`
  font-weight: 600;
  font-size: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Main = styled.div`
  margin-left: ${SIDE_GAP};
  padding: ${GAP};
  background-color: ${(prop) => prop.theme.bgColor2};
  border-radius: ${BORDER_RADIUS};
`;

const HomeBtn = styled.div`
  i {
    font-size: 20px;
    border-radius: 50%;
    padding: 9px;
    background-color: ${(prop) => prop.theme.bgColor};
    transition: 0.1s ease-in-out;

    &:hover {
      cursor: pointer;
      background-color: ${(prop) => prop.theme.bgColor3};
    }
  }
`;

const CoinInfo = styled.div`
  display: grid;
  gap: 10px;
  margin-top: ${GAP};
  grid-template-rows: 1fr 2.7fr 2.7fr;
`;

// ------------------------------------------------ //

const CoinInfosBox = styled.div`
  display: grid;
  grid-template-rows: 0.3fr 5fr;
  background-color: ${(prop) => prop.theme.bgColor3};
  padding: 10px;
  gap: 10px;
  border-radius: ${BORDER_RADIUS};
`;

// ------------------------------------------------ //

const Tabs = styled.div`
  display: flex;

  font-size: 20px;
  gap: 5px;
`;

const Tab = styled.div<{ isActice: boolean }>`
  transition: 0.1s ease-in;

  &:hover {
    background-color: ${(prop) =>
      prop.isActice ? prop.theme.bgColor : prop.theme.bgColor2};
  }

  background-color: ${(prop) =>
    prop.isActice ? prop.theme.bgColor : prop.theme.bgColor3};
  color: ${(prop) => prop.theme.textColor};

  border-radius: ${BORDER_RADIUS};

  i {
    padding: 10px;
  }
`;
