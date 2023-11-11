import React from "react";
import Plot from "react-plotly.js";

const CaloryChart = ({ previousCalories }) => {
     if (!previousCalories || !previousCalories.length){return}
            const lastWeeksCaloricIntake = previousCalories.slice(Math.max(previousCalories.length - 7, 0))
            const data = [
                {
                  type: "scatter",
                  mode: "lines+markers",
                  x: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
                  y: lastWeeksCaloricIntake, 
                  marker: { color: "blue" },
                },
            ];
          
            const layout = {
                title: "Last Week's Caloric Intake",
                xaxis: { title: "Previous Seven Days"},
                yaxis: { title: "Calories" },
                font: { size: 14 },
            };
  
    return (
      <div>
        <h3 id="chartHeadline">Monitor your daily caloric intake</h3>
        <Plot data={data} layout={layout} />
      </div>
    );
  };
  
  export default CaloryChart;