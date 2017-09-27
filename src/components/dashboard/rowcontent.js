import React, { Component } from 'react';
import { toDateString } from '../helper';

class RowContent extends Component{
  render(){
    if (this.props.loading){
      return (
        <tbody>
        <tr>
          <td colSpan="5">
            Loading...
          </td> 
        </tr>
        </tbody>
      )
    }

    const tdstyle = {verticalAlign: 'bottom'}
    const btnwidth = {width: '75px'}
    const handleClick = this.props.onCellClick;
    const itemRows = this.props.shipments.map(function(shipment) {
      return (
        <tr key={shipment.TrxNo}>
          <td>{shipment.MasterJobNo}</td>
          <td>
          {shipment.CustomerName}
          </td>
          <td>
            <div className="row">
            <div className="col-md-12">
              <ul className="list-unstyled">
              <li>
              <span className="icon has-text-info">
                <i className="fa fa-info-circle"></i>
              </span>
                LOADING PORT
                  <ul>
                    <li>{shipment.PortOfLoadingCode} : {shipment.PortOfLoadingName}</li>
                  </ul>
                </li>
                <li>
                <span className="icon has-text-info">
                  <i className="fa fa-info-circle"></i>
                </span>
                  DISCHARGE PORT
                  <ul>
                    <li>{shipment.PortOfDischargeCode} : {shipment.PortOfDischargeName}</li>
                    <li className="text-warning">ETD : { toDateString(shipment.DepartureDate,'-')}</li>                
                    <li className="text-primary">ETA : { toDateString(shipment.ArrivalDate,'-')}</li>                
                  </ul>
                </li>
              </ul>
              </div>
            </div>
          </td>
          <td>
            <div className="row">
              <div className="col-md-12">
                <ul className="list-unstyled">
                  <li>HBL
                    <ul>
                      <li>{shipment.HBL}</li>
                    </ul>
                  </li>
                  <li>OBL
                    <ul>
                      <li>{shipment.OBL}</li>
                    </ul>
                  </li>
                  <li>BKNO
                    <ul>
                      <li>{shipment.BookingNo}</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </td>
          <td style={tdstyle}>
            <button 
              onClick={()=> this.props.onCellClick(shipment)} 
              className={shipment.Status =='A'?"button is-success is-small":"button is-danger is-small"}
              style={btnwidth}>
              <span className="icon">
                <i className={shipment.Status == "A"?"fa fa-pencil":"fa fa-plus"}></i>
              </span>
              <span>
              { shipment.Status == "A"? "UPDATE": "ADD"}
              </span>
            </button>
          </td>
      </tr>
      )
    }.bind(this));

    return(
      <tbody>
      { itemRows}
      </tbody>
    )
  }
}

export default RowContent;