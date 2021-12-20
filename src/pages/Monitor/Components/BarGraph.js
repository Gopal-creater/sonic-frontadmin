import { CircularProgress } from '@material-ui/core';
import React from 'react'
import { Bar, Chart } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

export const BarGraph = (props) => {
    var options = {
        responsive: true,
        // scales: {
        //     xAxes: [{
        //         barThickness: 5,  // number (pixels) or 'flex'
        //         maxBarThickness: 5 // number (pixels)
        //     }]
        // }
    }

    var data = {
        labels: props?.label,
        datasets: [
            {
                // barPercentage: 2,
                barThickness: 30,
                maxBarThickness: 35,
                // minBarLength: 2,
                label: props?.title,
                data: props?.data,
                backgroundColor: 'rgb(66,133,244)',
            }
        ],
    };

    const dashboard = useSelector(state => state.dashboard)

    return (
        <div className="BarGraphContainer">
            <div style={{ marginTop: 20 }}>
                {
                    dashboard?.graphData?.loading
                        ?
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <CircularProgress size={35} />
                        </div>

                        : dashboard?.graphData?.error ?
                            "error...."
                            :
                            <Bar options={options} data={data} />
                }
            </div>
        </div>
    )
}
