import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { fetchAirlineShipment } from '../../actions';
import { LineChart, BarChart, ReferenceLine, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import AirLineShipmentLineChart from './airlineshipment_linechart';
import $ from 'jquery';


class Dashboard extends Component {
  constructor(props){
    super(props);

    const mydate = new Date();
    this.state = {
      period: mydate.getFullYear(),
      years:[],
      loading: false
    }
  }

  componentDidMount(){
    
    let years = [];
    for(var i = this.state.period - 20; i < this.state.period + 1; i++){
        years.push(i);
    }
    this.setState({years:years})
   
  }

  handleSelectChange(evt){
    this.setState({period:evt.target.value})
    
    // _.delay(() => {
    //   this.props.editOrder(shipment);
    //   browserHistory.push('/shipment/' + shipment.TrxNo)
    // },500);
  }

  handlerClickSearch(){
    
    this.setState({search:'',loading:true});
    
    _.delay(()=> {
      const period = this.state.period;
      this.props.fetchAirlineShipment({period});
      this.setState({loading:false})
    }, 500);

  }

  renderSelected = function(){
    return(
      <select ref="period"  name="period" value={this.state.period} onChange={this.handleSelectChange.bind(this)}>
        {this.state.years.map(function(year){
          return <option key={year} value={year}>{year}</option>
        })}
      </select>
    )
  }

  render() {
    return(
      <div className="cell auto-size padding20 bg-white" id="cell-content">
        <h6 className="subtitle">DASHBOARD</h6> 
        <hr className="thin bg-grayLighter" />
        <div className="panel">
          <p className="panel-heading">Shipment Summary Report</p>
          <div className="panel-block">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Year </label>
              </div>
              <div className="field-body">
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      {this.renderSelected()}
                    </div>
                  </div>
                  <div className="control">
                    <button onClick={this.handlerClickSearch.bind(this)} type="submit" 
                    className={this.state.loading?"button is-primary is-loading":"button is-primary"}>Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="panel-block">
            <AirLineShipmentLineChart 
            airlineShipments={this.props.airlineShipments} 
            airlineName={this.props.airlineName} />
            </div>
        </div>
        <div>
      </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchAirlineShipment}, dispatch);
}

function mapStateToProps({airlineShipments, airlineName}) {
  return { airlineShipments, airlineName };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);