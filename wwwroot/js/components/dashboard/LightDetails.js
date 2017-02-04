import React, { PropTypes } from 'react';
import {Line} from 'react-chartjs-2';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory, IndexRedirect } from 'react-router';

const lineChartArray = ({
  labels: [0],
  datasets: [
   {
       label: "Light",
       fill: true,
       lineTension: 0.1,
       backgroundColor: "rgba(217, 83, 79,0.4)",
       borderColor: "rgba(217, 83, 79,1)",
       borderCapStyle: 'butt',
       borderDash: [],
       borderDashOffset: 0.0,
       borderJoinStyle: 'miter',
       pointBorderColor: "rgba(217, 83, 79,1)",
       pointBackgroundColor: "#fff",
       pointBorderWidth: 1,
       pointHoverRadius: 5,
       pointHoverBackgroundColor: "rgba(217, 83, 79,1)",
       pointHoverBorderColor: "rgba(220,220,220,1)",
       pointHoverBorderWidth: 2,
       pointRadius: 5,
       pointHitRadius: 10,
       data: [0]
   }
  ]

});

function UpdateLineChart(data) {
    //Set data returned from Server
    lineChartArray.datasets[0].data = data.lineChartArrayLight.reverse();
    console.log(data.lineChartArrayTemp);
    lineChartArray.labels = data.lineChartTimeArray.reverse();
};

var stats = [];
var statsMax, statsMin, statsAvg;

const LightDetails = React.createClass({
    getInitialState: function(){
    return {
        max: '0',
        min: '0',
        avg: '0',
    }   
  },
  componentDidMount: function(){
    this.updateChart();
  },
  componentWillMount: function(){
    setInterval(() => {
    this.setState(lineChartArray);
    this.setState({ max: statsMax});
    this.setState({ min: statsMin});
    this.setState({ avg: statsAvg});
  }, 5000);
  },
  componentWillUnmount: function(){
    console.log("unmounted");
    $.connection.hub.stop();
  },
  updateChart: function(){
   var chartHub = $.connection.chartHub;
   console.log(chartHub);

   var unit_id = '5846c5f5f36d282dbc87f8d4';

   $.connection.hub.url = "http://ceressignalr.azurewebsites.net/signalr/hubs";
   $.connection.hub.logging = true;

   //Call to Update LineChart from Server    
   chartHub.client.updateChart = function (line_data) {
       UpdateLineChart(line_data);  //Call the LineChart Update method  
       console.log(line_data);

      stats = line_data.lineChartArrayLight;
      statsMax = Math.max.apply(Math, stats);
      statsMin = Math.min.apply(Math, stats);
      var total = 0;
      for(var i = 0; i < stats.length; i++) {
          total += stats[i]; 
      }
      var rawAvg = total / stats.length;

      statsAvg  = Math.round(rawAvg * 10) / 10;     
       


   };

   $.connection.hub.start({withCredentials: false}).done(function () {
       chartHub.server.initChartData(unit_id);
       console.log("hub start");

   });  
   // $.connection.hub.disconnected(function() {
   // setTimeout(function() {
   //  console.log("disconnected");
   //     $.connection.hub.start({withCredentials: false});
   // }, 5000); // Restart connection after 5 seconds.
  },
  render () {
    return (
      <div id="page-wrapper">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header text-danger"><i className="fa fa-sun-o" /> Light Intensity</h1>
          </div>
          {/* /.col-lg-12 */}
        </div>
        {/* /.row */}
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <strong>LightView ©</strong></div>
              {/* /.panel-heading */}
              <div className="panel-body">
                  <Line data={lineChartArray} />
              </div>
              {/* /.panel-body */}
            </div>
            {/* /.panel */}
          </div>
          {/* /.col-md-6 */}
          <div className="col-md-12">
            <div className="panel panel-green">
              <div className="panel-heading">
                <i className="fa fa-clock-o" aria-hidden="true" /> In the past hour..
              </div>
              <div className="panel-body">
                <h4 className="text-danger">Highest intensity: {this.state.max} lm</h4>
                <h4 className="text-primary">Lowest intensity: {this.state.min} lm</h4>
                <h4 className="text-warning">Average intensity: {this.state.avg} lm</h4>
              </div>
              <Link to="/plants/settings">
              <a onClick={this.componentWillUnmount}>
                <div className="panel-footer">
                  <span className="pull-left">Open Settings</span>
                  <span className="pull-right"><i className="fa fa-arrow-circle-right" /></span>
                  <div className="clearfix" />
                </div>
              </a>
              </Link>
            </div>
          </div>
          {/* /.col-lg-6 */}
          <div className="col-sm-12 page-swapper">
          <Link to="/plants/electricityDetails">
            <a onClick={this.componentWillUnmount} className="btn btn-primary"><i className="fa fa-arrow-left" aria-hidden="true" />
              Electricity
            </a>
          </Link>
          <Link to="/plants/tempDetails">
            <a onClick={this.componentWillUnmount} className="btn btn-primary pull-right">
              Temperature <i className="fa fa-arrow-right" aria-hidden="true" />
            </a>
          </Link>
          </div>
          {/* /.page-swapper */}
        </div>
        {/* /.row */}
      </div>
    )
  }
})

export default LightDetails
