var $ = require('jquery');
var moment = require('moment');
import React, { PropTypes } from 'react';
import { Link, IndexRoute, browserHistory, hashHistory, IndexRedirect } from 'react-router';
import awsIot from 'aws-iot-device-sdk';
import BoxPanel from './BoxPanel/BoxPanel.js'

var WaterLevelAlert = React.createClass({
  componentDidMount: function(){
      setInterval(function(){
        this.setState({
          showAlert: this.props.showAlert
        })
      }.bind(this), 3000);
  },
  getInitialState: function() {
    return {
      showAlert: ''
    };
  },
  renderAlert: function(water, waterAlert) {
    return (
      <div>
      <div className="alert alert-danger alert-dismissable">
        <button type="button" className="close" onClick={this.close}>×</button>
        Holy guacamole! Your current water level is at {water}cm which has exceeded your water level settings of {waterAlert}cm. Is this expected? <a href="/plants/settings" className="alert-link"> Modify your settings. </a>
      </div>
      </div>
    );
  },
  close: function(){
    this.setState({
      showAlert: false
    });
  },
  render: function(){
    // console.log("in WL Alert: " + this.state.showAlert);
    let renderAlert = this.state.showAlert ? this.renderAlert(this.props.currentWater, this.props.waterAlert) : null

    return (
      <div>
      <div>{renderAlert}</div>
      </div>
      );      

  }
});



var DashBoard = React.createClass({
  loadWaterAlertSettings: function(){

    $.post("http://cereswebapi.azurewebsites.net/api/v1/GetUnitSettings/5846c5f5f36d282dbc87f8d4",function(){
      }).done(function(data){
        var plantData = data[0];
        this.setState({
          waterAlert: plantData["water"]
        })
      // console.log(this.state.waterAlert);

      }.bind(this));//end done
  },
  loadPlantFromServer: function () {
    
    setInterval(function() {
      
      
      $.post("http://cereswebapi.azurewebsites.net/api/v1/GetLatestPlantValue/5846c5f5f36d282dbc87f8d4",function(){
      }).done(function(data){
        var plantData = data[0];
        // console.log(plantData);
        // console.log(plantData["temp"]);
        this.setState({
          temp:  plantData["temp"] + '°C',
          humid: plantData["humid"] + '%',
          water: plantData["water"],
          light: plantData["light"] + 'lm'
        })

        this.checkWaterAlert();


      }.bind(this));//end done
    }.bind(this), 2000);

    $.post("http://cereswebapi.azurewebsites.net/api/v1/getUnitSettings/5846c5f5f36d282dbc87f8d4",function(){
      }).done(function(data){
        var plantData = data[0];
        // console.log(plantData);
        // console.log(plantData["temp"]);
        this.setState({
          name: plantData["name"],
          startDate: plantData["startDate"],
          endDate: plantData["endDate"]
        })

        this.formatDate();

      }.bind(this));//end done





// var buffer = fs.readFileSync(filename);
    //  var contents = fs.readFileSync('./AWSCert/1f452c99e4-private.pem.key', 'utf8');
    // var keyPathFile = fs.readFileSync('./AWSCert/1f452c99e4-private.pem.key');
    // var certPathFile = fs.readFileSync('./AWSCert/1f452c99e4-certificate.pem.crt');
    // var caPathFile = fs.readFileSync('./AWSCert/root-CA.crt');
    
    //  console.log("loadSensorDataFromAWSIOT");
    //  
    // //  console.log(keyPathFile);
    //  var thingShadows = awsIot.thingShadow({
    //    keyPath: './AWSCert/1f452c99e4-private.pem.key', 
    //    certPath: './AWSCert/1f452c99e4-certificate.pem.crt', 
    //    caPath: './AWSCert/root-CA.crt', 
    //    clientId: 'raspberrypi', 
    //    region: 'a16h9u0dkdtqab.iot.ap-southeast-1.amazonaws.com'
    //  })
     
    //  var clientToken;
     
     //this function return a client token
    //  thingShadows.on('connect', function() {
    //  //every 5 seconds,get sensor data from aws iot with mqtt client topic (get)
    //    setTimeout(function() {
    //      clientToken = thingShadows.get('raspberrypi');
    //      
    //      console.log(clientToken);
    //    },5000);     
    //  })
     
     
    },
    formatDate: function(){
      var startMoment = moment(this.state.startDate, "DD-MMM-YYYY");
      var ago = moment(startMoment, "YYYYMMDD").fromNow();

      var endMoment = moment(this.state.endDate, "DD-MMM-YYYY");
      var left = moment(endMoment, "YYYYMMDD").fromNow();

      this.setState({
        timeAgo: ago,
        timeLeft: left
      })
      // console.log(this.state.timeAgo + " : " + this.state.timeLeft);
    },
    checkWaterAlert: function(){
      // var currentWater = parseFloat(this.state.water); //uncomment this once water level data is rcved
      var currentWater = 6; //FOR TESTING ONLY
      var alertSetting = parseFloat(this.state.waterAlert);
      // console.log(currentWater + " and " + alertSetting);

      if(currentWater > alertSetting){
          this.setState({
            showAlert: true
          })
          // console.log("Water level too high!");      
        }
      else
        {
          this.setState({
            showAlert: false
          })   
          // console.log("Water level ok!");   
        }
   },
   getInitialState: function(){
        return {
            name: '-',
            temp: '-°C',
            humid: '-%',
            water: '-',
            care: '',
            light: '-lm',
            power: '-W',
            waterAlert: '',
            showAlert: false,
            startDate: '',
            endDate: '',
            timeAgo: '',
            timeLeft: ''
        }
    },
   componentDidMount: function(){
     console.log("component did mount..");
     this.loadWaterAlertSettings();
     this.loadPlantFromServer();
   },
   render: function() {
        return (
          <div id="page-wrapper">
            <div className="row">              
              <div className="col-lg-12">
                <h1 data-step="1" data-intro="This is your home!" className="page-header">Dashboard</h1>
              </div>
                {/* /.col-lg-12 */}
            </div>
              {/* /.row */}
          <div className="row">
          <WaterLevelAlert waterAlert={this.state.waterAlert} currentWater='6' showAlert={this.state.showAlert}/>
            <div className="row" data-step="2" data-intro="Find all your crucial data here!"> 
            
              <BoxPanel 
                className="panel panel-primary"
                link="/plants/tempDetails" 
                data={this.state.temp}
                title="Temperature"
              />
      
              <BoxPanel 
                className="panel panel-green"
                link="/plants/humidityDetails"
                data={this.state.humid}
                title="Humidity"
              />

              <BoxPanel 
                className="panel panel-yellow"
                link="/plants/electricityDetails"
                data={this.state.power}
                title="Electricity"
              />

              <BoxPanel 
                className="panel panel-red"
                link="/plants/lightDetails"
                data={this.state.light}
                title="Light Intensity"
              />
                
          </div>

          <div className="col-md-6">
            <div className="panel panel-success">
              <div className="panel-heading">
                <i className="fa fa-info-circle fa-fw" /> Information Panel
              </div>
                {/* /.panel-heading */}
        <div className="panel-body">
          <h4>Your CERES Unit is growing <span className="text-success">{this.state.name}<i className="fa fa-pagelines" aria-hidden="true" /></span></h4>
          <div className="list-group">
               <a href="#" className="list-group-item">
                  <i className="fa fa-birthday-cake fa-fw"></i> {this.state.startDate}
                    <span className="pull-right text-muted small">
                        <em>{this.state.timeAgo}</em>
                    </span>
               </a>
              <a href="#" className="list-group-item">
                    <i className="fa fa-hourglass-end fa-fw"></i> {this.state.endDate}
                    <span className="pull-right text-muted small"> 
                        <em>{this.state.timeLeft} time</em>
                    </span>
              </a>  
          </div>
        </div>
                {/* /.panel-body */}
            </div>
              {/*/.panel*/}
          </div>
            {/*/.col-md-6 */}
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-heading">
              <i className="fa fa-video-camera fa-fw" /> {this.state.name} Live Feed
            </div>
              {/* /.panel-heading */}
        <div className="panel-body">
            <iframe src="http://www.w3schools.com" scrolling="no" width="100%" height="50%">
                  <p>To put live video content</p>
            </iframe>
        </div>
              {/* /.panel-body */}
          </div>
            {/* /.panel */}
        </div>
            {/* /.col-lg-12 */}
        </div>
              {/* /.row */}
          </div>
    );
}
});

module.exports = DashBoard;
