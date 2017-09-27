import React, { Component } from 'react';
import { Link } from 'react-router';

class Sidebar extends Component {
  
  render(){
    
    const divStyle = {
        backgroundColor: '#71b1d1', 
        height: '100%', 
        display: this.props.isLogin?'':'none'}
    
    return (
      <div className="cell size-x200" id="cell-sidebar" style={divStyle}>
      <ul className="sidebar">
        <li className="active">
            <Link to="/dashboard">
              <span className="mif-apps icon"></span>
              <span className="title">dashboard</span>
            </Link>
        </li>
          <li>
            <Link to="/tracking">
              <span className="mif-ship icon"></span>
              <span className="title">Shipments</span>
            </Link>
          </li>
          

      </ul>
    </div>
    )
  }
}

export default Sidebar;