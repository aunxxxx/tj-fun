export function renderLikeCount(el, state) {
  const countEl = el.querySelector(".like-count");
  if (!countEl) return;

  countEl.textContent = state.count;
}
