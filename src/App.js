import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Modal, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios'

moment.locale('en-GB');
const localizer = momentLocalizer(moment)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bizzaboEvents: [],
      modalIsOpen: false,
      // Event Information Included on Modal
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

  handleOpen = (event) => {
    // console.log(event.venue.displayAddress)
    this.setState({
      modalIsOpen: true,
      eventName: event.name,
      eventID: event.id,
      eventType: event.type,
      eventStartDate: event.startDate,
      eventEndDate: event.endDate,
      eventTimezone: event.timezone,
      eventLocation: (event.venue ? event.venue.displayAddress : 'Not Available'),
      eventWebsite: event.websiteUrl,
      eventSupportEmail: event.supportEmail,
      eventStatus: event.status
    })
  }

  handleClose = () => {
    if (this.state.modalIsOpen) {
      this.setState({
        modalIsOpen: false
      })
    }
  }

  convertDate = (date) => {
    return moment.utc(date).toDate()
  }

  componentDidMount() {
    let self = this
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'
    const URL = 'https://api.bizzabo.com/api/events'
    const proxiedURL = proxyURL + URL

    axios.get(proxiedURL, {
      headers: {
        'Accept': 'application/vnd.bizzabo.v2.0+json',
        'Authorization': 'Bearer ' + process.env.REACT_APP_BIZZABO_API_KEY
      }
    })
      .then(response => {
        console.log(response.data.content);
        let events = response.data.content;

        for (let i = 0; i < events.length; i++) {
          events[i].title = events[i].name
          events[i].start = this.convertDate(events[i].startDate)
          events[i].end = this.convertDate(events[i].endDate)
          events[i].venue = events[i].venue
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

    const { bizzaboEvents,
            modalIsOpen,
            eventName,
            eventID,
            eventType,
            eventStartDate,
            eventEndDate,
            eventTimezone,
            eventLocation,
            eventWebsite,
            eventSupportEmail,
            eventStatus
          } = this.state

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Bizzabo Events Calendar</h1>
        </header>
        <div style={{ height: 700 }}>
          <Calendar
            localizer={localizer}
            events={bizzaboEvents}
            selectable={true}
            onSelectEvent={this.handleOpen}
            popup={true}
            step={30}
            defaultView='month'
            views={['month','week','day']}
            defaultDate={new Date()}
          />
          <Modal
            show={modalIsOpen}
            onHide={this.handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <strong>{eventName}</strong> - Event ID: {eventID}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Start Time/Date</th>
                    <th>End Time/Date</th>
                    <th>Timezone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{eventType}</td>
                    <td>{eventStartDate}</td>
                    <td>{eventEndDate}</td>
                    <td>{eventTimezone}</td>
                  </tr>
                </tbody>
              </Table>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Event Website</th>
                    <th>Support Email</th>
                    <th>Event Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{eventLocation}</td>
                    <td>{eventWebsite}</td>
                    <td>{eventSupportEmail}</td>
                    <td>{eventStatus}</td>
                  </tr>
                </tbody>
              </Table>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
