import React, { Component } from 'react';
import DataTable from '../components/DataTable';
import AddToGardenForm from '../components/AddToGardenForm';
import LoadingSpinner from '../components/LoadingSpinner';
import NotesFeed from '../components/NotesFeed';
import AddNewNoteForm from '../components/AddNewNoteForm';
import NotificationsScroll from '../components/NotificationsScroll';
import {connect} from 'react-redux';
import {selectGarden, selectPlant} from '../actions/GardenActions';

const mapDispatchToProps = dispatch => {
    return {
      selectGarden: (gardenId) => {dispatch(selectGarden(gardenId))},
      selectPlant: (gardenId, plantId) => {dispatch(selectPlant(gardenId, plantId))}
    };
};

const mapStateToProps = state => {
  return {
    currentGarden: state.currentGarden,
    currentPlant: state.currentPlant
  };
};

class ConnectableGardenPlantDetailPage extends Component {
  constructor(props) {
    super(props);

    const gardenId = this.props.match.params.id;
    const plantInstanceId = this.props.match.params.plantId;

    this.props.selectGarden(gardenId);
    this.props.selectPlant(gardenId, plantInstanceId);



  }


  render() {
    if (this.props.currentGarden === null || this.props.currentPlant === null) {
      return <LoadingSpinner />
    }

    return (
      <div className="container">
        <main className="detail-page">
          <div className="row">
            <h1 className="half-title">{this.props.currentPlant.qty} x {this.props.currentPlant.cachedData.common_name} in {this.props.currentGarden.name}</h1>
            <a className="link-back" href={"/garden/" + this.props.currentGarden._id}>Back to {this.props.currentGarden.name}</a>
            <div className="col half">
              <DataTable entry={this.props.currentPlant.cachedData} />

            </div>
            <div className="col half">
              <h3> Notifications </h3>
              <NotificationsScroll gardenId={this.props.currentGarden._id} plantId={this.props.currentPlant._id} />
              <h3> Notes </h3>
              <AddNewNoteForm plantId={this.props.currentPlant._id} gardenId={this.props.currentGarden._id}/>
              <NotesFeed notes={this.props.currentPlant.notes} />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

const GardenPlantDetailPage = connect(mapStateToProps, mapDispatchToProps)(ConnectableGardenPlantDetailPage);
export default GardenPlantDetailPage;
