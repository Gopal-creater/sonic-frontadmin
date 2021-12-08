import React from 'react'
import "../Styles/BarGraph.css";
import { Grid } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';

export const BarGraph = (props) => {

    const options = {
        responsive: true,
    };

    const data = {
        labels: props?.label,
        datasets: [
            {
                label: props?.title,
                data: props?.data,
                backgroundColor: 'rgb(66,133,244)',
            }
        ],
    };
    return (
        <div className="BarGraphContainer">
            <div style={{ marginTop: 40 }}>
                <Bar options={options} data={data} />
            </div>
        </div>
    )
}
