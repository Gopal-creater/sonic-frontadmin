import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppLayout from "../components/common/AppLayout";
import Encode from "../pages/Encode/Encode";
import Decode from "../pages/Decode/Decode";
import Dashboard from "../pages/Monitor/Dashboard";
import SonicStreamReader from "../pages/Monitor/SonicStreamReader";

import Sonickeys from "../pages/SonicKeys/SonicKeys";
import Licences from "../pages/Licences/Licences";
import { SonicStreamDetail } from "../pages/Monitor/SonicStreamDetail";
import { SonicStreamPlays } from "../pages/Monitor/SonicStreamPlays";

export default function Routes() {
  return (
    <AppLayout>
      <div style={{ width: "100%" }}>
        <Switch>
          <Redirect from="/" to="/encode" exact />
          <Route path="/encode" component={Encode} exact />
          <Route path="/decode" component={Decode} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/streamreader" component={SonicStreamReader} exact />
          <Route path="/sonic-keys" component={Sonickeys} exact />
          <Route path="/licences" component={Licences} exact />
          <Route path="/sonicstreamdetail" component={SonicStreamDetail} exact />
          <Route path="/sonicstreamplays" component={SonicStreamPlays} exact />
        </Switch>
      </div>
    </AppLayout>
  );
}
