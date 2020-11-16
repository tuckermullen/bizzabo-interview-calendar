import React, { Component } from 'react';
import './App.css';
import CalendarModal from './components/CalendarModal';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios'
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';

// Use moment.js to set time for US and for local time conversion
moment.locale('en-US');
const localizer = momentLocalizer(moment)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bizzaboEvents: [],
      modalIsOpen: false,
      // Prep Calendar Event Information Below
      eventImage: '',
      eventName: '',
      eventID: null,
      eventType: '',
      eventStartDate: '',
      eventEndDate: '',
      eventTimezone: '',
      eventLocation: '',
      eventWebsite: '',
      eventSupportEmail: '',
      eventStatus: '',
    }
  };

  // Update the event state information when a specific event is opened (clicked)
  // Includes adjusting `modalIsOpen` value to open the actual modal
  handleOpen = (event) => {
    this.setState({
      modalIsOpen: true,
      eventImage: event.coverPhotoUrl,
      eventName: event.name,
      eventID: event.id,
      eventType: event.type,
      eventStartDate: moment(event.startDate).format('LLL'),
      eventEndDate: moment(event.endDate).format('LLL'),
      eventTimezone: event.timezone,
      eventLocation: (event.venue ? event.venue.displayAddress : 'Not Available'),
      eventWebsite: event.websiteUrl,
      eventSupportEmail: event.supportEmail,
      eventStatus: event.status
    })
  }

  // Adjust the modalIsOpen state to close the model
  handleClose = () => {
    if (this.state.modalIsOpen) {
      this.setState({
        modalIsOpen: false
      })
    }
  }

  // Proxy the API link to bypass CORS block/error
  // Fetch API data using axios. Use .then() promise to update required data for BigCalendar
  // Includes a .catch() for any unexpected errors
  componentDidMount() {
    const proxyURL = 'https://sleepy-refuge-91522.herokuapp.com/'
    const URL = 'https://api.bizzabo.com/api/events'
    const proxiedURL = proxyURL + URL

    axios.get(proxiedURL, {
      headers: {
        'Accept': 'application/vnd.bizzabo.v2.0+json',
        'Authorization': 'Bearer ' + process.env.REACT_APP_BIZZABO_API_KEY
      }
    })
      .then(response => {
        let events = response.data.content;

        for (let i = 0; i < events.length; i++) {
          events[i].title = events[i].name
          events[i].start = new Date(events[i].startDate)
          events[i].end = new Date(events[i].endDate)
        }

        this.setState({
          bizzaboEvents: events
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let self = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <Image className="logo" src="BizzaboLogo.png" alt="Bizzabo Logo" rounded />
          <h2 className="logo-header">Scheduled Events</h2>
        </header>
        <div className="Calendar-div" style={{ height: 700 }}>
          <Calendar
            localizer={localizer}
            events={self.bizzaboEvents}
            selectable={true}
            onSelectEvent={this.handleOpen}
            popup={true}
            step={30}
            defaultView='month'
            views={['month','week','day']}
            defaultDate={new Date()}
          />
        </div>
        <CalendarModal
          handleClose={this.handleClose}
          {...self}
        />
      </div>
    );
  }
}

export default App;
