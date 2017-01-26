var React = require('react');
var PropTypes = React.PropTypes;

var AddPlant = React.createClass({
    getInitialState: function(){
        return {
            name: '',
            temp: '',
            humid: '',
            water: '',
            care: '',
            light: '',
        }
    },
    onNameChange: function(e){
        this.setState({ name: e.target.value });
    },
    onTempChange: function (e) {
        this.setState({ temp: e.target.value });
    },
    onHumidChange: function (e) {
        this.setState({ humid: e.target.value });
    },
    onWaterChange: function (e) {
        this.setState({ water: e.target.value });
    },
    onCareLevelChange: function (e) {
        var e = document.getElementById("ddlCareLevel");
        this.setState({ care: e.options[e.selectedIndex].value})
    },
    onLightChange: function (e) {
        this.setState({ light: e.target.value });
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var name = this.state.name.trim();
        var temp = this.state.temp.trim();
        var humid = this.state.humid.trim();
        var water = this.state.water.trim();
        var care = this.state.care.trim();
        var light = this.state.light.trim();

        //no validation
        this.onServerSubmit({ name: name, temp: temp, humid: humid, water: water, care: care, light: light });        
    },
    onServerSubmit: function (plant) {
        //var plants = this.state.data;
      
        // TODO: submit to the server and refresh the list
        var data = {
            name: plant.name,
            temp: plant.temp,
            humid: plant.humid,
            water: plant.water,
            care: plant.care,
            light: plant.light,
        }

        //phase 2: perform front end validation. 
        //if(valid){$.ajax.. }
        $.ajax({
            type: "POST",
            url: "http://localhost:52781/api/v1/AddNewPlant",
            data: data,
            success: function (data) {
                //clear form
                this.setState({ name: '', temp: '', humid: '', water: '', light: ''});
                alert("Plant " + plant.name + " added!");
            }.bind(this),
            error: function (e) {
                console.log(e);
                alert('Error: Add plant failed');
            }
        })
        console.log(data);

        //var xhr = new XMLHttpRequest();
        //xhr.open('post', this.props.submitUrl, true);
        //xhr.send(data);
    },
    render: function() {
        return (

          <div id="page-wrapper">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="page-header">Add a New Plant</h1>
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
                      <label>Plant Name</label>
                      <div className="form-group input-group">
                        <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange} />
                        <span className="input-group-btn">
                          <button className="btn btn-default" type="button"><i className="fa fa-search" />
                          </button>
                        </span>
                      </div>

        {/*<div className="form-group input-group">
                        <input id="power" type="text" className="form-control" placeholder="Power" value={this.state.power} onChange={this.onPowerChange}/>
                           <span className="input-group-addon">W</span>
                      </div>*/}
                      <label>Light Intensity</label>
        <div className="form-group input-group">
          <input id="light" type="text" className="form-control" placeholder="Light Intensity" value={this.state.light} onChange={this.onLightChange}/>
          <span className="input-group-addon">lm</span>
        </div>
        <label>Temperature</label>
            <div className="form-group input-group">
              <input id="temp" type="text" className="form-control" placeholder="Temperature" value={this.state.temp} onChange={this.onTempChange} />
              <span className="input-group-addon">°C</span>
        </div>

        {/*<div className="form-group">
                        <label>Upload Presets</label>
                        <input type="file" />
                      </div>*/}
        </form>
      </div>
        {/* /.col-lg-6 (nested) */}
        <div className="col-lg-6">
          <label><strong>Environment Presets</strong></label>
          <form role="form">          
            <label>Humidity</label>
            <div className="form-group input-group">
              <input id="humidity" type="text" className="form-control" placeholder="Humidity" value={this.state.humid} onChange={this.onHumidChange} />
              <span className="input-group-addon">%</span>
            </div>
            <label>Water Level Alert</label>
            <div className="form-group input-group">
              <input id="water-level" type="text" className="form-control" placeholder="Water Level" value={this.state.water} onChange={this.onWaterChange} />
              <span className="input-group-addon">cm</span>
            </div>
            <div className="form-group">
              <label>Care Level</label>
              <select id="ddlCareLevel" className="form-control" onChange={this.onCareLevelChange}>
                <option value="0">Select care level..</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
            </div>
            <div className="form-group">
              <label>Expected End Date</label>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="dd/mm/yyyy" />
                  <span className="input-group-addon"><i className="fa fa-calendar" />
                </span>
              </div>
            </div>
        {/* Button trigger modal */}
        <button type="button" className="btn btn-success btn-md pull-right" data-toggle="modal" data-target="#myModal" onClick={this.handleSubmit}>
          Add Plant
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
                Your new plant has been added!
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


module.exports = AddPlant ;