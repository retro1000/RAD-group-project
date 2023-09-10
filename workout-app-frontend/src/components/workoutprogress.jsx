import React from 'react';

const getColorBasedOnPercentage = (percentage) => {
  if (percentage >= 75) {
    return '#FF0000'; // Blue for high percentage
  } else if (percentage >= 50) {
    return '#FF5733'; // Orange for medium percentage
  } else {
    return '#00CC00'; // Green for low percentage
  }
};

const WorkoutProgress = ({ percentage }) => {
  const color = getColorBasedOnPercentage(percentage);

  const remainingColor = '#A9A9A9'; // Color for the remaining portion of the pie chart

  const pieChartStyle = {
    width: '150px',
    height: '150px',
    background: `conic-gradient(${color} 0% ${percentage}%, ${remainingColor} ${percentage}% 100%)`,
    borderRadius: '50%',
    position: 'relative',
  };

  const textStyle = {
    position: 'absolute',
    top: '28%',
    left: '52%',
    transform: 'translate(-50%, -50%)',
    fontSize: '18px',
    fontWeight: 'bold',
  };
  
  let textColor; // Define a variable to hold the color
  
  if (percentage >= 75) {
    textColor = '#FF0000'; // Blue for high percentage
  } else if (percentage >= 50) {
    textColor = '#FF5733'; // Orange for medium percentage
  } else {
    textColor = '#00CC00'; // Green for low percentage
  }
  
  textStyle.color = textColor; 
  
  return (
    <div className="workout-progress">
      <div className="pie-chart" style={pieChartStyle}></div>
      <span className="percentage" style={textStyle}>Progress:{percentage}%</span>
    </div>
  );
};

export default WorkoutProgress;
