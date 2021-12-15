import React from 'react'
import { Bar } from 'react-chartjs-2';
import { log } from '../../../utils/app.debug';

export const BarGraph = (props) => {

    log("Graph Data", props.data)
    const options = {
        responsive: true,
        // plugins: {
        //     title: {
        //         align: 'start',
        //         display: true,
        //         text: props?.title,
        //     },
        // },
    }

    const data = {
        labels: props?.data?.data?.playsArtistWise?.map((graphData, index) => {
            return graphData?._id
        }),
        datasets: [
            {
                label: props?.title,
                data: props?.data?.data?.playsArtistWise?.map((graphData, index) => {
                    return graphData?.total
                }),
                backgroundColor: 'rgb(66,133,244)',
            }
        ],
    };
    console.log("label:", props.label);
    console.log("data:", props.data);
    return (
        <div className="BarGraphContainer">
            <div style={{ marginTop: 20 }}>
                <Bar options={options} data={data} />
            </div>
        </div>
    )
}
