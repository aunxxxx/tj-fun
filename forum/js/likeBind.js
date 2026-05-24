import { addLike } from "./like.js";
import { renderLikeCount } from "./likeUI.js"; // 如果你还没拆UI，可以先放同文件
import { getLikeState } from "./services/storage.js";

/**
 * 绑定点赞
 */
export function bindLike(el, postId, user, onOpenSheet) {
  const btn = el.querySelector(".like-btn");
  const countEl = el.querySelector(".like-count");

  // 点赞
  btn.addEventListener("click", () => {
    const state = addLike(postId, user);
    renderLikeCount(el, state);
  });

  // 查看列表（只绑定一次）
  countEl.addEventListener("click", () => {
    const state = getLikeState(postId);
    onOpenSheet(postId, state);
  });
}
