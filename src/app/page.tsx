import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CTA } from './components/CTA';
import { Feedback } from './components/Feedback';
import { FunFacts } from './components/FunFacts';
import { Timeline } from './components/Timeline';
import { WhatMakesTripGreat } from './components/WhatMakesTripGreat';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main className="mx-auto">
        <FunFacts />
        <Timeline />
        <WhatMakesTripGreat />
        <CTA />
        <Feedback />
      </main>
      <Footer />
    </>
  );
}
