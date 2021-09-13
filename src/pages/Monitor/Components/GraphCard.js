import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Graph from './Graph';
import SimpleTable1 from './SimpleTable1';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection : 'column',
    paddingLeft : 10,
    paddingRight : 10,
    paddingTop : 10,
    backgroundColor : '#EAECF2',
    // width : 280,
    // height : 480,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    // width : 300,
    // height : 130,
    // border : '1px solid blue',
  },
  content: {
    // flex: '1 0 auto',
    flex : 'auto',
    // backgroundColor : '#EAECF2',
    // border : '1px solid red',
    padding : 0
  },
  secondContent:{
      display : 'flex',
      flexDirection: 'row',
  },

  card : {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 10,
      marginRight: 10
   },
   [theme.breakpoints.up('md')]: {
    // height : 480,
    height : '100%',
   },
   [theme.breakpoints.up('lg')]: {
    // height : 480,
    height : '100%',
   },
  },

}));

export default function GraphCard(props) {
    let {graphData, graphBgColor, graphCardData, preTitle } = props;
  const classes = useStyles();

  return (
    <Card className={`${classes.root} ${classes.card}`} style={{backgroundColor:'white'}}>
        <Graph graphData={graphCardData ? graphCardData.graphsData : null} graphBgColor={graphBgColor} preTitle={preTitle}/>
        <div className={classes.details} >
            <CardContent className={classes.content}>
                <Typography style={{fontSize:12,fontWeight:'bold',padding:3}} color="black">
                Detected SonicKeys in recent 1 Month
                </Typography>
                <div className="secondContent">
                    <Typography variant="body1" display="inline">
                    {graphCardData ? graphCardData.radioStation ? graphCardData.radioStation.name ? graphCardData.radioStation.name : '-' : '-' : '-' }
                    </Typography>
                    <Typography variant="body2" display="inline" style={{fontSize : 12}}>
                    {graphCardData ? graphCardData.radioStation ? graphCardData.radioStation.streamingUrl ? ` (${graphCardData.radioStation.streamingUrl})` : ' (-)' : ' (-)' : ' (-)' }
                    </Typography>
                </div>
                <Typography style={{fontSize:12,fontWeight:'bold',padding:3}} color="black">
                Top 3 keys
                </Typography>
                <SimpleTable1 id="simpletable" tableData={graphCardData ? graphCardData.sonicKeys : []}/>
            </CardContent>
        </div>
    </Card>
  );
}

const styles = {
    dropdownButton: {
        // color:'black',
        // backgroundColor: 'transparent',
        border:'none',
        outline : 'none',
        boxShadow: 'none'
    },
    header:{
      fontSize:12,fontWeight:'bold',padding:3
    }
};
