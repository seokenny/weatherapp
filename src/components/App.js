import React from 'react';
import WeatherCurrent from './WeatherCurrent';
import WeatherHourly from './WeatherHourly';
import LocationSearch from './LocationSearch';

class App extends React.Component {
  state = { isItLoaded: false, receivedItems: [], myLat: 36.7783, myLong: 119.4179, hourlyWeekly: 'Daily', errorMessage: '', customLocation: false };

  componentDidMount() {
    document.title = 'Weather DS';
    if(this.state.customLocation === false){
      window.navigator.geolocation.getCurrentPosition(
        (position) => this.setState({ myLat: position.coords.latitude, myLong: position.coords.longitude }),
        (err) => this.setState({ errorMessage: err.message })
      );
    }
  }

  componentDidUpdate() {

    fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d127b645b951624418ee363b4532c9b2/'+this.state.myLat+','+this.state.myLong)
      .then(results => results.json())
      .then(json => {
        this.setState({
          isItLoaded: true,
          receivedItems: json
        })
      });
  }

  arrayPusher(hourlyData, newArrayer, objectName, objectNameTwo, objectNameThree) {
    var breaker = true;
    if(breaker) {
      main: for(var i = 0; i < hourlyData.data.length; i++){
        var hour = hourlyData.data[i];

        var newTime = new Date(hour.time*1000);
        var hours = newTime.getHours();
        
        var fullTime = hours + ":00";

        var whatDay = this.arrayPusherDays(newTime);

        switch(whatDay) {
          case 0:
            whatDay = 'Sun';
            break;
          case 1:
            whatDay = 'Mon';
            break;
          case 2:
            whatDay = 'Tues';
            break;
          case 3:
            whatDay = 'Wed';
            break;
          case 4:
            whatDay = 'Thur';
            break;
          case 5:
            whatDay = 'Fri';
            break;
          case 6:
            whatDay = 'Sat';
            break;
        }

        var roundedTemp = Math.floor(hour[objectName]);
        var roundedTempTwo =  Math.floor(hour[objectNameThree]);

        if(Number.isNaN(roundedTempTwo)){
          roundedTempTwo = null;
        }

        var twelve;
        if(hours > 12){
          twelve = hours-12 + 'PM';
        }
        else {
          twelve = hours + 'AM';
        }

        if(hours > 22) {
          newArrayer.push([
            [],
            [twelve],
            [hour['summary']],
            [hourlyData['summary']],
            [newTime.getDay()],
            [roundedTemp]
          ]);
          breaker = false;
          break main;
        }

        if(this.hourlyWeekly === 'Daily'){
          newArrayer.push([
            [],
            [twelve],
            [hour['summary']],
            [hourlyData['summary']],
            [newTime.getDay()],
            [roundedTemp]
          ]);
        } else {
          newArrayer.push([
            [roundedTemp],
            [whatDay],
            [hour['summary']],
            [hourlyData['summary']],
            [newTime.getDay()],
            [roundedTempTwo]
          ]);
        }
      }
    }
  }

  changeDataTime() {
    if(this.state.hourlyWeekly === 'Daily'){
      this.setState({ hourlyWeekly: 'Hourly' });
    }
    else this.setState({ hourlyWeekly: 'Daily'});
    document.getElementById("hourly_button").classList.toggle("active");
    document.getElementById("daily_button").classList.toggle("active");
  }

  arrayPusherDays = (newTime) => {
      return (newTime.getDay());
  }

  onMenuClick() {
    document.getElementById("location_box").classList.toggle("visible");
    document.getElementById("m_nav").classList.toggle("change");
  }

  onCoordSubmit = (newLat, newLong) => {
    this.setState({ myLat: newLat, myLong: newLong, customLocation: true }, () => this.componentDidMount());
  }

  render() {
    var { isItLoaded, receivedItems } = this.state;

    if(!isItLoaded) {
      return <div className="gradient_bg gbg">
        <h1 className="wt_center waiting_text">Loading Weather</h1>
      </div>
    }

    if(this.state.errorMessage !== ''){
      return <div className="gradient_bg">
        <h1 className="wt_center waiting_text">Geolocation must be allowed for us to retrieve weather</h1>
      </div>
    }

    return (
      <div id="full_contain">
          <div className="gradient_bg"></div>
          <div id="m_nav" onClick={() => this.onMenuClick()}>
            <div id="bar0" className="bar"></div>
            <div id="bar1" className="bar"></div>
          </div>
          <div className="desktop_select">
                <ul>
                    <li id="hourly_button" className="active" onClick={() => this.changeDataTime()}>Hourly</li>
                    <li id="daily_button" onClick={() => this.changeDataTime()}>Daily</li>
                    <li onClick={() => this.onMenuClick()}>Search Location</li>
                </ul>
            </div>
          <LocationSearch onCoordSubmit={this.onCoordSubmit} onMenuClick={this.onMenuClick}/>
          <div className="current_weather">
            <WeatherCurrent receivedItems={this.state.receivedItems}/>
          </div>
          <div className="weather_hourly_container">
            <WeatherHourly receivedItems = {this.state.receivedItems} arrayPusher={this.arrayPusher} consoleLogger={this.consoleLogger} hourlyWeekly={this.state.hourlyWeekly} arrayPusherDays={this.arrayPusherDays} changeDataTime={this.changeDataTime}>
            </WeatherHourly>
          </div>
          <div className="changeTimeMenu">
            <div onClick={() => this.changeDataTime()}>Show {this.state.hourlyWeekly}</div>
          </div>
      </div>
    );
  }
}

export default App;
