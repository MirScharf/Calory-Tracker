import React from "react";
import Plot from "react-plotly.js";

const CaloryChart = ({ previousCalories, submittedDays}) => {
     if (!previousCalories || !previousCalories.length){return}
            const lastWeeksCaloricIntake = previousCalories.slice(Math.max(previousCalories.length - 7, 0))
            const days = submittedDays.slice(Math.max(submittedDays.length - 7, 0))
            const data = [
                {
                  type: "scatter",
                  mode: "lines+markers",
                  x: days,
                  y: lastWeeksCaloricIntake, 
                  marker: { color: "blue" },
                },
            ];
          
            const layout = {
                title: "Last Week's Caloric Intake",
                xaxis: { title: "Previous days on which you submitted"},
                yaxis: { title: "Calories" },
                font: { size: 14 },
            };
  
    return (
      <div id="caloryChart">
        <h3 id="chartHeadline">Monitor your daily caloric intake</h3>
        <Plot data={data} layout={layout} />
      </div>
    );
  };
  
  export default CaloryChart;