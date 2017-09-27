import React, { Component } from 'react';
import { LineChart, BarChart, ReferenceLine, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class AirLineShipmentLineChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      opacity: {uv:1, pv:1, dataKey:{}},
    }

  }

  formatYaxis = function(val, axis){
    return val.toLocaleString();
  }

  formatterTooltip = function(val){
    return  val.toLocaleString(undefined, {maximumFractionDigits:2});
  }

  handleMouseEnter(o) {
    
    const { dataKey } = o;
    const { opacity } = this.state;
    
  	this.setState({
    	opacity: { ...opacity, [dataKey]: 0.5 },
    });
  
  }

  handleMouseLeave(o) {
  	const { dataKey } = o;
    const { opacity } = this.state;
    
  	this.setState({
    	opacity: { ...opacity, [dataKey]: 1 },
    });
  }

  render(){
    const { airlineShipments } = this.props;
    const { airlineName } = this.props;
    const handleFormatYaxis = this.formatYaxis.bind(this);
    const handleFormatterTooltip = this.formatterTooltip.bind(this);
    const { opacity } = this.state;
    
    return (
      <LineChart width={900} height={450} data={airlineShipments}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="name" />
      <YAxis tickFormatter={handleFormatYaxis} />
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip formatter={handleFormatterTooltip}/>
      <Legend 
        onMouseEnter={this.handleMouseEnter.bind(this)} 
        onMouseLeave={this.handleMouseLeave.bind(this)} />
        { airlineName.map(function(item) {
          return <Line key={item.name} type="monotone" dataKey={item.name} stroke={item.color}  /> 
        })}
      </LineChart>  
    )
  }
}

export default AirLineShipmentLineChart;