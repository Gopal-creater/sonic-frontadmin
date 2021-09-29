import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@material-ui/core';
import RadioIcon from '@material-ui/icons/Radio';
import CloseIcon from '@material-ui/icons/Close';
import RadioTeal from '../../../assets/icons/icon-teal-radio.png'
import RadioGrey from '../../../assets/icons/icon-grey-radio.png'
import GreyCross from '../../../assets/icons/icon-grey-cross.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // width : 280,
    height: 140,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 130,
    // border : '1px solid blue',
  },
  content: {
    // flex: '1 0 auto',
    flex: 'auto',
    backgroundColor: '#EAECF2',
    // border : '1px solid red',
    padding: 0
  },
  cover: {
    width: 140,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    // border : '1px solid blue',
    // textAlign : 'center',
    // paddingTop: theme.spacing(2),
  },
  numberCenter: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    height: 35,
    // border : '1px solid red',
    // textAlign : 'center',
    // paddingTop: theme.spacing(2),
  },
  keysDetectedCenter: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    height: 25,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

  card: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 10,
      marginRight: 10
    },
    [theme.breakpoints.up('md')]: {
    },
    [theme.breakpoints.up('lg')]: {
    },
    borderRadius: 20,
    height: 130,
    padding: 7
  },

}));

export default function InfoCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { title, bgColor, count = 'na', logo, totalRadioStreams = 'na', day, week, month } = props;

  const [keysDetected, setKeysDetected] = useState('day');
  let detectCount = 0;
  if (keysDetected === "day") {
    detectCount = day;
  } else if (keysDetected === "week") {
    detectCount = week;
  } else if (keysDetected === "month") {
    detectCount = month;
  }

  return (
    <Card className={`${classes.root} ${classes.card}`}
      elevation={0} style={{ backgroundColor: bgColor }}>
      {/* <CardMedia
            className={classes.cover}
            style={{backgroundColor : bgColor }}
            title="Live from space album cover"
        >
            {props.children}
        </CardMedia> */}

      <div style={{width:'100%'}}>
        <CardContent>
          <div>
            <Typography variant="subtitle1" color="black" align="left"
              style={{ fontWeight: 'bold', fontFamily: 'open-sans, sans-serif', fontSize: '12px' }}>
              {title}
            </Typography>
          </div>
          <div className={title === "SonicKeys Detected" ? classes.keysDetectedCenter : classes.numberCenter}>
            <Typography component="h6" variant="h6" style={{ fontWeight: 'bold', fontSize: '20px' }}>
              {title === "SonicKeys Detected" ? detectCount : `${isNaN(count) ? 'na' : count}/${totalRadioStreams}`}
            </Typography>
          </div>
          {title === "SonicKeys Detected" ?
          (<div>
            <FormControl style={styles.formControl}>
              <Select
                id="drop-down"
                onChange={(e) => setKeysDetected(e.target.value)}
                className="form-control mb-0"
                autoWidth={false}
                style={styles.dropdownButton}
              >
                {/* <MenuItem disabled selected hidden>Daily</MenuItem> */}
                <MenuItem value="day">Day</MenuItem>
                <MenuItem value="week">Week</MenuItem>
                <MenuItem value="month">Month</MenuItem>
              </Select>
            </FormControl>
          </div>
          ) :
          null}
        {title !== "SonicKeys Detected" && title !=='Error Streams' &&
          <div style={{float: 'right',height:100,width:'50%',marginTop:-10 }}>
            {title ==='Realtime listening' && <img src={RadioTeal} style={{float:'right'}}
             />}
            {title !=='Realtime listening' && <img src={RadioGrey} style={{float:'right'}}
             />} 
          </div>
        }
        {title !== "SonicKeys Detected" && title ==='Error Streams' &&
          <div style={{float: 'right',height:100,width:'50%',marginTop:-10 }}>
            <img src={GreyCross} style={{float:'right'}}/>
          </div>
        }
        </CardContent>

      </div>

    </Card>
  );
}

const styles = {
  dropdownButton: {
    color: 'black',
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    boxShadow: 'none',
    width: 160,
    //margin: '0px 0px 0px 20px',
    //        padding:5,
  },
  formControl: {
    margin: '0px 0px 0px 20px',
    minWidth: 120,
  },
  selectEmpty: {
    //  marginTop: theme.spacing(2),
  },
};
