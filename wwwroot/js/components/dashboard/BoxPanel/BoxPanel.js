var React = require('react');
var PropTypes = React.PropTypes;
import {Link} from 'react-router';
import classNames from 'classnames';
var BoxPanel = React.createClass({


  shouldComponentUpdate: function(nextProps, nextState){
      // return a boolean value

      if(this.props == nextProps)
      return false;
      else
      return true;
  },
  getDefaultProps: function() {
      return {
        data: '-'
      };
    },

  render: function() {
    
    var panelColorClass = classNames(this.props.className);  
    
    return (
      <div className="col-lg-3 col-md-6">
        <div className={panelColorClass}>
          <div className="panel-heading">
            <div className="row">
              <div className="col-xs-3">
                <i className="fa fa-thermometer-empty fa-5x" />
              </div>
              <div className="col-xs-9 text-right">
                <div className="huge">{this.props.data}</div>
                <div>{this.props.title}</div>
              </div>
            </div>
          </div>
          <Link to={this.props.link}>
            <div className="panel-footer">
              <span className="pull-left">View Details</span>
              <span className="pull-right"><i className="fa fa-arrow-circle-right" /></span>
              <div className="clearfix" />
            </div>
          </Link>
        </div>
      </div>
    );
  }
  });
module.exports = BoxPanel;