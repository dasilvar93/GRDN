import React, {Component} from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import PlantList from '../components/PlantList';
import fetchGardenById from '../actions/GardenActions';
import MapContainer from '../components/MapContainer';
import WeatherWidget from '../components/WeatherWidget';

export default class GardenPage extends Component{

  constructor(props) {
    super(props);

    this.state = {
      entry: null
    }

    let that = this;
    Meteor.call("garden.getGardenById", {gardenId: that.props.match.params.id}, (error, result) => {
      this.setState({entry: result});
    });

  }

  render() {
    if (this.state.entry == null) {
      return (
        <LoadingSpinner />
      )
    }
    return (
      <div className="container">
        <main>
          <div className="row">
            <h1>Garden: {this.state.entry.name}</h1>
            <div className="col two-third">
              <h2>Plants</h2>
              <PlantList gardenId={this.state.entry._id} plants={this.state.entry.plants} />
            </div>
            <div className="col third">
              <WeatherWidget garden={this.state.entry} />
              <h2>Location</h2>
              {this.state.entry.indoor &&
                <p><strong>This garden is indoor.</strong> You will not receive local weather notifications about it.</p>
              }
              <MapContainer center={
              {lat: parseFloat(this.state.entry.location.lat) || 0,      //TODO: validate that this is between 0, 360
                lng: parseFloat(this.state.entry.location.lng) || 0}     //TODO: validate tahtthis is between -90, 90
              } zoom={14.5} />


            </div>
          </div>
        </main>
      </div>
    )
  }
}
