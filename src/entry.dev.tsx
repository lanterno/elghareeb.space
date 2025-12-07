import { createDOM } from "@builder.io/qwik/testing";
import Root from "./root";

export default function () {
  return createDOM().then((dom) => {
    return dom.render(<Root />);
  });
}

