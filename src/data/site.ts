export const site = {
  name: 'Zentari',
  tagline: 'Freight forwarding for companies that plan around a date',
  url: 'https://zentari.one',
};

// TODO: real office, phone and inbox before launch. Empty fields are hidden
// rather than printed, so nothing ships as a fake contact detail.
export const contact = { email: '', phone: '', phoneHref: '', street: '', city: '' };

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'How it works', href: '#process' },
  { label: 'Industries', href: '#industries' },
  { label: 'Questions', href: '#questions' },
];

/** Figures in the hero and the band below it. Every value is a placeholder
    until someone pulls the real number — the page marks them on screen. */
export const heroStats = [
  { value: '000+', label: 'Ports and airports served' },
  { value: '00', label: 'Countries covered' },
];

export const proofStats = [
  { value: '00+ years', label: 'Moving freight' },
  { value: '000+ countries', label: 'On our network' },
  { value: '00.0% on time', label: 'Arrived on the promised day' },
  { value: '00K+ shipments', label: 'Handled last year' },
];

export const services = [
  {
    name: 'Ocean freight',
    body: 'Full and shared container loads on scheduled services, booked against a sailing you can plan production around.',
  },
  {
    name: 'Air freight',
    body: 'For cargo that cannot wait for a vessel. Consolidated or direct, with the handover at each airport arranged in advance.',
  },
  {
    name: 'Road freight',
    body: 'Full and part loads across Europe, including temperature-controlled and oversized moves that need a permit.',
  },
  {
    name: 'Warehousing',
    body: 'Storage near the port or near your customer, with pick, pack and stock counts you can check without asking us.',
  },
  {
    name: 'Customs clearance',
    body: 'We classify the goods, prepare the declaration and file it, with the supporting documents ready before cargo lands.',
  },
  {
    name: 'Final delivery',
    body: 'The last leg to the door, the shelf or the site, booked into a delivery window rather than a vague day.',
  },
];

/** A genuine sequence, which is why the page numbers these. */
export const steps = [
  {
    name: 'Request a quote',
    body: 'Origin, destination, what it is and when it needs to land. A rough description is enough to start.',
  },
  {
    name: 'We plan the route',
    body: 'You get options with the transit time and the full cost of each, usually the same working day.',
  },
  {
    name: 'We move the cargo',
    body: 'Space is reserved, collection is scheduled and the customs paperwork is filed before anything moves.',
  },
  {
    name: 'Track and receive',
    body: 'Milestones as they happen, and a call from your coordinator if the arrival date changes.',
  },
];

export const industries = [
  { name: 'Manufacturing', body: 'Components timed to the line, so a late container does not stop production.' },
  { name: 'Retail and e-commerce', body: 'Season-critical stock, delivered into the window the distribution centre booked.' },
  { name: 'Automotive', body: 'Parts programmes and aftermarket, including oversized moves that need a permit.' },
  { name: 'Technology', body: 'High-value cargo with the handling, insurance and chain of custody it needs.' },
  { name: 'Food and drink', body: 'Temperature-controlled transport with health paperwork filed ahead of arrival.' },
  { name: 'Healthcare', body: 'Regulated goods moved under the conditions their licence requires, documented throughout.' },
];

export const questions = [
  {
    q: 'What services do you offer?',
    a: 'Ocean, air and road freight, warehousing, customs clearance and final delivery. Take one of them or hand us the whole route.',
  },
  {
    q: 'Do you handle international shipments?',
    a: 'Yes. Ocean and air worldwide through our carrier and agent network, with our own road coverage across Europe.',
  },
  {
    q: 'How do I request a quote?',
    a: 'Send the origin, destination and roughly what is moving. Standard lanes usually come back the same working day; we say up front when yours will take longer.',
  },
  {
    q: 'Can I track my shipment?',
    a: 'You get milestones as they happen. When something changes, your coordinator calls rather than leaving you to spot it on a tracking page.',
  },
  {
    q: 'How long does international shipping take?',
    a: 'Ocean runs roughly two to five weeks depending on the lane, air is two to four days, European road is two to six. Your quote carries the transit time for the actual route.',
  },
  {
    q: 'Can you help with customs clearance?',
    a: 'We handle it ourselves. We classify the goods, file the declaration and hold the documents so a query does not stop the shipment at the border.',
  },
];

/** Testimonials and articles are layout slots with nothing real behind them
    yet. They render as marked placeholders rather than invented quotes. */
export const testimonialCount = 3;
export const articleCount = 3;
