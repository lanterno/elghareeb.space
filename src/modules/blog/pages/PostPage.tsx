import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  type RequestHandler,
  type StaticGenerateHandler,
  useLocation,
} from "@builder.io/qwik-city";

import { pageHead } from "~/platform/seo";
import { ClosingScene } from "~/platform/ui";

import { neighbours, postBySlug } from "../queries";
import { visiblePosts } from "../repository";
import { PostArticle } from "../ui/PostArticle";
import { PostNeighbours } from "../ui/PostNeighbours";

/** /blog/<slug>/ — one post */
export default component$(() => {
  const location = useLocation();
  const post = postBySlug(visiblePosts, location.params["slug"] ?? "");
  if (post === undefined) return null;
  return (
    <>
      <PostArticle slug={post.slug} />
      <PostNeighbours {...neighbours(visiblePosts, post.slug)} />
      <ClosingScene
        title="Read something you’d build on?"
        body="If this post sparked an idea — or a disagreement — I’d like to hear it."
      />
    </>
  );
});

/** An unknown slug is a 404, in development as in the built site */
export const onGet: RequestHandler = ({ params, error }) => {
  if (postBySlug(visiblePosts, params["slug"] ?? "") === undefined) {
    throw error(404, "There is no such post");
  }
};

/** Tells the static build which posts to render */
export const onStaticGenerate: StaticGenerateHandler = () => ({
  params: visiblePosts.map((post) => ({ slug: post.slug })),
});

export const head: DocumentHead = ({ params }) => {
  const post = postBySlug(visiblePosts, params["slug"] ?? "");
  if (post === undefined) return { title: "Post not found" };
  return pageHead({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    article:
      post.updated === undefined
        ? { published: post.published }
        : { published: post.published, updated: post.updated },
  });
};
