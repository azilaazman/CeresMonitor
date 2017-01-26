var React = require('react');
var PropTypes = React.PropTypes;
var $ = require('jquery');
var Settings = React.createClass({
    loadPlantFromServer: function () {
        
        setInterval(function() {
          // console.log("hi");  
          
          $.post("http://cereswebapi.azurewebsites.net/api/v1/getUnitSettings/5846c5f5f36d282dbc87f8d4",function(){
          }).done(function(data){
            var plantData = data[0];
            // console.log(plantData);
            // console.log(plantData["temp"]);
            this.setState({
              unit_id: plantData["_id"],
              temp:  plantData["temp"] + '°C',
              humid: plantData["humid"] + '%',
              water: plantData["water"],
              light: plantData["light"] + 'lm' ,
              name: plantData["name"]  
            })
            console.log("unit id: " + this.state.unit_id);


          }.bind(this));//end done
        }.bind(this),2000);
      },
    getInitialState: function () {
        return {
            unit_id: '',
            name: '',
            temp: '',
            humid: '',
            water: '',
            care: '',
            light: '',
        }
    },
    componentDidMount: function () {
        this.loadPlantFromServer();
        
        // $('#ddlCareLevel').val(this.state.care).attr("selected", "selected");
        //var e = document.getElementById("ddlCareLevel");
        //e.options[this.state.care]; 
    },
    componentDidUpdate: function(prevProps, prevState){
        if (this.state.care == null) {
            // console.log("null care level");
            this.loadPlantFromServer();
            this.setState({
                care: this.state.care
            })
        }
        else {
            // console.log("care is " + this.state.care);
            // $('#ddlCareLevel').val(this.state.care).attr("selected", "selected");
        }
    },
    _setCare: function(){
        var care = parseInt(this.state.care);        
        $("#ddlCareLevel").val(care);
        console.log("Care is: " + this.state.care);
    },
    render: function() {
        return (
          <div id="page-wrapper">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="page-header">Settings</h1>
              </div>
        {/* /.col-lg-12 */}
        </div>
        {/* /.row */}
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                Basic Information
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-6">
                    <form role="form">
                    <label>CERES Unit ID</label>
                      <div className="form-group input-group">
                        <input type="text" className="form-control" value={this.state.unit_id} disabled/>
                        <span className="input-group-btn">
                          <button className="btn btn-default" type="button"><i className="fa fa-id-card" />
                          </button>
                        </span>
                      </div>
                      <label>Plant Name</label>
                      <div className="form-group input-group">
                        <input type="text" className="form-control" value={this.state.name} />
                        <span className="input-group-btn">
                          <button className="btn btn-default" type="button"><i className="fa fa-search" />
                          </button>
                        </span>
                      </div>
                     <label>Light Intensity</label>
                    <div className="form-group input-group">
                      <input id="light" type="text" className="form-control" placeholder="Light Intensity" value={this.state.light} />
                      <span className="input-group-addon">lm</span>
                    </div>
                      <label>Temperature</label>
                      <div className="form-group input-group">
                        <input id="temp" type="text" className="form-control" placeholder="Temperature" value={this.state.temp} />
                        <span className="input-group-addon">°C</span>
                      </div>
                      
                    </form>
                  </div>
        {/* /.col-lg-6 (nested) */}
        <div className="col-lg-6">
          <label>Environment Presets</label>
          <form role="form">    
          <label>Humidity</label>
            <div className="form-group input-group">
              <input id="humidity" type="text" className="form-control" placeholder="Humidity" value={this.state.humid} />
              <span className="input-group-addon">%</span>
            </div>        
            <label>Water Level Alert</label>
            <div className="form-group input-group">
              <input id="water-level" type="text" className="form-control" placeholder="Water Level" value={this.state.water}/>
              <span className="input-group-addon">cm</span>
            </div>
           
        {/* Button trigger modal */}
        <button type="button" className="btn btn-success btn-md pull-right" data-toggle="modal" data-target="#myModal">
          Save
        </button>
        {/* Modal */}
        <div className="modal fade" id="myModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 className="modal-title" id="myModalLabel">Success!</h4>
              </div>
              <div className="modal-body">
                Your new settings have been saved.
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <a href="index.html" className="btn btn-primary">Back to Dashboard</a>
              </div>
            </div>
        {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
        </div>
        {/* /.modal */}
        </form>
      </div>
        {/* /.col-lg-6 (nested) */}
        </div>
        {/* /.row (nested) */}
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

module.exports = Settings;