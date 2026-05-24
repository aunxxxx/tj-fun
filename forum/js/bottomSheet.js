// ========================================
// Bottom Sheet Modal System
// iOS Professional Version
// ========================================

let activeMask = null;
let activeDrawer = null;
let scrollPosition = 0;

function closeModal() {

  if (!activeMask) return;

  const wrapper =
    document.getElementById('pageWrapper');

  wrapper.style.transform = '';
  wrapper.style.filter = '';

  wrapper.classList.remove(
    'modal-open'
  );

  if (activeDrawer?.cleanup) {
    activeDrawer.cleanup();
  }

  activeMask.remove();

  activeMask = null;
  activeDrawer = null;

  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';

  window.scrollTo(
    0,
    scrollPosition
  );
}

function openModal(
  modalElement,
  isMobile
) {

  if (activeMask) {
    closeModal();
  }

  const wrapper =
    document.getElementById(
      'pageWrapper'
    );

  scrollPosition =
    window.scrollY;

  // =========================
  // mask
  // =========================

  const mask =
    document.createElement('div');

  mask.className =
    'modal-mask show';

  document.body.appendChild(mask);

  mask.appendChild(modalElement);

  document.body.style.overflow =
    'hidden';

  document.body.style.position =
    'fixed';

  document.body.style.top =
    `-${scrollPosition}px`;

  document.body.style.width =
    '100%';

  activeMask = mask;

  // =========================
  // desktop
  // =========================

  if (!isMobile) {

    const closeBtn =
      modalElement.querySelector(
        '.close-modal'
      );

    if (closeBtn) {
      closeBtn.onclick = () => {
        closeModal();
      };
    }

    return;
  }

  // =========================
  // mobile bottom sheet
  // =========================

  activeDrawer =
    modalElement;

  const drawer =
    modalElement;

  const content =
    drawer.querySelector(
      '.drawer-content'
    );

  let startY = 0;
  let deltaY = 0;
  let dragging = false;

  let startFromContent = false;

  // =========================
  // initial animation
  // =========================

  wrapper.classList.add(
    'modal-open'
  );

  wrapper.style.transition =
    'transform .35s cubic-bezier(.22,1,.36,1), filter .35s ease';

  wrapper.style.transform =
    'scale(.94)';

  wrapper.style.filter =
    'blur(4px)';

  drawer.style.transform =
    'translateY(100%)';

  requestAnimationFrame(() => {

    drawer.style.transition =
      'transform .45s cubic-bezier(.22,1,.36,1)';

    drawer.style.transform =
      'translateY(0)';
  });

  // =========================
  // touch start
  // =========================

  const onTouchStart = (e) => {

    startY =
      e.touches[0].clientY;

    deltaY = 0;

    dragging = true;

    startFromContent =
      e.target.closest(
        '.drawer-content'
      ) !== null;

    drawer.style.transition =
      'none';

    wrapper.style.transition =
      'none';

    mask.style.transition =
      'none';
  };

  // =========================
  // touch move
  // =========================

  const onTouchMove = (e) => {

    if (!dragging) return;

    const currentY =
      e.touches[0].clientY;

    deltaY =
      currentY - startY;

    // upward ignore

    if (deltaY < 0) return;

    // content scroll priority

    if (
      startFromContent &&
      content
    ) {

      const atTop =
        content.scrollTop <= 0;

      if (!atTop) return;
    }

    e.preventDefault();

    const moveY =
      Math.pow(deltaY, 0.92);

    drawer.style.transform =
      `translateY(${moveY}px)`;

    const progress =
      Math.min(moveY / 300, 1);

    wrapper.style.transform =
      `scale(${0.94 + progress * 0.06})`;

    wrapper.style.filter =
      `blur(${4 - progress * 4}px)`;

    mask.style.background =
      `rgba(0,0,0,${
        0.3 - progress * 0.3
      })`;
  };

  // =========================
  // touch end
  // =========================

  const onTouchEnd = () => {

    if (!dragging) return;

    dragging = false;

    drawer.style.transition =
      'transform .32s cubic-bezier(.22,1,.36,1)';

    wrapper.style.transition =
      'transform .32s cubic-bezier(.22,1,.36,1), filter .32s ease';

    mask.style.transition =
      'background .32s ease';

    // close

    if (deltaY > 120) {

      drawer.style.transform =
        'translateY(100%)';

      wrapper.style.transform =
        'scale(1)';

      wrapper.style.filter =
        'blur(0px)';

      mask.style.background =
        'rgba(0,0,0,0)';

      setTimeout(() => {
        closeModal();
      }, 280);

      return;
    }

    // rebound

    drawer.style.transform =
      'translateY(0)';

    wrapper.style.transform =
      'scale(.94)';

    wrapper.style.filter =
      'blur(4px)';

    mask.style.background =
      'rgba(0,0,0,.3)';
  };

  // =========================
  // events
  // =========================

  drawer.addEventListener(
    'touchstart',
    onTouchStart,
    { passive: false }
  );

  drawer.addEventListener(
    'touchmove',
    onTouchMove,
    { passive: false }
  );

  drawer.addEventListener(
    'touchend',
    onTouchEnd
  );

  drawer.addEventListener(
    'touchcancel',
    onTouchEnd
  );

  // =========================
  // cleanup
  // =========================

  drawer.cleanup = () => {

    drawer.removeEventListener(
      'touchstart',
      onTouchStart
    );

    drawer.removeEventListener(
      'touchmove',
      onTouchMove
    );

    drawer.removeEventListener(
      'touchend',
      onTouchEnd
    );

    drawer.removeEventListener(
      'touchcancel',
      onTouchEnd
    );
  };
}
import { getLikeState } from "./services/storage.js";
import { getUniqueUsers } from "./like.js";
import { openModal, closeModal } from "./modalEngine.js";

/**
 * 点赞弹窗入口（放 bottomsheet.js）
 */
export function openLikeSheet(postId) {
  const tpl = document.getElementById("likeModal");

  const modal = tpl.cloneNode(true);
  modal.style.display = "block";

  const state = getLikeState(postId);
  const users = getUniqueUsers(state);

  const html = users.map(u => `
    <div class="like-user">
      <img src="${u.avatar}" />
      <span>${u.name}</span>
    </div>
  `).join("");

  modal.querySelector(".drawer-content").innerHTML = html;
  modal.querySelector(".modal-body").innerHTML = html;

  const isMobile = window.innerWidth <= 768;

  openModal(modal, isMobile);

  modal.querySelector(".close-modal")?.addEventListener("click", () => {
    closeModal();
  });
}
