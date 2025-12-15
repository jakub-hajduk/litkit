/**
 * A utility function that recursively flattens a tree of DOM nodes into a single array.
 * It traverses the `childNodes` of each node and collects them in a depth-first manner.
 *
 * This can be useful when you need to process all nodes within a component's light DOM,
 * including nested children.
 *
 * @example
 * // Assuming the following DOM structure:
 * // <div>
 * //   <p>Paragraph 1</p>
 * //   <span>
 * //     <em>Emphasis</em>
 * //   </span>
 * // </div>
 *
 * const div = document.querySelector('div');
 * const allNodes = flattenNodes(Array.from(div.childNodes));
 * // allNodes will contain the div, p, text, span, text, em, and text nodes.
 *
 * @param nodes An array of `Node` objects to flatten.
 * @returns A new array containing all nodes from the original array and their descendants.
 */
export function flattenNodes(nodes: Node[]): Node[] {
  let flatList: Node[] = [];

  for (const node of nodes) {
    flatList.push(node);

    if (node.childNodes && node.childNodes.length > 0) {
      const flattenedChildren = flattenNodes(Array.from(node.childNodes));

      flatList = flatList.concat(flattenedChildren);
    }
  }

  return flatList;
}
