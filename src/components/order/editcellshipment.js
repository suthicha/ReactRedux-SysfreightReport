import React, { Component } from 'react';

class EditCellShipment extends Component {

  render () {
    const className = this.props.className;
    const title = this.props.title;
    const fieldValue = this.props.fieldValue;
    const fieldName = this.props.fieldName;
    const fieldType = this.props.fieldType;
    const onValueChanged = this.props.onValueChanged;
   
    return (
      <div className={className}>
        <div className="field">
          <label className="label is-small">{title}</label>
          <div className="control">
            <input 
              id={fieldName}
              value={fieldValue}
              onChange={onValueChanged}
              className="input is-small" 
              type={fieldType} />
          </div>
        </div>
      </div>
    )
  }
}

export default EditCellShipment;