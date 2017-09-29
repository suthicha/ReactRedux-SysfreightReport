import React, { Component } from 'react';

class LineChartTableControl extends Component {

  render(){
    const data  = this.props.data;
    const cellStyle = {textAlign:'right'};
    const parseTwodigit = function(num){
      var fnum = parseFloat(Math.round(num * 100) / 100).toFixed(2);
      var parts=fnum.toString().split(".");

      return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }
    
    return (
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>NAME</th>
            <th style={cellStyle}>JAN</th>
            <th style={cellStyle}>FEB</th>
            <th style={cellStyle}>MAR</th>
            <th style={cellStyle}>APR</th>
            <th style={cellStyle}>MAY</th>
            <th style={cellStyle}>JUN</th>
            <th style={cellStyle}>JUL</th>
            <th style={cellStyle}>AUG</th>
            <th style={cellStyle}>SEP</th>
            <th style={cellStyle}>NOV</th>
            <th style={cellStyle}>DEC</th>  
            <th style={cellStyle}>TOTAL</th>           
          </tr>
        </thead>
        <tbody>
          { data.map(function(row, i){
            return <tr key={i}>
              <td>{row.AirlineCode}</td>
              <td className="has-text-primary">{row.AirlineName}</td>
              <td style={cellStyle}>{ parseTwodigit(row.JAN) }</td>
              <td style={cellStyle}>{ parseTwodigit(row.FEB) }</td>
              <td style={cellStyle}>{ parseTwodigit(row.MAR) }</td>
              <td style={cellStyle}>{ parseTwodigit(row.APR) }</td>
              <td style={cellStyle}>{ parseTwodigit(row.MAY) }</td>
              <td style={cellStyle}>{ parseTwodigit(row.JUN) }</td>
              <td style={cellStyle}>{ parseTwodigit(row.JUL) }</td>
              <td style={cellStyle}>{ parseTwodigit(row.AUG) }</td>
              <td style={cellStyle}>{ parseTwodigit(row.SEP) }</td>
              <td style={cellStyle}>{ parseTwodigit(row.NOV) }</td>
              <td style={cellStyle}>{ parseTwodigit(row.DEC) }</td>   
              <td style={cellStyle}>{ parseTwodigit(row.TOTAL) }</td>                            
            </tr>
          })}
        </tbody>
      </table>
    )
  }
}

export default LineChartTableControl;