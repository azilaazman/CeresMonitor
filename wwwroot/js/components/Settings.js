var React = require('react');
var PropTypes = React.PropTypes;
var $ = require('jquery');
var Settings = React.createClass({
    loadPlantFromServer: function () {

        $.post("http://cereswebapi.azurewebsites.net/api/v1/getUnitSettings/5846c5f5f36d282dbc87f8d4",function(){
        }).done(function(data){
          var plantData = data[0];
          // console.log(plantData);
          // console.log(plantData["temp"]);
          this.setState({
            unit_id: plantData["_id"],
            temp:  plantData["temp"],
            humid: plantData["humid"],
            water: plantData["water"],
            light: plantData["light"],
            care: plantData["care"],
            name: plantData["name"]  
          })
          console.log("care: " + this.state.care);


        }.bind(this));//end done
      },
    getInitialState: function () {
        return {
            unit_id: '',
            name: '',
            temp: '',
            humid: '',
            water: '',
            light: '',
            care: '',
            clean: true,
            saved: false
        }
    },
    onNameChange: function(e){
        this.setState({ 
          name: e.target.value
         });
        this.onDirty();
    },
    onTempChange: function (e) {
        this.setState({ 
          temp: e.target.value
        });
        this.onDirty();
    },
    onHumidChange: function (e) {
        this.setState({ 
          humid: e.target.value
        });
        this.onDirty();
    },
    onWaterChange: function (e) {
        this.setState({ 
          water: e.target.value,
        });
        this.onDirty();
    },
    onLightChange: function (e) {
        this.setState({ 
          light: e.target.value
           });
        this.onDirty();
    },
    handleSubmit: function (e) {
        e.preventDefault();


        var name = this.state.name;
        var temp = this.state.temp;
        var humid = this.state.humid;
        var water = this.state.water;
        var light = this.state.light;
        var care = this.state.care;

        //no validation
        this.onServerSubmit({ name: name, temp: temp, humid: humid, water: water, light: light, care: care });        
    },
    onDirty: function(){
      this.setState({ clean: false })
    },
    onServerSubmit: function (plant) {

        var data = {
            name: plant.name,
            temp: plant.temp,
            humid: plant.humid,
            water: plant.water,           
            light: plant.light,
            care: plant.care
        }

        console.log(data);

        // phase 2: perform front end validation. 
        $.ajax({
            type: "PUT",
            url: "http://cereswebapi.azurewebsites.net/api/v1/UpdateUnitSettings/5846c5f5f36d282dbc87f8d4",
            data: data,
            success: function (data) {
                // alert("Changes saved!");
                this.setState({
                  saved: true 
                })
            }.bind(this),
            error: function (e) {
                console.log(e);
                alert('Error: Cannot update settings');
            }
        })
        
    },
    componentDidMount: function () {
        this.loadPlantFromServer();
        
        // $('#ddlCareLevel').val(this.state.care).attr("selected", "selected");
        //var e = document.getElementById("ddlCareLevel");
        //e.options[this.state.care]; 
    },
    renderChangesSaved: function(){
      return(
      
        <div className="alert alert-success alert-dismissable">
        <button type="button" className="close" onClick={this.close}></button>
        Your CERES unit environment variables has been changed. Please allow the unit some
        time to adjust itself. 
        </div>

        );
    },
    render: function() {

      console.log(this.state.saved);
      let renderChanges = this.state.saved ? this.renderChangesSaved() : null

        return (
          <div id="page-wrapper">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="page-header">Settings</h1>
              </div>
        {/* /.col-lg-12 */}
        </div>
        {/* /.row */}
        {renderChanges}
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
                        <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange} />
                        <span className="input-group-btn">
                          <button className="btn btn-default" type="button"><i className="fa fa-search" />
                          </button>
                        </span>
                      </div>
                     <label>Light Intensity</label>
                    <div className="form-group input-group">
                      <input id="light" type="text" className="form-control" placeholder="Light Intensity" value={this.state.light} onChange={this.onLightChange} />
                      <span className="input-group-addon">lm</span>
                    </div>
                      <label>Temperature</label>
                      <div className="form-group input-group">
                        <input id="temp" type="text" className="form-control" placeholder="Temperature" value={this.state.temp} onChange={this.onTempChange} />
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
              <input id="humidity" type="text" className="form-control" placeholder="Humidity" value={this.state.humid} onChange={this.onHumidChange} />
              <span className="input-group-addon">%</span>
            </div>        
            <label>Water Level Alert</label>
            <div className="form-group input-group">
              <input id="water-level" type="text" className="form-control" placeholder="Water Level" value={this.state.water} onChange={this.onWaterChange}/>
              <span className="input-group-addon">cm</span>
            </div>
           
        {/* Button trigger modal */}
        <button type="button" className="btn btn-success btn-md pull-right" onClick={this.handleSubmit} disabled={this.state.clean}>
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