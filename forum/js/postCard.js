// js/components/postCard.js

import { openCommentModal } from "./commentModal.js";

// 示例：渲染帖子列表
export function renderPosts(container, posts) {
  container.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post-card";

    div.innerHTML = `
      <div class="post-content">
        ${post.content}
      </div>

      <button class="comment-btn" data-postid="${post.id}">
        评论
      </button>
    `;

    container.appendChild(div);
  });
}

// 👇 全局事件绑定（接入点就在这里）
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("comment-btn")) {
    const postId = e.target.dataset.postid;

    // 打开评论弹窗
    openCommentModal(postId);
  }
});
