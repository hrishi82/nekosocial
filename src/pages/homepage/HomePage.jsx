import { LeftAsideBar,RightAsideBar } from "../../components";
import "./homepage.css";
import "./cards.css";

import { Mainfeed } from "./Mainfeed/Mainfeed";

export const HomePage = () => {
  return (
    <div className="home-page-container relative">
      <LeftAsideBar />
      <Mainfeed />
      <RightAsideBar />
    </div>
  );
};
