import _ from 'lodash';
import $ from 'jquery';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { fetchAirlineShipment } from '../../actions';
import LineChartControl from './linechart-control';
import LineChartTableControl from './linecharttable-control';
import PieChartTableControl from './piecharttable-control';
import PieChartControl from './piechart-control';

class AirlineDashboardReport extends Component {
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
    this.loadTransaction();
  }

  componentWillMount(){
    setInterval(()=>{
      this.loadTransaction();
    },30000);
  }

  handleSelectChange(evt){
    this.setState({period:evt.target.value})
  }

  loadTransaction(){
    _.delay(()=> {
      const period = this.state.period;
      this.props.fetchAirlineShipment({period});
      this.setState({loading:false})
    }, 500);
  } 

  handlerClickSearch(){
    this.setState({search:'',loading:true});
    this.loadTransaction();
  }

  renderSelected = function(){
    return(
      <select 
        ref="period"  
        name="period" 
        value={this.state.period} 
        onChange={this.handleSelectChange.bind(this)}>
          {this.state.years.map(function(year){
            return <option key={year} value={year}>{year}</option>
            })
          }
      </select>
    )
  }

  render() {  
    return(
      <div className="cell auto-size padding20 bg-white" id="cell-content">
      <h6 className="subtitle">TOP 10 AIRLINE REPORT</h6> 
      <hr className="thin bg-grayLighter" />
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <div className="panel">
            <p className="panel-heading" style={{textAlign:'center'}}>
              TOP 10 AIRLINE
            </p>
            <div className="panel-block">
            <div className="columns" style={{width:'100%'}}>
              <div className="column is-4 is-offset-4">
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
                        <button 
                          type="submit" 
                          onClick={this.handlerClickSearch.bind(this)} 
                          className={this.state.loading?"button is-primary is-loading":"button is-primary"}>
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className="column is-4" style={{textAlign:'right'}}>
            <p>UNIT = 1:1000</p>
            </div>
            </div>
          </div>
            <div className="panel-block">
              <PieChartControl data={this.props.airlineShipments} />
            </div>
            <div className="panel-block">
              <div className="columns" style={{width:'100%'}}>
                <div className="column is-6 is-offset-3">
                  <PieChartTableControl data={this.props.airlineShipments} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column is-10 is-offset-1">
        <div className="panel">
          <p className="panel-heading" style={{textAlign:'center'}}>
            TOP 10 AIRLINE YEARLY { this.state.period }
            </p>
          
          <div className="panel-block">
            <LineChartControl 
              airlineShipments={this.props.airlineDataForChart} 
              airlineName={this.props.airlineName} />
            
          </div>
          <div className="panel-block">
            <LineChartTableControl data={this.props.airlineShipments} />
          </div>
        
          </div>
        </div>
        </div>
    </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchAirlineShipment}, dispatch);
}

function mapStateToProps({airlineShipments, airlineDataForChart, airlineName}) {
  return { airlineShipments, airlineDataForChart, airlineName };
}

export default connect(mapStateToProps, mapDispatchToProps)(AirlineDashboardReport);
