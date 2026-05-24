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
 * 去重用户（用于展示）
 */
export function getUniqueUsers(state) {
  const map = new Map();

  (state.users || []).forEach(u => {
    if (u && u.id) {
      map.set(u.id, u);
    }
  });

  return Array.from(map.values());
}
