import { useState } from "react";
import styled from "styled-components";

export function SideBar() {
  // dark light
  const [darkTheme, setTheme] = useState(true);

  function changeTheme() {
    setTheme((current) => !current);
  }

  return (
    <Sidebar>
      <SidebarWrapper>
        <Profile>
          <ProfileTitle>Coin Tracker</ProfileTitle>

          <ProfileItem>
            <a
              href="https://www.instagram.com/hansiggg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/640px-Instagram_icon.png"
                alt="instagram"
              />
              <span>hansigg</span>
            </a>
          </ProfileItem>

          <ProfileItem>
            <a
              href="https://github.com/hansigg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="github"
              />
              <span>hansiggg</span>
            </a>
          </ProfileItem>
        </Profile>

        <BtnContainer>
          <ThemeBtn onClick={changeTheme} currentTheme={darkTheme}>
            <i className="fa-solid fa-circle-half-stroke"></i>
          </ThemeBtn>
        </BtnContainer>
      </SidebarWrapper>
    </Sidebar>
  );
}

const SIDE_GAP = "280px";
const BORDER_RADIUS = "0.3rem";

const Sidebar = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  /* 원하는 사이드바 너비 설정 */
  width: ${SIDE_GAP};

  & {
    padding: 5rem 0;
  }
`;

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 350px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileTitle = styled.span`
  text-align: start;
  font-size: 2.5rem;
  font-weight: 550;
  margin-bottom: 3rem;
`;

const ProfileItem = styled.div`
  background-color: ${(prop) => prop.theme.bgColor3};
  margin-bottom: 2rem;
  width: 120px;
  text-align: center;
  border-radius: ${BORDER_RADIUS};

  a {
    padding: 0.7rem;
    display: flex;
    gap: 0.4rem;
    border-radius: ${BORDER_RADIUS};
    transition: 0.1s ease-in-out;

    &:hover {
      background-color: ${(prop) => prop.theme.hoverColor};
    }
    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ThemeBtn = styled.div<{ currentTheme: boolean }>`
  background-color: ${(prop) => prop.theme.bgColor3};
  padding: 1rem;
  border-radius: 100%;
  font-size: 30px;
  position: absolute;
  bottom: 50px;

  /* transition: transform 0.2s ease-in-out; */
  @keyframes rotateThemeD2L {
    from {
      transform: rotateZ(0deg);
    }

    to {
      transform: rotateZ(180deg);
    }
  }

  @keyframes rotateThemeL2D {
    from {
      transform: rotateZ(180deg);
    }

    to {
      transform: rotateZ(360deg);
    }
  }

  &:hover {
    cursor: pointer;
    background-color: ${(prop) => prop.theme.bgColor2};
  }

  animation: ${(prop) =>
    prop.currentTheme
      ? "rotateThemeD2L 0.3s ease-in-out forwards"
      : "rotateThemeL2D 0.3s ease-in-out forwards"};
`;
