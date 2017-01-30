'use strict';
import React, { PropTypes as T } from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory, IndexRedirect } from 'react-router';
import ReactDOM from 'react-dom';
import Settings from './components/Settings';
import AddPlant from './components/AddPlant';
import DashBoard from './components/dashboard/DashBoard';
import TempDetails from './components/dashboard/TempDetails';
import HumidityDetails from './components/dashboard/HumidityDetails';
import ElectricityDetails from './components/dashboard/ElectricityDetails';
import LightDetails from './components/dashboard/LightDetails';
// import Login from './views/Main/Login/Login';
import Login from './components/Login';
import AuthService from './utils/AuthService';
import Container from './views/Main/Container';

const auth = new AuthService('NcmAxhIO0VesNQAwx4hYhQSE7ZiFhNHt', 'azi.auth0.com');

const requireAuth = (nextState, replace) =>{
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

var Nav = React.createClass({
  startTour(){
    console.log("startTour executed");
    var tour = introJs();
    tour.setOption('tooltipPosition', 'auto');
    tour.setOption('positionPrecedence', ['left', 'right', 'bottom', 'top']);
    tour.setOption('exitOnOverlayClick: false');
    tour.start();
  },
  logout(){
  this.props.auth.logout()
  this.context.router.push('/login');
  },
  setCollapse(){
      $('#navbarMenu').toggleClass( "collapse" );
  },
  render: function() {
    return (
      <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: 0}}>
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-nav navbar-collapse" onClick={this.setCollapse}>
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="#"><img src="http://oi66.tinypic.com/riepdv.jpg"/></a>
        </div>{/* /.navbar-header */}
        <div className="navbar-default sidebar" role="navigation">
          <div id="navbarMenu" className="sidebar-nav navbar-collapse collapse" data-step="4" data-intro="Navigate around here!">
            <ul className="nav" id="side-menu">
              <li>
                <Link to="/plants/dashboard" activeClassName="active">
                  <i className="fa fa-dashboard fa-fw" /> Dashboard
                </Link>
              </li>
              <li data-step="3" data-intro="Add your first plant here!">
                <Link to="/plants/new" >
                  <i className="fa fa-plus fa-fw" /> Add a new plant..
                </Link>
              </li>
              <li>
                <Link to="/plants/settings">
                  <i className="fa fa-gear fa-fw" /> Settings
                </Link>
              </li>
              <li data-intro="That's it! Click here to go through the tutorial again." data-step="5" onClick={this.startTour}>
                <Link to="#">
                  <i className="fa fa-compass fa-fw" /> Quick Tour
                </Link>
              </li>
               <li>
                <Link to="/login">
                  <i className="fa fa-sign-out fa-fw" onClick={this.logout.bind(this)}></i> Logout
                </Link>
               </li>
            </ul>
          </div>
          {/* /.sidebar-collapse */}
        </div>
        {/* /.navbar-static-side */}
      </nav>
    );
  }
});

Nav.contextTypes = {
  router: T.object
}

Nav.propTypes = {
  auth: T.instanceOf(AuthService)
}
// static contextTypes = {
//   router: T.object
// }
//
// static propTypes = {
//   auth: T.instanceOf(AuthService)
// }

/*
React Router
1. references:
http://stackoverflow.com/questions/25086832/how-to-stop-in-browser-with-react-router
http://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writting-manually

2.history documentation: https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#hashhistory

router history has two type of objects.
1. hashHistory for configuring without server. convention of url comes with #/
2. BrowserHistory which is used for production that uses history API built into the browser to manipulate the URL through DOM window object such as window.histoy.back(),window.historyforward()
which mainly for client side user to go back and forward button for navigation purposes. In general,provides a cleaner url and for server-side rendering support


Coding note
=================
seem to be mandatory to set default path of "/",else routing does not work

if react router not working as expected,it might be because of browserHistory via
http://stackoverflow.com/questions/35063095/react-router-browserhistory-not-working-as-expected/38585657#38585657
*/
var App = React.createClass({
    render: function () {
      return(
        <div>
          <Nav/>
          {this.props.children}
        </div>
      )
    }
});
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" components={Container} auth={auth}>
      <Route path="login" components={Login}/>
      <IndexRedirect to="plants/dashboard"/>

      <Route path="plants" components={App} auth={auth} onEnter={requireAuth}>
        <Route path="dashboard" components={DashBoard} onEnter={requireAuth}/>

        <Route path="tempDetails" components={TempDetails}/>
        <Route path="humidityDetails" components={HumidityDetails}/>
        <Route path="electricityDetails" components={ElectricityDetails}/>
        <Route path="lightDetails" components={LightDetails}/>

        <Route path="new" components={AddPlant}/>
        <Route path="settings" components={Settings}/>
      </Route>


      {/* <Route path="login" components={Login}/> */}
    </Route>
  </Router>,
  document.getElementById('content')
);
