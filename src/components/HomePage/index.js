import MainContent from '../MainContent';
import Navbar from '../Navbar';

import './homepage.css';

export default function HomePage() {
  return (
    <main className="homepage-body">
      <Navbar />
      <MainContent />
    </main>
  );
}
