import React, { Component } from 'react';
import Header from './header';
import Sidebar from './sidebar';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {isLogin:false}
  }
  
  render() {
    /* read token in localstorage. */
    let authenticated = localStorage.getItem('authenticated');

    /* change body background color. */
    if (!authenticated){
      document.body.className = "bg-darkTeal";
    }else {document.body.className = "bg-steel";}

    const styleHeight = {height: '100%'}
    return (
      <div style={styleHeight}>
        <Header isLogin={authenticated} />
        <div className="page-content">
          <div className="flex-grid no-responsive-future" style={styleHeight}>
            <div className="row" style={styleHeight}>
              <Sidebar isLogin={authenticated} />
              
              { this.props.children }
              
            </div>
          </div>
          </div>
        </div>
    );
  }
}
