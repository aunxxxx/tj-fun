
import { commentState, setComments } from "../state/commentState.js";

/* =========================
   获取
========================= */
export function getComments() {
  return commentState.comments;
}

/* =========================
   添加评论
========================= */
export function addComment(comment) {
  const newComments = [
    ...commentState.comments,
    {
      id: Date.now().toString(),
      ...comment
    }
  ];

  setComments(newComments);
  return newComments;
}

/* =========================
   删除评论
========================= */
export function deleteComment(id) {
  const newComments = commentState.comments.filter(c => c.id !== id);
  setComments(newComments);
}

/* =========================
   tree 构建（楼中楼）
========================= */
export function buildTree(comments) {
  const map = new Map();
  const tree = [];

  comments.forEach(c => map.set(c.id, { ...c, children: [] }));

  map.forEach(c => {
    if (c.parentId && map.get(c.parentId)) {
      map.get(c.parentId).children.push(c);
    } else {
      tree.push(c);
    }
  });

  return tree;
}
