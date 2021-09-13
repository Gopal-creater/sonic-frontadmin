import React from 'react';
import {Line} from 'react-chartjs-2';


export default function Graph(props) {
    const {graphBgColor, graphData, preTitle} = props;

    //creating labels
    const labels = [];
    for (var i = 2; i < 33; i++) {
      labels.push(`${new Date(graphData ? graphData[0] ? graphData[0].year ? graphData[0].year : new Date().getFullYear() : new Date().getFullYear() : new Date().getFullYear(),
          graphData ? graphData[0] ? graphData[0].year ? graphData[0].month-1 : new Date().getMonth() : new Date().getMonth() : new Date().getMonth(),
          i).toISOString().slice(0, 10)}`);
    }
    // custom_log("labelss", labels);

     //creating graph data
     let actualData = [];
     const t = graphData ? graphData.length !== 0 ? [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map(num => {
        if(num <= new Date().getDate()){
          graphData.map(dt => {
            if(dt.day === num){
              actualData.push(dt.hits);
              // return dt.hits;

            }else{
              actualData.push(0);
              // return 0;
            }
          })
        }  
      }) : [] : [];

      // custom_log("actual data", actualData)

    const state = {
        // labels: [
        //     `${new Date(2020,0,10).toLocaleString('default', { month: 'short' })} ${new Date(2020,0,10).getUTCFullYear()}`, 
        // ],
         labels: labels,
        // labels: graphData ? graphData.map(data =>  `${new Date(data.year,data.month-1,data.day).toLocaleString('default', { month: 'short' })} ${new Date(data.year,data.month-1,data.day).toISOString().slice(0, 10)}`) : [],
        datasets: [
          {
            label: 'Sonic Keys',
            fill: false,
            lineTension: 0,  //for smoothing line
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(225,225,225,0.8)',
            borderWidth: 2,
            data: actualData ? actualData : [],
          }
        ]
      };

    return (
      <div style={{backgroundColor :  graphBgColor ? graphBgColor : 'rgba(0,0,0,0.3)' }}>
        <Line
          data={state}
          options={{
        
            plugins: {
                legend: false,
                tooltip: true,
                title: {
                    display: true,
                    text: (ctx) => `${preTitle} Sonic keys (${new Date().toLocaleString('default', { month: 'short' })})`,
                    color : 'white'
                  },
              },

              scales: {
                x: {
                  ticks: {
                    // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                    callback: function(val, index) {
                      // Hide the label of every 2nd dataset
                    //   return index % 2 === 0 ? this.getLabelForValue(val) : '';
                    return `${this.getLabelForValue(val).split('-')[1]}/${this.getLabelForValue(val).split('-')[2]}`;
                    },
                    color: 'white',
                  },
                },
                y: {
                    ticks: {
                      // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                    //   callback: function(val, index) {
                    //     // Hide the label of every 2nd dataset
                    //     return index % 2 === 0 ? this.getLabelForValue(val) : '';
                    //   },
                      color: 'white',
                    }
                  }
              },

              interaction: {
                intersect: true,
                mode: 'index',
              },

            //   color : 'white',
          }}
        />
      </div>
    );
}