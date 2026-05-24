
import { bindLike } from "./likeBind.js";
import { openLikeSheet, closeSheet } from "./bottomsheet.js";

const mockUser = {
  id: "guest_1",
  name: "Guest",
  avatar: "/img/default.png"
};

/* =========================
   CLOSE SHEET
========================= */

document.querySelector(".modal-mask")?.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-mask")) {
    closeSheet();
  }
});

/* =========================
   INIT FEED (核心)
========================= */

function initFeed() {
  document.querySelectorAll(".post").forEach(postEl => {
    const postId = postEl.dataset.id;

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
   BOOT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  initFeed();
});
