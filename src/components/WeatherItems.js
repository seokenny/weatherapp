import React from 'react';

const WeatherItems = (props) => {
    return (
        <div>
            <div className="weather_item">
                <div className="hourly_left">
                    <p>{props.hourlyInfo[1]}</p>
                </div>
                <div className="hourly_right">
                    <p className="summary_title">{props.hourlyInfo[2]}</p>
                    <p className="summary_text">{props.hourlyInfo[3]}</p>
                    <p className="degrees_text right_degree">{props.hourlyInfo[5]}</p>
                    <p className="degrees_text">{props.hourlyInfo[0]}</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherItems;