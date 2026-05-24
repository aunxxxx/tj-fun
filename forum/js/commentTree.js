export function buildCommentTree(flatList) {
  const map = new Map();
  const tree = [];

  flatList.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });

  map.forEach(item => {
    if (item.parentId) {
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children.push(item);
      }
    } else {
      tree.push(item);
    }
  });

  return tree;
}

export function updateCommentState(state, newComments) {
  state.comments = newComments;
  state.commentTree = buildCommentTree(newComments);
}
