import { Community } from './components/Community';
import { Hero } from './components/Hero';
import { Mission } from './components/Mission';
import { Seasons } from './components/Seasons';
import { SummarySection } from './components/Summary';
import { Team } from './components/Team';

export default function AboutUs() {
  return (
    <>
      <Hero />
      <div className="mx-auto">
        <SummarySection />
        <Team />
        <Seasons />
        <Mission />
        <Community />
      </div>
    </>
  );
}
