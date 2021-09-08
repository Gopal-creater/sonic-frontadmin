import { Container } from "@material-ui/core";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppLayout from "./components/common/AppLayout";
import Routes from "./routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
