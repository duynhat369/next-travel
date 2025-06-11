import { FAQ } from '@/components/FAQ';
import { ContactInfo } from './components/ContactInfo';

export default function ContactPage() {
  return (
    <div className="mx-auto">
      <ContactInfo />
      <FAQ />
    </div>
  );
}
