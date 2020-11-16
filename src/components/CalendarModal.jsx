import React, { Component } from 'react';
import ModalTable from './ModalTable';
import { Modal, Image } from 'react-bootstrap';

class CalendarModal extends Component {
  render() {
    let self = this.props;

    return (
      <div>
        <Modal
            show={self.modalIsOpen}
            onHide={self.handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            autoFocus={true}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <strong>{self.eventName}</strong> - Event ID: {self.eventID}<br/>
                <Image src={self.eventImage} rounded />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ModalTable
                eventType={self.eventType}
                eventStartDate={self.eventStartDate}
                eventEndDate={self.eventEndDate}
                eventTimezone={self.eventTimezone}
                eventLocation={self.eventLocation}
                eventWebsite={self.eventWebsite}
                eventSupportEmail={self.eventSupportEmail}
                eventStatus={self.eventStatus}
              />
            </Modal.Body>
          </Modal>
      </div>
    );
  }
}

export default CalendarModal;