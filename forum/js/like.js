import { getLikeState, saveLikeState } from "./services/storage.js";

/**
 * 点赞（不可取消，可重复）
 */
export function addLike(postId, user) {
  const state = getLikeState(postId) || {
    count: 0,
    users: []
  };

  state.count += 1;
  state.users.push(user);

  saveLikeState(postId, state);
  return state;
}

/**
 * 去重用户列表（用于展示）
 */
export function getUniqueUsers(state) {
  const map = new Map();

  state.users.forEach(u => {
    map.set(u.id, u);
  });

  return Array.from(map.values());
}

/**
 * 渲染点赞数量
 */
export function renderLikeCount(el, state) {
  const countEl = el.querySelector(".like-count");
  if (!countEl) return;

  countEl.textContent = state.count;
}

/**
 * 渲染点赞列表（头像+名字）
 */
export function renderLikeList(container, state) {
  const users = getUniqueUsers(state);

  container.innerHTML = users.map(u => `
    <div class="like-user">
      <img class="avatar" src="${u.avatar}" />
      <span class="name">${u.name}</span>
    </div>
  `).join("");
}

/**
 * 绑定点赞点击
 * mode: "feed" | "comment"
 */
export function bindLike(el, postId, user, mode, onShowList) {
  const btn = el.querySelector(".like-btn");
  const countEl = el.querySelector(".like-count");

  btn.addEventListener("click", () => {
    const state = addLike(postId, user);
    renderLikeCount(el, state);

    // feed模式：可以查看点赞列表
    if (mode === "feed") {
      countEl.onclick = () => onShowList(state);
    }

    // comment模式：不绑定点击事件
    if (mode === "comment") {
      countEl.onclick = null;
    }
  });
}
