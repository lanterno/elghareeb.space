/**
 * Blog — posts written as markdown files in ./posts. This file is the module's public API:
 * everything outside `modules/blog` imports from here and nowhere deeper.
 */
export { feedPath } from "./feed";
export { head as blogHead, default as BlogPage } from "./pages/BlogPage";
export { onGet as feedOnGet } from "./pages/feed";
export {
  head as postHead,
  onGet as postOnGet,
  onStaticGenerate as postOnStaticGenerate,
  default as PostPage,
} from "./pages/PostPage";
export { LatestWriting } from "./ui/LatestWriting";
