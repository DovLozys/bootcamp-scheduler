import HostEventForm from './HostEventForm';
import Navbar from './Navbar';

import styles from './HostEventPage.module.css';

export default function HostEventPage() {
  return (
    <div className={styles.pageBody}>
      <Navbar />
      <div className={styles.hostEventHeader}>
        <h1>Host an Event</h1>
        <p className={styles.hostEventSubtitle}>
          Fill out the form below to create a new event for your bootcamp
          community.
        </p>
      </div>
      <HostEventForm />
    </div>
  );
}
