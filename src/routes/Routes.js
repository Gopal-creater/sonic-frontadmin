import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppLayout from "../components/common/AppLayout";
import Encode from "../pages/Encode/Encode";
import Decode from "../pages/Decode/Decode";
import Sonickeys from "../pages/SonicKeys/SonicKeys";

export default function Routes() {
  return (
    <AppLayout>
      <div>
        <Switch>
          <Redirect from="/" to="/encode" exact />
          <Route path="/encode" component={Encode} exact />
          <Route path="/decode" component={Decode} exact />
          <Route path="/sonic-keys" component={Sonickeys} exact />
        </Switch>
      </div>
    </AppLayout>
  );
}
