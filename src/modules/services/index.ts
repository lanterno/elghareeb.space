/**
 * Services — the freelance work Ahmed takes on. This file is the module's public API: everything
 * outside `modules/services` imports from here and nowhere deeper.
 */
export { engagements, questions, services, servicesIntro, workingFacts } from "./content";
export { head as servicesHead, default as ServicesPage } from "./pages/ServicesPage";
export { servicePath, servicesPath } from "./queries";
