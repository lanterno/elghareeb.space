import { createDOM } from "@builder.io/qwik/testing";

import Root from "./root";

type RenderResult = Awaited<ReturnType<Awaited<ReturnType<typeof createDOM>>["render"]>>;

export default function (): Promise<RenderResult> {
  return createDOM().then((dom) => {
    return dom.render(<Root />);
  });
}
