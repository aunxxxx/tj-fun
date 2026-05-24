
import { renderPostCard } from "./components/postCard.js";

/* =========================
   MOCK DATA（先跑起来）
========================= */

const posts = [
  {
    id: "p1",
    user: "Alice",
    content: "第一条测试帖子",
    likes: 3
  },
  {
    id: "p2",
    user: "Bob",
    content: "论坛系统启动成功",
    likes: 1
  }
];

/* =========================
   RENDER ENTRY
========================= */

function renderPosts() {
  const container = document.getElementById("postList");

  if (!container) {
    console.error("postList not found");
    return;
  }

  container.innerHTML = "";

  posts.forEach(post => {
    const el = renderPostCard(post);
    container.appendChild(el);
  });
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
});
