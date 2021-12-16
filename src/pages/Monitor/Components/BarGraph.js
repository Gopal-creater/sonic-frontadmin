import { CircularProgress } from '@material-ui/core';
import React from 'react'
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

export const BarGraph = (props) => {
    const options = {
        responsive: true,
    }

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
