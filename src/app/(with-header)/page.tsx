import { Hero } from '@/components/Hero';
import { CTA } from '../components/CTA';
import { Feedback } from '../components/Feedback';
import { FunFacts } from '../components/FunFacts';
import { Timeline } from '../components/Timeline';
import { WhatMakesTripGreat } from '../components/WhatMakesTripGreat';
import { Seasons } from './about-us/components/Seasons';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto">
        <FunFacts />
        <Timeline />
        <WhatMakesTripGreat />
        <CTA />
        <Seasons />
        <Feedback />
      </div>
    </>
  );
}
