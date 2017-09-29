import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';

class PieChartControl extends Component {
  constructor(props){
    super(props);
    this.createLabels = this.createLabels.bind(this)
  }


  createLabels(data) {
    const total = data.reduce( function(cnt,o){ return cnt + o.TOTAL; }, 0);
    const calcPrecentage = function(val){
      return Math.floor(((val/total) * 100)+0.5);  
    }
    return data.map((m)=>{return m.AirlineCode + ' ' + calcPrecentage(m.TOTAL) + '%'})
  }

  render(){  
   
    return (
      <div>
        <Pie 
          options={{
            responsive: true,
            legend: {
              position: 'bottom',
            },
            animation: {
              animateScale: true,
              animateRotate: true
            },
            title:{display:true},
              tooltips: {
                callbacks: {
                  label: function(tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                      return previousValue + currentValue;
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var precentage = Math.floor(((currentValue/total) * 100)+0.5);        
                    return precentage + "%";
                  }
                }
              }
          }}
          data={{
            labels: this.createLabels(this.props.data),
            datasets:[
              {
                data: this.props.data.map((m)=> {return m.TOTAL}),
                backgroundColor: ["#DD461D","#DDDA1D","#1DDDCE","#1DBDDD","#1D9ADD","#B11DDD","#DD1DDD","#DFEC6B", "#F5C2EB", "#BBB1B9"],
                hoverBackgroundColor : ["#DD461D","#DDDA1D","#1DDDCE","#1DBDDD","#1D9ADD","#B11DDD","#DD1DDD","#DFEC6B", "#F5C2EB", "#BBB1B9"]
              }
            ]
            }}
          width={900}
	        height={400} />
      </div>
    )
  }
}

export default PieChartControl;