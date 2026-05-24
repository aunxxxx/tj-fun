import { bindLike } from "./likeBind.js";
import { openLikeSheet, closeSheet } from "./bottomsheet.js";

const mockUser = {
  id: "guest_1",
  name: "Guest",
  avatar: "/img/default.png"
};

// 关闭 bottomsheet
document.querySelector(".modal-mask")?.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-mask")) {
    closeSheet();
  }
});

// 绑定帖子
document.querySelectorAll(".post").forEach(postEl => {
  const postId = postEl.dataset.id;

  bindLike(postEl, postId, mockUser, (postId) => {
    openLikeSheet(postId);
  });
});
