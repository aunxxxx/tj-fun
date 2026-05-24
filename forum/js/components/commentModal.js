import { commentState } from "../state/commentState.js";
import { updateState } from "../services/commentService.js";

const modal = document.getElementById("commentModal");
const listBox = document.getElementById("commentList");
const input = document.getElementById("commentInput");
const sendBtn = document.getElementById("sendCommentBtn");
const closeBtn = document.getElementById("closeCommentModal");

let replyTarget = null;
let currentPostId = null;

// ================= 判断设备 =================
const isMobile = window.innerWidth < 768;

// ================= 打开 =================
export function openCommentModal(postId) {
  currentPostId = postId;

  const mock = [
    { id: "1", postId, parentId: null, content: "第一条评论", user: { name: "Alice" }, likes: 0 },
    { id: "2", postId, parentId: "1", content: "回复第一条", user: { name: "Bob" }, likes: 0 }
  ];

  updateState(commentState, mock);
  render();

  modal.classList.remove("hidden");
}

// ================= 关闭 =================
closeBtn.onclick = () => {
  modal.classList.add("hidden");
  clearReply();
};

// ================= 渲染 =================
function render() {
  listBox.innerHTML = "";

  function walk(nodes, depth = 0) {
    nodes.forEach(n => {

      const div = document.createElement("div");
      div.className = "comment-item";
      div.dataset.id = n.id;

      div.style.marginLeft = depth * 20 + "px";

      div.innerHTML = `
        <div class="comment-content">
          <b>${n.user.name}</b>: ${n.content}
        </div>

        <div class="comment-actions">
          ${!isMobile ? `<button class="reply-btn" data-id="${n.id}">回复</button>` : ""}
          <button class="like-btn" data-id="${n.id}">👍 ${n.likes || 0}</button>
        </div>
      `;

      listBox.appendChild(div);

      if (n.children?.length) {
        walk(n.children, depth + 1);
      }
    });
  }

  walk(commentState.commentTree);
}

// ================= PC：设置引用回复 =================
function setReplyTarget(comment) {
  replyTarget = comment;

  if (!isMobile) {
    showReplyPreview(comment);
  }
}

// ================= PC：顶部引用条 =================
function showReplyPreview(comment) {
  let bar = document.getElementById("replyPreview");

  if (!bar) {
    bar = document.createElement("div");
    bar.id = "replyPreview";
    bar.style.cssText = `
      padding:6px;
      border:1px solid #ddd;
      margin-bottom:6px;
      display:flex;
      justify-content:space-between;
      background:#f5f5f5;
    `;

    input.parentNode.insertBefore(bar, input);
  }

  bar.innerHTML = `
    <span>回复 @${comment.user.name}：${comment.content}</span>
    <button id="cancelReply">✕</button>
  `;

  document.getElementById("cancelReply").onclick = clearReply;
}

// ================= 清除回复 =================
function clearReply() {
  replyTarget = null;

  const bar = document.getElementById("replyPreview");
  if (bar) bar.remove();
}

// ================= 点击事件 =================
document.addEventListener("click", (e) => {

  // 点赞
  if (e.target.classList.contains("like-btn")) {
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

  // PC 回复按钮
  if (e.target.classList.contains("reply-btn")) {
    const id = e.target.dataset.id;
    const comment = findById(id);
    setReplyTarget(comment);
  }

  // Mobile：点击整个评论
  if (isMobile) {
    const item = e.target.closest(".comment-item");
    if (item) {
      const comment = findById(item.dataset.id);
      setReplyTarget(comment);

      moveInputBelow(item);
      input.focus();
    }
  }
});

// ================= 移动端：移动输入框 =================
function moveInputBelow(el) {
  const box = document.querySelector(".comment-input-bar");
  el.after(box);
}

// ================= 找评论 =================
function findById(id) {
  return commentState.comments.find(c => c.id === id);
}

// ================= 发送 =================
sendBtn.onclick = () => {
  const text = input.value.trim();
  if (!text) return;

  const newComment = {
    id: Date.now().toString(),
    postId: currentPostId,
    parentId: replyTarget?.id || null,
    content: text,
    user: { name: "Me" },
    likes: 0
  };

  const newList = [...commentState.comments, newComment];

  updateState(commentState, newList);
  render();

  input.value = "";
  clearReply();
};
