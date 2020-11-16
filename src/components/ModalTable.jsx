import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

class ModalTable extends Component {
  render() {
    let self = this.props;

    return (
      <div>
        <Table striped bordered hover size="xl" responsive="lg">
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
              <td>{self.eventType}</td>
              <td>{self.eventStartDate}</td>
              <td>{self.eventEndDate}</td>
              <td>{self.eventTimezone}</td>
            </tr>
          </tbody>
        </Table>
        <Table striped bordered hover size="xl" responsive="lg">
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
              <td>{self.eventLocation}</td>
              <td>{self.eventWebsite}</td>
              <td>{self.eventSupportEmail}</td>
              <td>{self.eventStatus}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ModalTable;