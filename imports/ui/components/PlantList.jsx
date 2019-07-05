import React, {Component} from 'react';
import GardenPlantEntry from './GardenPlantEntry';

export default class PlantList extends Component {


  render() {
    if (!this.props.plants || this.props.plants.length <= 0) {
      return (
        <div>
          No plants found. Add some.
        </div>
      )
    }

    console.log(this.props.plants);

    return (
          <ul className="plant-list">
            {this.props.plants.map((el) => {
            })}

            {this.props.plants.map((el) =>
                <li>
                  <GardenPlantEntry plantEntry={el} />
                </li>

            )}
          </ul>
      )
    }
}
