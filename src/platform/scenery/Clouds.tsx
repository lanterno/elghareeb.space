import { component$ } from "@builder.io/qwik";

/** A few soft clouds drifting across the top of the sky. */
export const Clouds = component$(() => (
  <svg
    aria-hidden="true"
    viewBox="0 0 1440 300"
    preserveAspectRatio="xMidYMin slice"
    class="pointer-events-none absolute inset-x-0 top-0 h-[300px] w-full fill-panel opacity-75 motion-safe:animate-cloud"
  >
    <ellipse cx="180" cy="120" rx="110" ry="34" />
    <ellipse cx="230" cy="100" rx="70" ry="40" />
    <ellipse cx="1180" cy="80" rx="130" ry="30" />
    <ellipse cx="1120" cy="64" rx="64" ry="36" />
    <ellipse cx="720" cy="40" rx="90" ry="20" />
  </svg>
));
