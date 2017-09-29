import React, { Component } from 'react';

class PieChartTableControl extends Component {

  render() {
    const data  = this.props.data;
    const cellStyle = {textAlign:'right'};
    const parseTwodigit = function(num){
      var fnum = parseFloat(Math.round(num * 100) / 100).toFixed(2);
      var parts=fnum.toString().split(".");

      return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }

    return(
      <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>NAME</th>
          <th style={cellStyle}>TOTAL</th>           
        </tr>
      </thead>
      <tbody>
        { data.map(function(row, i){
          return <tr key={i}>
            <td>{row.AirlineCode}</td>
            <td className="has-text-primary">{row.AirlineName}</td> 
            <td style={cellStyle}>{ parseTwodigit(row.TOTAL) }</td>                            
          </tr>
        })}
      </tbody>
    </table>
    )
  }
}

export default PieChartTableControl;