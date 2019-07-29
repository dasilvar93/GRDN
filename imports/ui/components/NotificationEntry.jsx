import React, {Component} from 'react';
import NotificationStrings from '../strings/NotificationStrings';

export default class NotificationEntry extends Component {

  render() {
    if (this.props.entry == null) {
      return null;
    }

    return(
        <li className="notification-entry">
          {NotificationStrings()[this.props.entry.type](this.props.entry.plant.cachedData.common_name, this.props.entry.garden.name)}
          <a href={`${window.location.protocol}//${window.location.host}/garden/${this.props.entry.gardenId}/${this.props.entry.plantId}`}>GO</a>
          <a>DELETE</a>

        </li>
    )
  }
}
