import { component$ } from "@builder.io/qwik";

export const CodeIcon = component$(() => (
  <svg
    class="w-[18px] h-[18px]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M8 7l-5 5 5 5M16 7l5 5-5 5"
    />
  </svg>
));
