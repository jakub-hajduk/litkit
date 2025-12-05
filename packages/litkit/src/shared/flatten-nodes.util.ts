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
