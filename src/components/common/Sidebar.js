import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import KeyImg from "../../assets/images/key-logo.png";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles((theme) => ({
  keyImage: {
    height: 20,
    width: 20,
    marginRight: 15,
  },
  listContainer: {
    minWidth: "200px",
  }
  ,
  listItemContainer: {
    paddingLeft: 0
  }
}));
export default function Sidebar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleSubMenu = (event) => {
    setOpen((open) => !open);
  };


  return (
    <List className={classes.listContainer}>
      <ListItem button component={Link} to="/encode" className={classes.listItemContainer}>
        <img src={KeyImg} alt="key" className={classes.keyImage} />
        <ListItemText primary={"Encode"} />
      </ListItem>

      <ListItem button component={Link} to="/decode" className={classes.listItemContainer}>
        <img src={KeyImg} alt="key" className={classes.keyImage} />
        <ListItemText primary={"Decode"} />
      </ListItem>

      <ListItem button onClick={handleSubMenu} className={classes.listItemContainer}>
        <img src={KeyImg} alt="key" className={classes.keyImage} />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ListItemText primary={"Monitor"} />
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
      </ListItem>

      {open && (
        <>
          <ListItem button component={Link} to="/dashboard">
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem button component={Link} to="/streamreader">
            <ListItemText primary={"StreamReader"} style={{ fontSize: 10 }} />
          </ListItem>
        </>
      )
      }

      <ListItem button component={Link} to="sonic-keys" className={classes.listItemContainer}>
        <img src={KeyImg} alt="key" className={classes.keyImage} />
        <ListItemText primary={"SonicKeys"} />
      </ListItem>

      <ListItem button component={Link} to="#" className={classes.listItemContainer}>
        <img src={KeyImg} alt="key" className={classes.keyImage} />
        <ListItemText primary={"Licences"} />
      </ListItem>
    </List>
  );
}
