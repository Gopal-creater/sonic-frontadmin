import { Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import BackgoundCard from './Components/BackgoundCard'
import Paper from "@material-ui/core/Paper";
import GraphCard from './Components/GraphCard';
import InfoCard from './Components/InfoCard';
import InfoIcon from '@material-ui/icons/Info';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import StorageIcon from '@material-ui/icons/Storage';
import ReorderIcon from '@material-ui/icons/Reorder';

export default function Dashboard() {
    return (
        <div style={{ backgroundColor: 'aqua', minWidth: '50vw', marginTop: -35 }}>
            <Paper style={{padding:5, outline:0 }}>
                <BackgoundCard header='Dashboard' subheader='View SonicKeys Streaming' />
                <div style={{padding:10,marginTop:25}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InfoCard 
                        //    totalRadioStreams={props.totalRadiostaionCount} 
                            title="Realtime listening" 
                            bgColor = "rgb(229, 245, 244)" 
                        //    count= {props.totalListeningCount}
                        > 
                        </InfoCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InfoCard 
                        title="SonicKeys Detected" 
                        bgColor = "rgb(229, 245, 244)" 
                        // day={props.day}
                        // week={props.week}
                        // month={props.month}
                        >
                        </InfoCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InfoCard
                        //    totalRadioStreams={props.totalRadiostaionCount} 
                            title="Currently not Listening" 
                            bgColor = "rgb(244, 244, 244)" 
                        //    count={ props.totalNotListeningCount - props.totalErrorCount }
                        >
                        </InfoCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <InfoCard
                        //    totalRadioStreams={props.totalRadiostaionCount} 
                            title="Error Streams" 
                            bgColor = "rgb(244, 244, 244)" 
                        //    count={props.totalErrorCount}
                        >
                        </InfoCard>
                    </Grid>
                </Grid>

                <div style={{marginTop:50}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <GraphCard 
                        preTitle={'First Highest'}
                        graphData={[1265, 1749, 2010, 690, 455, 959, 1330, 1650, 1456, 520, 880, 1900]} 
                        graphBgColor={'rgb(112, 120, 168)'} 
                        //graphCardData={ cloneDeep(props.topRadiostations[0]) }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <GraphCard 
                        preTitle={'Second Highest'}
                        graphData={[665, 749, 610, 1790, 1455, 1359, 1330, 1650, 1456, 520, 1480, 900]} 
                        graphBgColor={'rgb(52, 63, 132)'} 
                        //graphCardData={ cloneDeep(props.topRadiostations[1]) }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <GraphCard 
                        preTitle={'Third Highest'}
                        graphData={[265, 749, 1610, 1690, 1455, 1559,1330, 650, 456, 1520, 1280, 900]} 
                        graphBgColor={'rgb(0, 161, 154)'} 
                        //graphCardData={ cloneDeep(props.topRadiostations[2]) }
                        />
                    </Grid>
                </Grid>
                </div>
            </div>
            </Paper>
        </div>
    )
}
const styles = {
    homeContainer:{
    },
    // firstCardContainer : {
    //     display:'flex',
    //     // width : '100%',
    //     // border : '1px solid red',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    IconStyle: {
        height: 70,
        width: 70,
        color : 'white',
      },
    cardStyle : {
        marginTop: 10,
        padding : 10,
        // backgroundColor: 'rgba(0,0,0,0.1)'
        // borderRadius: 10,
        // boxShadow : '0px 0px 8px 2px #000000;',
    },
    actionContainer : {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    muiTableHeadStyle : {
        backgroundColor: '#ADD8E6',
        // color:'#0269A4', 
        // opacity:0.9,
        // fontWeight: 'bold',
        whiteSpace: 'nowrap',
        wordWrap: 'break-word'
    },
    submitButton : {
        marginLeft: 10,
        height: '30px',
        color: 'white',
        width: 80,
        border: 'none',
        borderRadius: '50px',
        backgroundColor: 'blue',
        boxShadow : '0px 0px 8px 2px #000000;'
    },
}