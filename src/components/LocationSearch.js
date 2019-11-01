import React from 'react';

class LocationSearch extends React.Component {
    state = { newLat: '', newLong: '' };

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onCoordSubmit(parseInt(this.state.newLat), parseInt(this.state.newLong));
        this.props.onMenuClick();
        this.setState({ newLat: '', newLong: '' });
    }

    render() {
        return (
            <div id="location_box">
                <form className="coordBox" onSubmit={this.onFormSubmit}>
                    <div>
                        <input type="text" placeholder="Latitude" value={this.state.newLat} onChange={(e) => this.setState({ newLat: e.target.value })}></input>
                        <input type="text" placeholder="Longitude" value={this.state.newLong} onChange={(e) => this.setState({ newLong: e.target.value })}></input>
                        <button type="submit" className="submit_button">Get Temperature</button>
                    </div>
                </form>
            </div>
        );
    }
}


export default LocationSearch;