
import { commentState } from "../state/commentState.js";
import { updateState } from "../services/commentService.js";

/* ================= DOM ================= */

const mask = document.querySelector(".modal-mask");
const drawer = document.querySelector(".drawer-modal");

const listBox = document.getElementById("commentList");
const input = document.getElementById("commentInput");
const sendBtn = document.getElementById("sendCommentBtn");

/* ================= state ================= */

let currentPostId = null;
let replyTarget = null;

/* ================= follow list（模拟） ================= */

const followList = [
  { id: "u1", name: "Alice" },
  { id: "u2", name: "Bob" },
  { id: "u3", name: "Charlie" }
];

/* ================= open ================= */

export function openCommentModal(postId) {
  currentPostId = postId;

  const mock = [
    { id: "1", postId, parentId: null, content: "第一条评论", user: { name: "Alice" }, likes: 0 },
    { id: "2", postId, parentId: "1", content: "回复评论", user: { name: "Bob" }, likes: 0 }
  ];

  updateState(commentState, mock);
  render();

  mask.classList.add("show");
}

/* ================= close ================= */

function close() {
  mask.classList.remove("show");
  resetInput();
}

/* ================= render ================= */

function render() {
  listBox.innerHTML = "";

  function walk(nodes, depth = 0) {
    nodes.forEach(n => {
      const div = document.createElement("div");

      div.className = "comment-item";
      div.dataset.id = n.id;
      div.style.marginLeft = depth * 18 + "px";

      div.innerHTML = `
        <b>${n.user.name}</b>: ${n.content}
        <div class="comment-actions">
          <button class="reply">回复</button>
          <button class="like">👍 ${n.likes || 0}</button>
        </div>
      `;

      listBox.appendChild(div);

      if (n.children?.length) walk(n.children, depth + 1);
    });
  }

  walk(commentState.commentTree);
}

/* ================= reply ================= */

document.addEventListener("click", (e) => {

  const item = e.target.closest(".comment-item");

  if (item && e.target.classList.contains("reply")) {
    const id = item.dataset.id;
    const comment = commentState.comments.find(c => c.id === id);

    setReply(comment);
  }

  if (e.target.classList.contains("like")) {
    const id = item.dataset.id;

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

/* ================= reply UI ================= */

function setReply(comment) {
  replyTarget = comment;

  let bar = document.querySelector(".reply-preview");

  if (!bar) {
    bar = document.createElement("div");
    bar.className = "reply-preview";

    input.parentNode.insertBefore(bar, input);
  }

  bar.innerHTML = `
    <span>回复 @${comment.user.name}: ${comment.content}</span>
    <button id="cancelReply">✕</button>
  `;

  document.getElementById("cancelReply").onclick = () => {
    replyTarget = null;
    bar.remove();
  };
}

/* ================= send ================= */

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

  const list = [...commentState.comments, newComment];

  updateState(commentState, list);
  render();

  resetInput();
};

/* ================= reset ================= */

function resetInput() {
  input.value = "";
  replyTarget = null;

  const bar = document.querySelector(".reply-preview");
  if (bar) bar.remove();
}

/* ================= iOS drag (with velocity) ================= */

let startY = 0;
let currentY = 0;
let startTime = 0;
let velocity = 0;
let dragging = false;

drawer.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
  startTime = Date.now();
  dragging = true;

  drawer.classList.add("dragging");
});

drawer.addEventListener("touchmove", (e) => {
  if (!dragging) return;

  currentY = e.touches[0].clientY;
  let diff = currentY - startY;

  if (diff < 0) diff = 0;

  drawer.style.transform = `translateY(${diff}px)`;
});

drawer.addEventListener("touchend", () => {
  dragging = false;
  drawer.classList.remove("dragging");

  const delta = currentY - startY;
  const time = Date.now() - startTime;

  velocity = delta / time; // px/ms

  const shouldClose =
    delta > 120 || velocity > 0.8;

  if (shouldClose) {
    mask.classList.remove("show");

    setTimeout(() => {
      drawer.style.transform = "translateY(100%)";
    }, 300);
  } else {
    drawer.style.transform = "translateY(0)";
  }
});

/* ================= @ 用户（关注列表） ================= */

input.addEventListener("focus", () => {
  const atList = document.createElement("div");
  atList.className = "reply-preview";

  atList.innerHTML = followList
    .map(u => `<div>@${u.name}</div>`)
    .join("");

  input.parentNode.appendChild(atList);

  setTimeout(() => {
    atList.remove();
  }, 3000);
});
