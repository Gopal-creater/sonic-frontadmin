import React from 'react'
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

function BarGraph(props) {
    const options = {
        responsive: true,
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: props?.labels,
                data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
                backgroundColor: 'rgb(66,133,244)',
            }
        ],
    };
    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    )
}

export default BarGraph
