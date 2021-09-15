import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography, Button } from "@material-ui/core";
import AddLicence from "./components/AddLicence";
import KeysTable from "../../components/common/KeysTable";

const useStyles = makeStyles((theme) => ({
  licenceContainer: {
    marginBottom: 40,
    backgroundColor: "white",
    padding: "2% 2.5%",
    // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  heading: {
    fontSize: 24,
    fontWeight: 700,
    color: "#343F84",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 500,
    color: "#00A19A",
  },
  card: {
    padding: 20,
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  button: {
    height: 45,
    padding: "0px 20px",
    textTransform: "initial",
    fontSize: 15,
    fontWeight: 700,
    borderRadius: 8,
  },
}));

function createData(h1, h2, h3, h4, h5, h6) {
  return { h1, h2, h3, h4, h5, h6 };
}

const head = [
  createData("ID", "LICENCE KEY", "USAGE COUNT", "MAX COUNT", "EXPIRY DATE", "SUSPENDED"),
];

const body = [
  createData(1, "1592343-B234-324A-AEH2-234DFS84RG", 234, 13, "14.09.2021", ""),
  createData(2, "56SJDS3-34DF-FEF3-346D-DGFDFD4653", 112, 10, "14.09.2021", ""),
];

export default function Licences() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const rows = [1, 2];

  return (
    <Grid className={classes.licenceContainer}>
      <Typography className={classes.heading}>Licences</Typography>
      <Typography className={classes.subHeading}>
        Add a new licence key.
      </Typography>
      <Card className={classes.card}>
        <Button
          variant="contained"
          component="span"
          color="primary"
          className={classes.button}
          onClick={() => setOpen(true)}
        >
          Add licence
        </Button>
      </Card>

      <KeysTable head={head} body={body} />
      <AddLicence open={open} setOpen={setOpen} />
    </Grid>
  );
}
