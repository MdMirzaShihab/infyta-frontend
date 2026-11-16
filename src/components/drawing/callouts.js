import { services } from '../../content/services.js';

// The number on each service in the drawing and in the service rows: its place in `services`.
export const CALLOUT = Object.fromEntries(services.map((service, i) => [service.slug, i + 1]));
