import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Tracking extends Component {
  render() {
    return (
      <div>
        <h2>Tracking Shipment</h2>
      </div>
    )
  }
}

function mapStateToProps({trackShipments}) {
  return {trackShipments}
}

export default connect(mapStateToProps)(Tracking);
