import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { authLogout } from '../actions';

class Header extends Component {

  componentDidMount() {
    this.refs.btnlogout.addEventListener('click', this.handleClickLogout.bind(this));
  }

  handleClickLogout() {
    _.delay(()=> {
      this.props.authLogout();
    },300)
  }

  render() { 
    const widthStyle = {width: '250px'}
    const displayNon = {display: this.props.isLogin?'':'none'}
    const {fullname} = this.props;

    return(
      <div style={displayNon} className="app-bar fixed-top darcula" data-role="appbar">
      <a className="app-bar-element branding">CTIBKK</a>
      <span className="app-bar-divider"></span>
      <ul className="app-bar-menu">
          <li><a href="">Home</a></li>
          <li>
            <a href="" className="dropdown-toggle">Reports</a>
            <ul className="d-menu" data-role="dropdown">
                <li><Link to="/airline">Top 10 Airline</Link></li>
                <li><a href="">Top 10 Airline Destination</a></li>
            </ul>
          </li>
      </ul>
      <div className="app-bar-element place-right">
        <span className="dropdown-toggle">
            <i className="fa fa-user-o fa-lg" style={{paddingRight: '10px'}} />{fullname}
        </span>
          <div className="app-bar-drop-container padding10 place-right no-margin-top block-shadow fg-dark" data-role="dropdown" data-no-close="true" style={widthStyle}>
              <h2 className="text-light">Quick settings</h2>
              <ul className="unstyled-list fg-dark">
                  <li><a ref="btnprofile" className="fg-white1 fg-hover-yellow">Profile</a></li>
                  <li><a ref="btnlogout" className="fg-white2 fg-hover-yellow">Logout</a></li>
              </ul>
          </div>
      </div>
    </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({authLogout}, dispatch)
}

function mapStateToProps(state) {
  return { fullname: state.auth.fullname}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);