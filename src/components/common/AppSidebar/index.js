import React from "react";
import Menu from "./Menu";
import { useSelector } from "react-redux";
import { Container } from "@material-ui/core";

export default function AppSideBar() {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Container maxWidth="xs" style={{ paddingTop: "20px" }}>
        {user?.sideBarData?.map((menu, index) => {
          return <Menu menu={menu} key={index} />;
        })}
      </Container>
    </div>
  );
}
