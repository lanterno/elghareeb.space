/**
 * Career — where Ahmed has worked and what he works on. This file is the module's public API:
 * everything outside `modules/career` imports from here and nowhere deeper.
 */
export {
  careerStart,
  certifications,
  education,
  highlights,
  organizations,
  skillGroups,
} from "./content";
export { head as workHead, default as WorkPage } from "./pages/WorkPage";
export { currentRole, yearsOfExperience } from "./queries";
export { AffiliationRows } from "./ui/AffiliationRows";
export { ConferenceBalloons } from "./ui/ConferenceBalloons";
export { OrgMark } from "./ui/OrgMark";
export { SkillsMarquee } from "./ui/SkillsMarquee";
