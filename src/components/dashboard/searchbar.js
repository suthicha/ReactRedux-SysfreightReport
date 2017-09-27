import _ from 'lodash';
import React, { Component } from 'react';
import { getMonth, toDateString, replaceAll } from '../helper';
import $ from 'jquery';

class SearchBar extends Component {
  constructor(props){
    super(props);
    
    let mydate = new Date();
    this.state = {
      isloading: false,
      fromdate: mydate.getFullYear() +'-'+ getMonth(mydate) + '.' + '01', 
      todate: toDateString(mydate,'.')}
  }

  componentDidMount(){

    let fromdateCache = localStorage.getItem('fromdate');
    let todateCache = localStorage.getItem('todate');
    if (fromdateCache){
      this.setState({fromdate: fromdateCache})
    }
    if (todateCache){
      this.setState({todate:todateCache})
    }

  }

  handleFormSubmit(evt){
    evt.preventDefault();
    this.setState({isloading:true})
    let fromdateElt = $('#fromdate').children('input[type=text]').val();
    let todateElt = $('#todate').children('input[type=text]').val();

    const toNumberDate = function(d){
      return d.replace('.','').replace('.','');
    }
    
    const fromdate = toNumberDate(fromdateElt);
    const todate = toNumberDate(todateElt);
    
    _.delay(()=>{
      
      this.props.onClickSearch({fromdate, todate});
      localStorage.setItem('fromdate', fromdateElt);
      localStorage.setItem('todate',todateElt);
      this.setState({isloading:false});
    },300);
  }

  render() {
    return(
      <div className="row">
      <div className="col-md-2">

      </div>
      <div className="col-md-6">
      <form onSubmit={this.handleFormSubmit.bind(this)}>
      <div className="field is-horizontal">
        <div className="field-label is-small">
          <label className="label">FROM</label>
        </div>
        <div className="field-body">
          <div className="field">
          <div 
                id="fromdate" 
                ref="fromdate"
                className="input-control text" 
                data-role="datepicker" 
                data-preset={this.state.fromdate}>
                <input type="text" />
                <button className="button info fixed"><span className="mif-calendar"></span></button>
              </div>
          </div>
        </div>
        <div className="field-label">
        </div>
        <div className="field-label is-small">
          <label className="label">TO</label>
        </div>
        <div className="field-body">
          <div className="field">
          <div 
              id="todate" 
              className="input-control text" 
              data-role="datepicker" 
              data-preset={this.state.todate}>
              <input type="text" />
              <button className="button info fixed"><span className="mif-calendar"></span></button>
            </div>
          </div>
        </div>
        <div className="field-label">
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <button action="submit" className={this.state.isloading?"button is-primary is-small is-loading":"button is-primary is-small"}>
                <span className="icon">
                  <i className="fa fa-search"></i>
                </span>
                <span>
                SEARCH
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </form>
      </div>
      </div>
    )
  }
}

export default SearchBar;