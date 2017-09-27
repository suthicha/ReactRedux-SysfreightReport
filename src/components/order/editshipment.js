import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { findOrderInLocalStorage, saveEditOrder } from '../../actions';
import { toDateString } from '../helper';
import EditCellShipment from './editcellshipment';
import $ from 'jquery';

class EditShipment extends Component {
  constructor(props){
    super(props);
    this.state = {isloading:false}
  }
  componentDidMount(){
    this.props.findOrderInLocalStorage(this.props.params.id);
  }

  handleValueChange(evt){
    var item = {
      name: evt.target.id,
      value: evt.target.value
    }

    for(var key in this.props.order){
      if (key.toLocaleLowerCase() == item.name){
        this.props.order[key] = item.value.toUpperCase();
      }
    }
    this.forceUpdate();
    
  }

  handlerFormSubmit(evt){
    evt.preventDefault();

    this.setState({isloading:true})
    let departuredateVal = $('#departuredate').children('input[type=text]').val();
    let arrivaldateVal = $('#arrivaldate').children('input[type=text]').val();

    const toFormatDate = function(d){
      return d.replace('.','-').replace('.','-');
    }
    
    const departuredate = toFormatDate(departuredateVal);
    const arrivaldate = toFormatDate(arrivaldateVal);

    let order = this.props.order;
    order.DepartureDate = departuredate;
    order.ArrivalDate = arrivaldate;

    _.delay(()=> {
      this.props.saveEditOrder(this.props.order);      
    },300);

  }

  
  render() {

    const { MasterJobNo, JobNo, CustomerNo, CustomerName, TaxNo, OBL, HBL, MotherVessel,
          ArrivalDate, BookingNo, ContainerNo, BranchNo, CarrierBookingNo,
          DeliveryDate, DepartureDate, DestCode, DestName, FeederVessel, PortOfDischargeCode,
          PortOfDischargeName, PortOfLoadingCode, PortOfLoadingName, Remark } = this.props.order;
    
    const convertFromDateString = function(mydate){
      if (mydate== undefined)
      {
        return '1900.01.01';
      }
      return toDateString(mydate, '.');
    }

    const noborderStyle = {border: '0'}
    
    return (
      <div className="cell auto-size padding20 bg-white" id="cell-content">
        <h6 className="subtitle">EDIT SHIPMENT</h6> 
        <hr className="thin bg-grayLighter" />
        <div className="columns">
          <div className="column is-8 is-offset-1">
          <article className="message is-info">
          <div className="message-header">
            <p>Shipment Information</p>
          </div>
          <div className="message-body">
          <div className="columns">
            <EditCellShipment 
              className="column is-3" 
              title="MasterJobNo" 
              fieldName="masterjobno"
              fieldType="text"
              fieldValue={MasterJobNo}
              onValueChanged={this.handleValueChange.bind(this)} />
            <EditCellShipment 
              className="column is-3" 
              title="TaxNo" 
              fieldName="taxno"
              fieldType="text"
              fieldValue={TaxNo}
              onValueChanged={this.handleValueChange.bind(this)} />
            
            <EditCellShipment 
              className="column is-6" 
              title="Customer Name" 
              fieldName="customername"
              fieldValue={CustomerName}
              onValueChanged={this.handleValueChange.bind(this)} />
          </div>

          <div className="columns">
            <EditCellShipment 
              className="column is-3" 
              title="OBL" 
              fieldName="obl"
              fieldType="text"
              fieldValue={OBL}
              onValueChanged={this.handleValueChange.bind(this)} />
            <EditCellShipment 
              className="column is-3" 
              title="HBL" 
              fieldName="hbl"
              fieldType="text"
              fieldValue={HBL}
              onValueChanged={this.handleValueChange.bind(this)} />
            <EditCellShipment 
              className="column is-6" 
              title="ContainerNo." 
              fieldName="containerno"
              fieldType="text"
              fieldValue={ContainerNo}
              onValueChanged={this.handleValueChange.bind(this)} />

          </div>
          <div className="columns">
            <EditCellShipment 
              className="column is-3" 
              title="BookingNo" 
              fieldName="bookingno"
              fieldType="text"
              fieldValue={BookingNo}
              onValueChanged={this.handleValueChange.bind(this)} />
            <EditCellShipment 
              className="column is-3" 
              title="CarrierBookingNo" 
              fieldName="carrierbookingno"
              fieldType="text"
              fieldValue={CarrierBookingNo}
              onValueChanged={this.handleValueChange.bind(this)} />
            <EditCellShipment 
              className="column is-6" 
              title="MotherVessel" 
              fieldName="mothervessel"
              fieldType="text"
              fieldValue={MotherVessel}
              onValueChanged={this.handleValueChange.bind(this)} />

          </div>
          <div className="columns">
            <EditCellShipment 
              className="column is-6" 
              title="FeederVessel" 
              fieldName="feedervessel"
              fieldType="text"
              fieldValue={FeederVessel}
              onValueChanged={this.handleValueChange.bind(this)} />
          </div>
          <hr />
          <div className="columns">
            <EditCellShipment 
              className="column is-3" 
              title="Loading (PortCode)" 
              fieldName="portofloadingcode"
              fieldType="text"
              fieldValue={PortOfLoadingCode}
              onValueChanged={this.handleValueChange.bind(this)} />
            <EditCellShipment 
              className="column is-9" 
              title="Loading (Portname)" 
              fieldName="portofloadingname"
              fieldType="text"
              fieldValue={PortOfLoadingName}
              onValueChanged={this.handleValueChange.bind(this)} />
          </div>
          <div className="columns">
            <EditCellShipment 
              className="column is-3" 
              title="DestCode" 
              fieldName="destcode"
              fieldType="text"
              fieldValue={DestCode}
              onValueChanged={this.handleValueChange.bind(this)} />
            <EditCellShipment 
              className="column is-9" 
              title="Destination" 
              fieldName="destname"
              fieldType="text"
              fieldValue={DestName}
              onValueChanged={this.handleValueChange.bind(this)} />
            
          </div>
          <div className="columns">
            <EditCellShipment 
              className="column is-3" 
              title="PortOfDischargeCode" 
              fieldName="portofdischargecode"
              fieldType="text"
              fieldValue={PortOfDischargeCode}
              onValueChanged={this.handleValueChange.bind(this)} />
            <EditCellShipment 
              className="column is-9" 
              title="PortOfDischargeName" 
              fieldName="portofdischargename"
              fieldType="text"
              fieldValue={PortOfDischargeName}
              onValueChanged={this.handleValueChange.bind(this)} />
            
          </div>
          <div className="columns">
            <div className="column is-3">
              <div className="field">
                <label className="label is-small">ETD</label>
                <div className="field">
                  <div 
                  id="departuredate" 
                  ref="departuredate"
                  className="input text is-small" 
                  data-role="datepicker" 
                  data-preset={convertFromDateString(DepartureDate)}>
                  <input type="text" style={noborderStyle} />
                  <button className="button info fixed"><span className="mif-calendar"></span></button>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
          <div className="column is-3">
              <div className="field">
                <label className="label is-small">ETA</label>
                <div className="field">
                  <div 
                  id="arrivaldate" 
                  ref="arrivaldate"
                  className="input text is-small" 
                  data-role="datepicker" 
                  data-preset={convertFromDateString(ArrivalDate)}>
                  <input type="text" style={noborderStyle} />
                  <button className="button info fixed"><span className="mif-calendar"></span></button>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column is-12">
              <div className="field">
                <label className="label is-small">Remark</label>
                <div className="control">
                  <textarea 
                    id="remark"
                    value={Remark}
                    onChange={this.handleValueChange.bind(this)}
                    className="textarea is-small" />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="columns">
            <div className="column is-12">
            <div className="field is-grouped">
              <div className="control">
                <button 
                onClick={this.handlerFormSubmit.bind(this)}
                className={this.state.isloading?"button is-primary is-small is-loading":"button is-primary is-small"}>Submit</button>
              </div>
              <div className="control">
                <Link to="/dashboard" className="button is-link is-small">Cancel</Link>
              </div>
            </div>
            </div>
          </div>
          </div>
          </article>
        </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({findOrderInLocalStorage, saveEditOrder}, dispatch);
}

function mapStateToProps({order}) {
  return {order}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditShipment);  