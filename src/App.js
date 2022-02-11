import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import SonicSpinner from "./components/common/SonicSpinner";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "./stores/actions/session";
import Routes from "./routes/Routes";
import Amplify from "aws-amplify";
import awsconfig from "./config/aws-exports";
import Authenticator from "./pages/Auth/Authenticator";
import Communication from "./services/https/Communication";
import cogoToast from "cogo-toast";
import { getAllRadioListAction } from "./stores/actions/radioStationAction";

Amplify.configure(awsconfig);
function App() {
  const { session } = useSelector((state) => ({
    session: state.session,
  }));

  const [authenticating, setAuthenticating] = React.useState(true)

  const dispatch = useDispatch();

  useEffect(() => {
    Communication.userAuthentication().then((response) => {
      const loggedInUser = localStorage.getItem("user_info");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        dispatch(setSession(foundUser));
      }
      setAuthenticating(false)
    }).catch((error) => {
      setAuthenticating(false)
      cogoToast.error(error?.message || "Error authorizing")
    })
  }, []);

  // showing spinner while checking user is logged in or not
  if (authenticating) {
    return <SonicSpinner title="Authenticating..." />;
  }

  //if user is present and session is not null then only show main page
  if (
    session?.user !== null &&
    session?.user?.signInUserSession !== null
  ) {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }

  else if (session?.user?.signInUserSession === null &&
    session?.user?.challengeName === "NEW_PASSWORD_REQUIRED") {
    return <Authenticator propName="NEW_PASSWORD_REQUIRED" />
  }

  else if (session?.user?.challengeParam?.userAttributes?.email_verified === "false") {
    return <Authenticator propName="EmailNotVerified" />
  }

  else if (session?.resetPassword) {
    return <Authenticator propName="ResetPassword" />
  }

  return <Authenticator propName="SignIn" />
}

export default App;