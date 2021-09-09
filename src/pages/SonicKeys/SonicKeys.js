import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        backgroundColor: 'white',
    },
}));

export default function SonicKeys() {
    const classes = useStyles();

    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "sonickey",
            label: "SONICKEY",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "name",
            label: "NAME",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "artist",
            label: "ARTIST",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "encodeddate",
            label: "ENCODED DATE",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "description",
            label: "DESCRIPTION",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "action",
            label: "ACTION",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "a",
            label: "",
            options: {
                filter: true,
                sort: false,
            }
        },
        
    ];

    const data = [
        { id: 1, sonickey:'WIWEUHjkjkjhL5', name:'iopiop23_sample_6587_audio.wav', artist:'Sonic', encodeddate:'25/08/2021', description:'Sample Testing', action:'View', a:'download',},
        { id: 2, sonickey:'LKHJHjkjkjhL5', name:'svhjkh3_sample_623_audio.wav', artist:'Sonic', encodeddate:'21/07/2021', description:'Sample Testing', action:'View' },
        { id: 3, sonickey:'WIWfgdkjhL98', name:'sdkjh23_sample_6887_audio.wav', artist:'Sonic', encodeddate:'02/08/2021', description:'Sample Testing', action:'View' },
        { id: 4, sonickey:'TYHoinlljkjhL5', name:'uyiu_sample_327_audio.wav', artist:'Sonic', encodeddate:'17/02/2021', description:'Sample Testing', action:'View' },
        { id: 5, sonickey:'LKHJHjkjkjhL5', name:'svhjkh3_sample_623_audio.wav', artist:'Sonic', encodeddate:'21/07/2021', description:'Sample Testing', action:'View' },
        { id: 6, sonickey:'WIWfgdkjhL98', name:'sdkjh23_sample_6887_audio.wav', artist:'Sonic', encodeddate:'02/08/2021', description:'Sample Testing', action:'View' },
        { id: 7, sonickey:'TYHoinlljkjhL5', name:'uyiu_sample_327_audio.wav', artist:'Sonic', encodeddate:'17/02/2021', description:'Sample Testing', action:'View' },
        { id: 8, sonickey:'LKHJHjkjkjhL5', name:'svhjkh3_sample_623_audio.wav', artist:'Sonic', encodeddate:'21/07/2021', description:'Sample Testing', action:'View' },
        { id: 9, sonickey:'WIWfgdkjhL98', name:'sdkjh23_sample_6887_audio.wav', artist:'Sonic', encodeddate:'02/08/2021', description:'Sample Testing', action:'View' },
        { id: 10, sonickey:'TYHoinlljkjhL5', name:'uyiu_sample_327_audio.wav', artist:'Sonic', encodeddate:'17/02/2021', description:'Sample Testing', action:'View' },
        { id: 11, sonickey:'LKHJHjkjkjhL5', name:'svhjkh3_sample_623_audio.wav', artist:'Sonic', encodeddate:'21/07/2021', description:'Sample Testing', action:'View' },
        { id: 12, sonickey:'WIWfgdkjhL98', name:'sdkjh23_sample_6887_audio.wav', artist:'Sonic', encodeddate:'02/08/2021', description:'Sample Testing', action:'View' },
        { id: 13, sonickey:'TYHoinlljkjhL5', name:'uyiu_sample_327_audio.wav', artist:'Sonic', encodeddate:'17/02/2021', description:'Sample Testing', action:'View' },
        { id: 14, sonickey:'LKHJHjkjkjhL5', name:'svhjkh3_sample_623_audio.wav', artist:'Sonic', encodeddate:'21/07/2021', description:'Sample Testing', action:'View' },
        { id: 15, sonickey:'WIWfgdkjhL98', name:'sdkjh23_sample_6887_audio.wav', artist:'Sonic', encodeddate:'02/08/2021', description:'Sample Testing', action:'View' },
        { id: 16, sonickey:'TYHoinlljkjhL5', name:'uyiu_sample_327_audio.wav', artist:'Sonic', encodeddate:'17/02/2021', description:'Sample Testing', action:'View' },
        
    ];

    const options = {
        // filterType: 'checkbox',
    };

    return (
        <div className={classes.paper}>
            <MUIDataTable
                title={"SonicKeys"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}
