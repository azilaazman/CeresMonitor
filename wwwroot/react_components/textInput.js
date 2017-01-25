import React from 'react';
import classNames from 'classnames';



var TextInput = React.createClass({
  getDefaultProps: function() {
    return {
      errorText:'Please fill in the field',
      value:'',
      type: 'text',
      // labelText:'',
      placeholder:'',
      errorVisible: false,  
    };
  },  
  handleChange:function(e){
    this.props.onChange(e);    
    
  },  
  componentDidUpdate(prevProps){
    console.log('invoke focus in textInput');
    console.log(prevProps);    
  
   console.log(sadsdad);
    console.log(this.props.value);
    console.log(prevProps.value);    
        (this.props.value !== prevProps.value) ? this.refs.textInput.focus() : this.refs.textInput.blur();  
  },
  onClick:function(e){
    console.log('textinput onclick');
    e.target.focus();  
  },
  render: function() {
    var formClass = classNames(this.props.className,'form-group', {
      'has-error' : this.props.errorVisible    
    });
    
    var labelClass = classNames(this.props.className,'control-label');    
    
    return (
      <div className={formClass}>      
      {/*<label className="control-label">*/}
      <label className={labelClass}>
      {/*{this.props.labelText}*/}
      {this.props.children}
      </label>
      
      
      <div>
      <input
        ref="textInput"
      value={this.props.value}
      onChange={this.handleChange}
      type={this.props.type}
      className="form-control"
      placeholder={this.props.placeholder}
      onClick={this.onClick}
      autoFocus />
    
    {this.props.errorVisible ?
      <span className="help-block">
      {this.props.errorText}
      </span>
      : null }
    </div>
      </div>
    );
  }
  
});

module.exports = TextInput;