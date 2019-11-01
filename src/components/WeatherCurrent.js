import React from 'react';

const WeatherCurrent = (props) => {
    var currentTemp = props.receivedItems.currently;
    var roundedTemp = Math.floor(currentTemp.temperature);
    return(
        <div id="current_container">
            <div className="wt_center">
                <div className="left_half">
                    <p className="summary_title animated fadeInDown">{props.receivedItems.timezone}</p>
                    <h1 className="current_temperature animated fadeInDown">{roundedTemp}</h1>
                </div>
                <div className="right_half animated fadeInUp">
                    <p className="summary_title st_main">{currentTemp.summary}</p>
                    <p className="summary_text">{props.receivedItems.hourly.summary}</p>
                    <p><span className="summary_title">Feels like:</span> <span className="info_text">{currentTemp.apparentTemperature}</span></p>
                    <p><span className="summary_title">Precip. Chance:</span> <span className="info_text">{currentTemp.precipProbability}</span></p>
                    <p><span className="summary_title">Wind Speed: </span><span className="info_text">{currentTemp.windSpeed}</span></p>
                </div>
            </div>
        </div>
    );
}

export default WeatherCurrent;