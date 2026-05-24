import { commentState } from "../state/commentState.js";
import { updateState } from "../services/commentService.js";

const modal = document.getElementById("commentModal");
const listBox = document.getElementById("commentList");
const input = document.getElementById("commentInput");
const sendBtn = document.getElementById("sendCommentBtn");

let replyTarget = null;

// 打开评论
export function openCommentModal(postId, comments) {
  commentState.currentPostId = postId;

  updateState(commentState, comments);
  render();

  modal.classList.remove("hidden");
}

// 关闭
document.getElementById("closeCommentModal").onclick = () => {
  modal.classList.add("hidden");
};

// 渲染
function render() {
  listBox.innerHTML = "";

  function walk(nodes, depth = 0) {
    nodes.forEach(n => {
      const div = document.createElement("div");
      div.style.marginLeft = depth * 20 + "px";
      div.innerHTML = `
        <b>${n.user.name}</b>: ${n.content}
        <button class="reply" data-id="${n.id}">回复</button>
        <button class="like" data-id="${n.id}">👍 ${n.likes || 0}</button>
      `;

      listBox.appendChild(div);

      if (n.children?.length) {
        walk(n.children, depth + 1);
      }
    });
  }

  walk(commentState.commentTree);
}

// 点击事件（回复 + 点赞）
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("reply")) {
    replyTarget = e.target.dataset.id;
    input.focus();
  }

  if (e.target.classList.contains("like")) {
    const id = e.target.dataset.id;

    commentState.comments = commentState.comments.map(c => {
      if (c.id === id) {
        return { ...c, likes: (c.likes || 0) + 1 };
      }
      return c;
    });

    updateState(commentState, commentState.comments);
    render();
  }
});

// 发送评论
sendBtn.onclick = () => {
  const text = input.value.trim();
  if (!text) return;

  const newComment = {
    id: Date.now().toString(),
    postId: commentState.currentPostId,
    parentId: replyTarget,
    content: text,
    user: { name: "Me" },
    likes: 0
  };

  const newList = [...commentState.comments, newComment];

  updateState(commentState, newList);
  render();

  input.value = "";
  replyTarget = null;
};
