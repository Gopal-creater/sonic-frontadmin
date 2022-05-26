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
import RoleAuth from "../components/hoc/RoleAuth";
import Companies from "../pages/Companies/Companies";
import UnAuthorized from "../components/hoc/UnAuthorized";
import AddLicence from "../pages/Licences/components/AddLicence";
import AdminProfile from "../pages/Profile/AdminProfile";
import Users from "../pages/Users/Users";
import EditLicense from "../pages/Licences/components/EditLicense";
import CreateNewCompany from "../pages/Companies/CompanyProfile/CreateNewCompany";
import UserProfile from "../pages/Users/UserProfile/UserProfile";
import CreateUser from "../pages/Users/CreateUser/CreateUser";
import { userRoles } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../stores/actions/UserActions";
import { getInitialDatas } from "../stores/actions/GlobalActions";
import SonicSpinner from "../components/common/SonicSpinner";
import { logout } from "../stores/actions";

export default function AppRoutes() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getUserProfileAction())
    dispatch(getInitialDatas())
  }, [])

  if (user?.userProfile?.error) {
    dispatch(logout())
    return null
  }
  else if (user?.userProfile?.loading) {
    return <SonicSpinner title="Fetching user profile..." />;
  }
  else {
    return (
      <AppLayout>
        <div style={{ width: "100%" }}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />

            {/* Public routes */}
            <Route path="/licences" element={<Licences />} />
            <Route path="/user-profile/:id" element={<UserProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/radio-stations" element={<RadioStations />} />
            <Route path="/sonicstreamdetail" element={<SonicStreamDetail />} />
            <Route path="/plays" element={<Plays />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/sonic-keys" element={<Sonickeys />} />
            <Route path="/streamreader" element={<StreamReader />} />
            {/* Public routes */}

            {/* Routes that are protected */}
            <Route element={<RoleAuth allowedRoles={[userRoles.PARTNER_ADMIN, userRoles.COMPANY_ADMIN]} />}>
              <Route path="/admin-profile" element={<AdminProfile />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/create-company" element={<CreateNewCompany />} />
              <Route path="/add-licences" element={<AddLicence />} />
              <Route path="/edit-licences" element={<EditLicense />} />
              <Route path="/users" element={<Users />} />
            </Route>

            <Route element={<RoleAuth allowedRoles={[userRoles.PARTNER_ADMIN]} />}>
              <Route path="/companies" element={<Companies />} />
            </Route>

            <Route element={<RoleAuth allowedRoles={[userRoles.COMPANY_ADMIN, userRoles.COMPANY_USER, userRoles.PORTAL_USER, userRoles.PARTNER_USER]} />}>
              <Route path="/encode" element={<Encode />} />
              <Route path="/decode" element={<Decode />} />
            </Route>
            {/* Routes that are protected */}

            {/* Catching unauthorized access */}
            <Route path="/unauthorized" element={<UnAuthorized />} />
            {/* Catching unauthorized access */}
          </Routes>
        </div>
      </AppLayout>
    );
  }
}
