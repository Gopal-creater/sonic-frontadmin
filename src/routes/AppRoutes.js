import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../components/common/AppLayout";
import Encode from "../pages/Encode/Encode";
import Decode from "../pages/Decode/Decode";
import StreamReader from "../pages/Monitor/StreamReader/StreamReader";
import Sonickeys from "../pages/SonicKeys/SonicKeys";
import Licences from "../pages/Licences/Licences";
import { SonicStreamDetail } from "../pages/Monitor/StreamReader/SonicStreamDetail";
import { Dashboard } from "../pages/Monitor/Dashboard/Dashboard";
import Plays from "../pages/Monitor/Plays/Plays";
import Tracks from "../pages/Monitor/Tracks/Tracks";
import Artists from "../pages/Monitor/Artists/Artists";
import Countries from "../pages/Monitor/Countries/Countries";
import RadioStations from "../pages/Monitor/RadioStation/RadioStation";
import { getAllRadioListAction } from "../stores/actions/radioStationAction";
import { useDispatch } from "react-redux";
import RoleAuth from "../components/hoc/RoleAuth";
import Companies from "../pages/Companies.js/index.js";
import UnAuthorized from "../components/hoc/UnAuthorized";

export default function AppRoutes() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getAllRadioListAction())
  }, [])

  return (
    <AppLayout>
      <div style={{ width: "100%" }}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/encode" />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
          <Route path="/encode" element={<Encode />} />
          <Route path="/decode" element={<Decode />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/streamreader" element={<StreamReader />} />
          <Route path="/sonic-keys" element={<Sonickeys />} />
          <Route path="/licences" element={<Licences />} />
          <Route path="/sonicstreamdetail" element={<SonicStreamDetail />} />
          <Route path="/plays" element={<Plays />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/radio-stations" element={<RadioStations />} />
          <Route path="/countries" element={<Countries />} />

          {/* Routes accessible by partner */}
          <Route element={<RoleAuth allowedRoles={["partn"]} />}>
            <Route path="/companies" element={<Companies />} />
          </Route>
        </Routes>
      </div>
    </AppLayout>
  );
}