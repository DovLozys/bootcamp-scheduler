import HostEventForm from '../HostEventForm';
import Navbar from '../Navbar';

import './hostEventPage.css';

export default function HostEventPage() {
  return (
    <div className="page-body">
      <Navbar />
      <div className="host-event-header">
        <h1>Host an Event</h1>
        <p className="host-event-subtitle">Fill out the form below to create a new event for your bootcamp community.</p>
      </div>
      <HostEventForm />
    </div>
  );
}
