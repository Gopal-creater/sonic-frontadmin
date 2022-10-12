import React from "react";


import Menu from "./Menu";
import { useSelector } from "react-redux";
import {Container, Toolbar } from "@material-ui/core";


export default function AppSideBar() {
  const user = useSelector((state) => state.user);

  return (
        
          <Container maxWidth="xs">
            {user?.sideBarData?.map((menu, index) => {
              return <Menu menu={menu} key={index} />;
            })}
          </Container>
        
      
  );
}
