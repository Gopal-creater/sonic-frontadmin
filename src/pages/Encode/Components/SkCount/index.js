import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useTheme } from "styled-components";
import { AppWebRequest } from "../../../../services/https/NetworkManager";
import { log } from "../../../../utils/app.debug";

export default function SkCount({ trackID }) {
  const theme = useTheme();
  const [state, setState] = React.useState({
    loading: true,
    data: "",
    error: null,
  });

  React.useEffect(() => {
    let param = {
      track: trackID,
    };
    AppWebRequest("sonic-keys/count", "get", { params: param })
      .then((res) => {
        log("skcount response", res);
        setState({ ...state, data: res, loading: false });
      })
      .catch((err) => {
        log("skcount response", err);
        setState({ ...state, error: "error", loading: false });
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (state.error) {
    return <div>error</div>;
  } else if (state.loading) {
    return (
      <div>
        <CircularProgress color={theme.colors.primary.main} size={18} />
      </div>
    );
  } else {
    return <div>{state.data}</div>;
  }
}
