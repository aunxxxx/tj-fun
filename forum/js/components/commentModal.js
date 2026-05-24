import { commentState } from "../state/commentState.js";
import { buildCommentTree, updateState } from "../services/commentService.js";

// ================= DOM =================
const modal = document.getElementById("commentModal");
const listBox = document.getElementById("commentList");
const input = document.getElementById("commentInput");
const sendBtn = document.getElementById("sendCommentBtn");
const closeBtn = document.getElementById("closeCommentModal");

// ================= 状态 =================
let currentPostId = null;
let replyTargetId = null;

// ================= 打开弹窗 =================
export function openCommentModal(postId) {
  currentPostId = postId;

  // 👉 mock数据（后面你换接口）
  const mockComments = [
    {
      id: "1",
      postId,
      parentId: null,
      content: "第一条评论",
      user: { name: "Alice" },
      likes: 0
    },
    {
      id: "2",
      postId,
      parentId: "1",
      content: "回复第一条",
      user: { name: "Bob" },
      likes: 0
    }
  ];

  updateState(commentState, mockComments);

  render();

  modal.classList.remove("hidden");
}

// ================= 关闭弹窗 =================
closeBtn.onclick = () => {
  modal.classList.add("hidden");
};

// ================= 渲染评论树 =================
function render() {
  listBox.innerHTML = "";

  function walk(nodes, depth = 0) {
    nodes.forEach(n => {
      const div = document.createElement("div");

      div.style.marginLeft = depth * 20 + "px";
      div.style.padding = "6px";
      div.innerHTML = `
        <b>${n.user.name}</b>: ${n.content}

        <button class="reply-btn" data-id="${n.id}">回复</button>

        <button class="like-btn" data-id="${n.id}">
          👍 ${n.likes || 0}
        </button>
      `;

      listBox.appendChild(div);

      if (n.children?.length) {
        walk(n.children, depth + 1);
      }
    });
  }

  walk(commentState.commentTree);
}

// ================= 全局事件（事件代理） =================
document.addEventListener("click", (e) => {

  // 回复
  if (e.target.classList.contains("reply-btn")) {
    replyTargetId = e.target.dataset.id;
    input.focus();
  }

  // 点赞
  if (e.target.classList.contains("like-btn")) {
    const id = e.target.dataset.id;

    commentState.comments = commentState.comments.map(c => {
      if (c.id === id) {
        return {
          ...c,
          likes: (c.likes || 0) + 1
        };
      }
      return c;
    });

    updateState(commentState, commentState.comments);
    render();
  }
});

// ================= 发送评论 =================
sendBtn.onclick = () => {
  const text = input.value.trim();
  if (!text) return;

  const newComment = {
    id: Date.now().toString(),
    postId: currentPostId,
    parentId: replyTargetId || null,
    content: text,
    user: { name: "Me" },
    likes: 0
  };

  const newList = [...commentState.comments, newComment];

  updateState(commentState, newList);

  render();

  input.value = "";
  replyTargetId = null;
};
