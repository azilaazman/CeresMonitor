import React, { PropTypes } from 'react';
import {Line} from 'react-chartjs-2';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory, IndexRedirect } from 'react-router';

const lineChartArray = ({
  labels: [0],
  datasets: [
   {
       label: "Temperature",
       fill: true,
       lineTension: 0.1,
       backgroundColor: "rgba(75,192,192,0.4)",
       borderColor: "rgba(75,192,192,1)",
       borderCapStyle: 'butt',
       borderDash: [],
       borderDashOffset: 0.0,
       borderJoinStyle: 'miter',
       pointBorderColor: "rgba(75,192,192,1)",
       pointBackgroundColor: "#fff",
       pointBorderWidth: 1,
       pointHoverRadius: 5,
       pointHoverBackgroundColor: "rgba(75,192,192,1)",
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
    lineChartArray.datasets[0].data = data.lineChartArrayTemp;
    console.log(data.lineChartArrayTemp);
    lineChartArray.labels = data.lineChartTimeArray;
};

var stats = [];
var statsMax, statsMin, statsAvg;

const TempDetails = React.createClass({
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
      console.log("in updateChart");
      var chartHub = $.connection.chartHub;
      console.log(chartHub);
      $.connection.hub.url = "http://cereswebapi.azurewebsites.net/signalr/hubs";
      chartHub.server.initChartData = function(data){
        console.log(data);
      };
      //Call to Update LineChart from Server
      chartHub.client.updateChart = function (line_data) {
         UpdateLineChart(line_data);  //Call the LineChart Update method
         console.log(line_data);
         console.log(lineChartArray);

         //computing summary stats
      stats = line_data.lineChartArrayTemp;
      statsMax = Math.max.apply(Math, stats);
      statsMin = Math.min.apply(Math, stats);
      var total = 0;
      for(var i = 0; i < stats.length; i++) {
          total += stats[i];
      }
      statsAvg = total / stats.length;

      };
       $.connection.hub.start().done(function () {
           chartHub.server.initChartData();
           console.log("SignalR has started");

       });
    },
    render: function(){
        return (
          <div>
            <div id="page-wrapper">
              <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header text-primary"><i className="fa fa-thermometer-empty"></i>Temperature</h1>
                        </div>
                        {/* /.col-lg-12 */}
                      </div>
                      {/* /.row */}
                      <div className="row">
                        <div className="col-md-12">
                          <div className="panel panel-default">
                            <div className="panel-heading">
                              <strong>Temperature Monitor ©</strong></div>
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
                              <i className="fa fa-clock-o" aria-hidden="true" /> In the past 24 hours
                            </div>
                            <div className="panel-body">
                              <h4 className="text-danger">Highest Temperature: {this.state.max} °</h4>
                              <h4 className="text-primary">Lowest Temperature: {this.state.min} °</h4>
                              <h4 className="text-warning">Average Temperature: {this.state.avg} °</h4>
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
                        <Link to="/plants/lightDetails">
                          <a onClick={this.componentWillUnmount} className="btn btn-primary"><i className="fa fa-arrow-left" aria-hidden="true" />
                            Light Intensity
                          </a>
                          </Link>
                          <Link to="/plants/humidityDetails">
                          <a onClick={this.componentWillUnmount} className="btn btn-primary pull-right">
                            Humidity <i className="fa fa-arrow-right" aria-hidden="true" />
                          </a>
                          </Link>
                        </div>
                        {/* /.page-swapper */}
                      </div>
                      {/* /.row */}
            </div>
          </div>
      );
    }
});

module.exports = TempDetails;
