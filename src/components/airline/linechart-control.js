import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class LineChartControl extends Component {
  constructor(props){
    super(props);
    this.state = {
      opacity: {uv:1, pv:1, dataKey:{}},
      width: '0',
      height: '0'
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  formatYaxis = function(val, axis){
    return val.toLocaleString();
  }

  formatterTooltip = function(val){
    // return  val.toLocaleString(undefined, {maximumFractionDigits:2});
    return parseFloat(Math.round(val * 100) / 100).toFixed(2);
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

  getWidth(){
    if(this.state.width == 0){
      return '900'
    }else {
      return (this.state.width * 90)/100;
    }
  }

  render(){
    const { airlineShipments } = this.props;
    const { airlineName } = this.props;
    const handleFormatYaxis = this.formatYaxis.bind(this);
    const handleFormatterTooltip = this.formatterTooltip.bind(this);
    const { opacity } = this.state;
    
    return (
      
      <LineChart width={970} height={400} data={airlineShipments}
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

export default LineChartControl;