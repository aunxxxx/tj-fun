import { bindLike } from "./likeBind.js";
import { openLikeSheet } from "./bottomsheet.js";

const mockUser = {
  id: "guest_1",
  name: "Guest",
  avatar: "/img/default.png"
};

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
