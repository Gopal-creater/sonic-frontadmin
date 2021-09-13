import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppLayout from "../components/common/AppLayout";
import Encode from "../pages/Encode/Encode";
import Decode from "../pages/Decode/Decode";
import Dashboard from "../pages/Monitor/Dashboard";
import SonicStreamReader from "../pages/Monitor/SonicStreamReader";


export default function Routes() {
  return (
    <AppLayout>
      <div>
        <Switch>
          <Redirect from="/" to="/encode" exact />
          <Route path="/encode" component={Encode} exact />
          <Route path="/decode" component={Decode} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/streamreader" component={SonicStreamReader} exact />
        </Switch>
      </div>
    </AppLayout>
  );
}
