import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppLayout from "../components/common/AppLayout";
import Encode from "../pages/Encode/Encode";
import Decode from "../pages/Decode/Decode";
import StreamReader from "../pages/Monitor/StreamReader/StreamReader";
import Sonickeys from "../pages/SonicKeys/SonicKeys";
import Licences from "../pages/Licences/Licences";
import { SonicStreamDetail } from "../pages/Monitor/SonicStreamDetail";
import { Dashboard } from "../pages/Monitor/Dashboard/Dashboard";
import Plays from "../pages/Monitor/Plays/Plays";
import Tracks from "../pages/Monitor/Tracks/Tracks";
import Artists from "../pages/Monitor/Artists/Artists";
import Countries from "../pages/Monitor/Countries/Countries";

export default function Routes() {
  return (
    <AppLayout>
      <div style={{ width: "100%" }}>
        <Switch>
          <Redirect from="/" to="/encode" exact />
          <Route path="/encode" component={Encode} exact />
          <Route path="/decode" component={Decode} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/streamreader" component={StreamReader} exact />
          <Route path="/sonic-keys" component={Sonickeys} exact />
          <Route path="/licences" component={Licences} exact />
          <Route path="/sonicstreamdetail" component={SonicStreamDetail} exact />
          <Route path="/plays" component={Plays} exact />
          <Route path="/tracks" component={Tracks} exact />
          <Route path="/artists" component={Artists} exact />
          <Route path="/radio-stations" component={Artists} exact />
          <Route path="/countries" component={Countries} exact />
        </Switch>
      </div>
    </AppLayout>
  );
}
