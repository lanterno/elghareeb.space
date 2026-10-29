/**
 * Lets a markdown post use plain image syntax with a file kept beside it:
 *
 *     ![A diagram](./diagram.png "An optional caption")
 *
 * Vite only processes images it sees imported, so this turns each relative image into an import
 * of Qwik's `?jsx` image component and a JSX element using it. The image is then encoded to WebP
 * at several widths with a srcset, lazy-loaded and sized, like every other image on the site.
 * An image on its own line with a title becomes a <figure> with the title as its caption.
 * Absolute and remote URLs are left alone.
 */

interface Node {
  type: string;
  children?: Node[];
  url?: string;
  alt?: string | null;
  title?: string | null;
  [key: string]: unknown;
}

interface Options {
  /** The `sizes` attribute given to every local image, matching the column it is shown in */
  sizes: string;
}

const isLocal = (url: string): boolean => url.startsWith("./") || url.startsWith("../");

function importNode(name: string, path: string): Node {
  return {
    type: "mdxjsEsm",
    value: `import ${name} from "${path}";`,
    data: {
      estree: {
        type: "Program",
        sourceType: "module",
        body: [
          {
            type: "ImportDeclaration",
            specifiers: [{ type: "ImportDefaultSpecifier", local: { type: "Identifier", name } }],
            source: { type: "Literal", value: path, raw: JSON.stringify(path) },
          },
        ],
      },
    },
  };
}

function imageElement(
  kind: "mdxJsxFlowElement" | "mdxJsxTextElement",
  name: string,
  image: Node,
  sizes: string
): Node {
  const attributes = [
    { type: "mdxJsxAttribute", name: "alt", value: image.alt ?? "" },
    { type: "mdxJsxAttribute", name: "sizes", value: sizes },
  ];
  return { type: kind, name, attributes, children: [] };
}

/** A block image with a title becomes a figure, the title its caption */
function figure(imageNode: Node, caption: string): Node {
  return {
    type: "mdxJsxFlowElement",
    name: "figure",
    attributes: [],
    children: [
      imageNode,
      {
        type: "mdxJsxFlowElement",
        name: "figcaption",
        attributes: [],
        children: [{ type: "text", value: caption }],
      },
    ],
  };
}

function isLocalImage(node: Node | undefined): node is Node & { url: string } {
  return node?.type === "image" && typeof node.url === "string" && isLocal(node.url);
}

export function remarkLocalImages({ sizes }: Options): (tree: Node) => void {
  return (tree) => {
    const imports: Node[] = [];
    const nextName = (): string => `LocalImage${String(imports.length)}`;

    const replace = (kind: "mdxJsxFlowElement" | "mdxJsxTextElement", image: Node): Node => {
      const name = nextName();
      imports.push(importNode(name, `${String(image.url)}?jsx`));
      return imageElement(kind, name, image, sizes);
    };

    const walk = (node: Node): void => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        // A paragraph holding only an image becomes a block, so it isn't wrapped in <p>
        const only = child.children?.length === 1 ? child.children[0] : undefined;
        if (child.type === "paragraph" && isLocalImage(only)) {
          const element = replace("mdxJsxFlowElement", only);
          return typeof only.title === "string" ? figure(element, only.title) : element;
        }
        if (isLocalImage(child)) return replace("mdxJsxTextElement", child);
        walk(child);
        return child;
      });
    };

    walk(tree);
    tree.children = [...imports, ...(tree.children ?? [])];
  };
}
