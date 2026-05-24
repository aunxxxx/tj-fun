
import { addComment, buildTree } from "../services/comment.js";
import { commentState, setActiveReply, setCommentTree } from "../state/commentState.js";
import { renderComments } from "../ui/commentUI.js";

export function initCommentBind() {
  const input = document.getElementById("commentInput");
  const btn = document.getElementById("sendCommentBtn");
  const list = document.getElementById("commentList");

  /* =========================
     发送评论
  ========================= */
  btn.addEventListener("click", () => {
    if (!input.value.trim()) return;

    addComment({
      postId: commentState.activePostId,
      parentId: commentState.activeReply?.commentId || null,
      content: input.value,
      user: { id: "guest", name: "Guest" }
    });

    input.value = "";
    setActiveReply(null);
  });

  /* =========================
     回复点击（事件代理）
  ========================= */
  list.addEventListener("click", (e) => {
    const btn = e.target.closest(".reply-btn");

    if (!btn) return;

    const id = btn.dataset.id;

    setActiveReply({
      commentId: id,
      userName: "User"
    });
  });
}

/* =========================
   监听 state → 自动渲染（闭环关键）
========================= */
export function bindCommentRender() {
  const container = document.getElementById("commentList");

  const render = (state) => {
    const tree = buildTree(state.comments);
    setCommentTree(tree);
    renderComments(tree, container);
  };

  import("../state/commentState.js").then(({ subscribe }) => {
    subscribe(render);
  });
}
