import React from 'react'
import { Bar } from 'react-chartjs-2';

export const BarGraph = (props) => {

    const options={
        responsive: true,
        // plugins: {
        //     legend: false,
        //     tooltip: true,
        //     title: {
        //         display: true,
        //         text: "hello test",
        //         color: "white",
        //     }
        // }
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
    return (
        <div className="BarGraphContainer">
            <div style={{ marginTop: 20 }}>
                <Bar options={options} data={data} />
            </div>
        </div>
    )
}
