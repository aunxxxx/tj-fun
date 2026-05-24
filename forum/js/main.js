import { bindLike } from "./like.js";
import { getLikeState } from "./services/storage.js";

/**
 * 假设 currentUser 已存在（你已有）
 */
const user = {
  id: currentUser?.id || "u1",
  name: currentUser?.name || "User",
  avatar: currentUser?.avatar || "/img/default.png"
};

/**
 * 绑定所有帖子点赞
 */
document.querySelectorAll(".post").forEach((postEl) => {
  const postId = postEl.dataset.id;

  bindLike(
    postEl,
    postId,
    user,
    "feed",
    (users, state) => {
      console.log("点赞列表：", users);
      console.log("完整状态：", state);
    }
  );
});
