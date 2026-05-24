
export const commentState = {
  comments: [],
  commentTree: [],
  activePostId: null,
  activeReply: null, // { commentId, userName }
  loading: false,
  error: null
};

/* =========================
   订阅机制（核心）
========================= */
const listeners = [];

export function subscribe(listener) {
  listeners.push(listener);
}

export function notify() {
  listeners.forEach(fn => fn(commentState));
}

/* =========================
   更新 state 的唯一入口
========================= */
export function setComments(comments) {
  commentState.comments = comments;
  notify();
}

export function setCommentTree(tree) {
  commentState.commentTree = tree;
  notify();
}

export function setActiveReply(reply) {
  commentState.activeReply = reply;
  notify();
}
