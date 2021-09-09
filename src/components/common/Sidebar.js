import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import KeyImg from "../../assets/images/key-logo.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  keyImage: {
    height: 20,
    width: 20,
    marginRight: 15,
  },
}));
export default function Sidebar() {
  const classes = useStyles();
  return (
    <List className={classes.listContainer}>
      <ListItem button component={Link} to="/encode">
        <img src={KeyImg} alt="key" className={classes.keyImage} />
        <ListItemText primary={"Encode"} />
      </ListItem>
      <ListItem button component={Link} to="/decode">
        <img src={KeyImg} alt="key" className={classes.keyImage} />
        <ListItemText primary={"Decode"} />
      </ListItem>
      <ListItem button component={Link} to="#">
        <img src={KeyImg} alt="key" className={classes.keyImage} />
        <ListItemText primary={"Monitor"} />
      </ListItem>
      <ListItem button component={Link} to="sonic-keys">
        <img src={KeyImg} alt="key" className={classes.keyImage} />
        <ListItemText primary={"SonicKeys"} />
      </ListItem>
      <ListItem button component={Link} to="#">
        <img src={KeyImg} alt="key" className={classes.keyImage} />
        <ListItemText primary={"Licences"} />
      </ListItem>
    </List>
  );
}
