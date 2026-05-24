import { bindLike } from "./likeBind.js";
import { openLikeSheet, closeSheet } from "./bottomsheet.js";

const mockUser = {
  id: "guest_1",
  name: "Guest",
  avatar: "/img/default.png"
};

/* =========================
   CLOSE SHEET（安全绑定）
========================= */

function initBottomSheetClose() {
  const mask = document.querySelector(".modal-mask");

  if (!mask) return;

  // 防止重复绑定
  mask.removeEventListener?.("click", handleClose);
  mask.addEventListener("click", handleClose);
}

function handleClose(e) {
  if (e.target.classList.contains("modal-mask")) {
    closeSheet();
  }
}

/* =========================
   LIKE 初始化（防重复）
========================= */

function initFeed() {
  const posts = document.querySelectorAll(".post");

  if (!posts.length) return;

  posts.forEach(postEl => {
    const postId = postEl.dataset.id;

    // 防重复绑定（关键优化）
    if (postEl.dataset.likeBound === "1") return;
    postEl.dataset.likeBound = "1";

    bindLike(
      postEl,
      postId,
      mockUser,
      "feed",
      () => {
        openLikeSheet(postId);
      }
    );
  });
}

/* =========================
   BOOT（统一入口）
========================= */

document.addEventListener("DOMContentLoaded", () => {
  initBottomSheetClose();
  initFeed();
});
