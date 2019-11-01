import React from 'react';
import WeatherItems from './WeatherItems';

const WeatherHourly = (props) => {
    //Time
    var hourlyTemp;
    if(props.hourlyWeekly === 'Daily'){
        hourlyTemp = props.receivedItems.hourly;
    } else if(props.hourlyWeekly === 'Hourly'){
        hourlyTemp = props.receivedItems.daily;
    }


    var hourlyTemperature = [];

    if(props.hourlyWeekly === 'Daily'){
        props.arrayPusher(hourlyTemp, hourlyTemperature, 'temperature', 'time');
    }
    else if (props.hourlyWeekly === 'Hourly'){
        props.arrayPusher(hourlyTemp, hourlyTemperature, 'temperatureLow', 'time', 'temperatureHigh');
    }

    const renderedList = hourlyTemperature.map((temp) => {
        return <WeatherItems hourlyInfo={temp}/>;
    });

    return (
        <div className="animated fadeInRight">
            <div>
                {renderedList}
            </div>
        </div>

    );
}

export default WeatherHourly;