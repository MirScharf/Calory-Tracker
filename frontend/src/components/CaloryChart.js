import React from "react";
import Plot from "react-plotly.js";

const CaloryChart = ({ previousCalories, submittedDays, caloryGoal}) => {
     if (!previousCalories || !previousCalories.length){return}
      const lastWeeksCaloricIntake = previousCalories.slice(Math.max(previousCalories.length - 7, 0))
      const days = submittedDays.slice(Math.max(submittedDays.length - 7, 0))

      let sum = 0
      for (let i = 0; i < lastWeeksCaloricIntake.length; i++){
       sum = sum + lastWeeksCaloricIntake[i] - caloryGoal
      }
      const avgDiff = parseInt(sum / lastWeeksCaloricIntake.length)

      let userEval="NaN"
      if (avgDiff > - 150 && avgDiff < 150){
        userEval = "You are doing pretty good!"
      } else {
        userEval = "There is room for improvement."
      }

      // If No caloryGoal is set prevent user from seeing a summary
      let summaryJsx = <div></div>
      if (!isNaN(caloryGoal)){
        summaryJsx =  <div id="userEval">Summary:
        <div>On average you are {avgDiff} Calories away from your Goal.</div> {userEval}
        </div>
      }

      const calgoal = {
        type: "scatter",
        mode: "lines",
        x: [days[0], days[days.length - 1]],
        y: [caloryGoal, caloryGoal],
        line: { color: "green", dash: "dash" },
        name:  "Your Goal",
      }

      const data = [
          {
            type: "scatter",
            mode: "lines+markers",
            x: days,
            y: lastWeeksCaloricIntake, 
            marker: { color: "blue" },
            name: "Your Calories  "
          },
          calgoal
      ];
    
      const layout = {
          title: "Calory intake history",
          xaxis: { title: "Previous days on which you submitted"},
          yaxis: { title: "Calories" },
          font: { size: 14 },
          legend: { x: 0.8, y: 1, font: {size: 14}},
        
      };
  
      return (
        <div id="caloryChart">
          <h3 id="chartHeadline">Monitor your daily caloric intake</h3>
          <Plot data={data} layout={layout} />
          {summaryJsx}
        </div>
    );
  };
  
  export default CaloryChart;