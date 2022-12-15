import React, { useEffect } from "react";
import SonicSpinner from "./components/common/SonicSpinner";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "./stores/actions/session";
import AppRoutes from "./routes/AppRoutes";
import Amplify from "aws-amplify";
import awsconfig from "./config/aws-exports";
import Authenticator from "./pages/Auth/Authenticator";
import Communication from "./services/https/Communication";
import cogoToast from "cogo-toast";
import { log } from "./utils/app.debug";
import { userActions } from "./constants/constants";

Amplify.configure(awsconfig);
function App() {
  const { session } = useSelector((state) => ({
    session: state.session,
  }));

  log("session", session);
  const [authenticating, setAuthenticating] = React.useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    Communication.userAuthentication()
      .then((response) => {
        const loggedInUser = localStorage.getItem("user_info");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          dispatch(setSession(foundUser));
        }
        setAuthenticating(false);
      })
      .catch((error) => {
        setAuthenticating(false);
        cogoToast.error(error?.message || "Error authorizing");
      });
  }, [dispatch]);

  // showing spinner while checking user is logged in or not
  if (authenticating) {
    return <SonicSpinner title="Authenticating..." />;
  }
  //EmailConfirmatin condition
  else if (session?.emailConfirmation) {
    return <Authenticator propName={userActions.EMAIL_CONFIRMATION_REQUIRED} />;
  }
  //Reset password is equivalent to forgot password
  else if (session?.resetPassword) {
    return <Authenticator propName="ResetPassword" />;
  }
  //If userAction is null then login the user
  else if (session?.user !== null && session?.user?.user?.userAction === null) {
    return <AppRoutes />;
  }

  //If none of the above condition satisfy return signin page
  return <Authenticator propName="SignIn" />;
}

export default App;
