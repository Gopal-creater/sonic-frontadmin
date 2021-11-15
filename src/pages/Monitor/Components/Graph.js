import React from "react";
import { Line } from "react-chartjs-2";
import { log } from "../../../utils/app.debug";

export default function Graph(props) {
  const { graphBgColor, graphData, preTitle } = props;

  //creating labels
  const labels = [];
  for (var i = 2; i < 33; i++) {
    labels.push(
      `${new Date(
        graphData
          ? graphData[0]
            ? graphData[0].year
              ? graphData[0].year
              : new Date().getFullYear()
            : new Date().getFullYear()
          : new Date().getFullYear(),
        graphData
          ? graphData[0]
            ? graphData[0].year
              ? graphData[0].month - 1
              : new Date().getMonth()
            : new Date().getMonth()
          : new Date().getMonth(),
        i
      )
        .toISOString()
        .slice(0, 10)}`
    );
  }
  log("labelss", labels);

  //creating graph data
  let actualData = [];
  if(graphData){
    for (let day = 1; day <= 31; day++) {
      const graphDatapoint = graphData?.find?.(gd=>gd.day==day)
      if(graphDatapoint){
        actualData.push(graphDatapoint.hits)
      }else{
        actualData.push(0)
      }
      
    }
  }

  const state = {
    labels: labels,
    datasets: [
      {
        label: "Sonic Keys",
        fill: false,
        lineTension: 0, //for smoothing line
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(225,225,225,0.8)",
        borderWidth: 2,
        data: actualData ? actualData : [],
      },
    ],
  };

  return (
    <div
      style={{
        backgroundColor: graphBgColor ? graphBgColor : "rgba(0,0,0,0.3)",
      }}
    >
      <Line
        data={state}
        options={{
          plugins: {
            legend: false,
            tooltip: true,
            title: {
              display: true,
              text: (ctx) =>
                `${preTitle} Sonic keys (${new Date().toLocaleString(
                  "default",
                  { month: "short" }
                )})`,
              color: "white",
            },
          },

          scales: {
            x: {
              ticks: {
                // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                callback: function (val, index) {
                  // Hide the label of every 2nd dataset
                  //   return index % 2 === 0 ? this.getLabelForValue(val) : '';
                  return `${this.getLabelForValue(val).split("-")[1]}/${
                    this.getLabelForValue(val).split("-")[2]
                  }`;
                },
                color: "white",
              },
            },
            y: {
              ticks: {
                // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                //   callback: function(val, index) {
                //     // Hide the label of every 2nd dataset
                //     return index % 2 === 0 ? this.getLabelForValue(val) : '';
                //   },
                color: "white",
                precision: 0
              },
            },
          },

          interaction: {
            intersect: true,
            mode: "index",
          },
        }}
      />
    </div>
  );
}
