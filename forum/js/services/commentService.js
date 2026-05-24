export function buildCommentTree(list) {
  const map = new Map();
  const tree = [];

  list.forEach(i => map.set(i.id, { ...i, children: [] }));

  map.forEach(i => {
    if (i.parentId) {
      const p = map.get(i.parentId);
      if (p) p.children.push(i);
    } else {
      tree.push(i);
    }
  });

  return tree;
}

export function updateState(state, list) {
  state.comments = list;
  state.commentTree = buildCommentTree(list);
}
