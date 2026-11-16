/** Showcase — open-source work. The module's public API. */
export {
  head as projectHead,
  onGet as projectOnGet,
  onStaticGenerate as projectOnStaticGenerate,
  default as ProjectPage,
} from "./pages/ProjectPage";
export { head as projectsHead, default as ProjectsPage } from "./pages/ProjectsPage";
export { projects } from "./content";
export { projectCount, projectPath } from "./queries";
