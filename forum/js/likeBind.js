import { addLike } from "./like.js";
import { renderLikeCount } from "./likeUI.js";
import { getLikeState } from "./services/storage.js";

/**
 * 防抖时间（毫秒）
 */
const LIKE_COOLDOWN = 400;

/**
 * 绑定点赞
 */
export function bindLike(el, postId, user, mode, onShowList) {
  const btn = el.querySelector(".like-btn");
  const countEl = el.querySelector(".like-count");

  let lastClickTime = 0;

  // 点赞按钮（+1）
  btn.addEventListener("click", () => {
  const now = Date.now();

  if (now - lastClickTime < LIKE_COOLDOWN) return;

  lastClickTime = now;

  const state = addLike(postId, user);
  renderLikeCount(el, state);

  // =========================
  // ⭐ 点赞动画（新增）
  // =========================

  // 按钮轻微缩放
  btn.classList.add("like-pop");
  setTimeout(() => {
    btn.classList.remove("like-pop");
  }, 150);

  // +1 飘动
  const float = document.createElement("div");
  float.className = "like-float";
  float.textContent = "+1";

  const rect = btn.getBoundingClientRect();

  float.style.left = rect.left + rect.width / 2 + "px";
  float.style.top = rect.top + "px";

  document.body.appendChild(float);

  requestAnimationFrame(() => {
    float.style.transform = "translateY(-40px)";
    float.style.opacity = "0";
  });

  setTimeout(() => {
    float.remove();
  }, 600);
});

  // 查看列表（feed才有）
  if (mode === "feed") {
    countEl.addEventListener("click", () => {
      const state = getLikeState(postId);
      onShowList(postId, state);
    });
  }
}
