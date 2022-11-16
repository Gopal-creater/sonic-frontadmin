import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { DoneSharp } from "@material-ui/icons";
import { useTheme } from "styled-components";

const IOSSwitch = withStyles(() => {
  const theme = useTheme();
  return {
    root: {
      width: (props) => props?.defaultsize || 120,
      height: 32,
      padding: 0,
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(100%)",
        color: theme.background.contrastText,
        "& + $track": {
          backgroundColor: theme.colors.secondary.main,
          opacity: 1,
          border: "none",
        },
      },
    },
    thumb: {
      width: 30,
      height: 30,
    },
    track: {
      borderRadius: (props) => props?.defaultsize / 2,
      backgroundColor: theme.colors.secondary.main,
      opacity: 1,
      "&:after, &:before": {
        color: theme.colors.primary.contrastText,
        fontSize: theme.fontSize.caption,
        fontFamily: theme.fontFamily.robotoBold,
        position: "absolute",
        top: "9px",
      },
      "&:before": {
        content: (props) => props?.active || "''",
        left: "10%",
        opacity: 0,
      },
      "&:after": {
        content: (props) => props?.inactive || "''",
        right: "10%",
      },
    },
    checked: {
      width: (props) => props?.checkedsize || 69,
      "&$switchBase": {
        color: theme.colors.primary.contrastText,
        transform: "translateX(100%)",
      },
      "& $thumb": {
        backgroundColor: theme.colors.primary.contrastText,
      },
      "& + $track": {
        background: theme.colors.primary.main,
        "&:before": {
          opacity: 1,
        },
        "&:after": {
          opacity: 0,
        },
      },
    },
    focusVisible: {},
  };
})(({ classes, ...props }) => {
  const theme = useTheme();
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      checkedIcon={
        <div
          style={{
            width: 30,
            height: 30,
            backgroundColor: theme.colors.grey.light,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DoneSharp
            style={{ color: theme.colors.primary.main }}
            fontSize="small"
          />
        </div>
      }
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function AppToggleSwitch({
  checked,
  onChange,
  size,
  checkedSize,
  active,
  inActive,
  ...props
}) {
  return (
    <Grid>
      <IOSSwitch
        {...props}
        checked={checked}
        onChange={onChange}
        name="checked"
        defaultsize={size}
        checkedsize={checkedSize}
        active={active}
        inactive={inActive}
      />
    </Grid>
  );
}
