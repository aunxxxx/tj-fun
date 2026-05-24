
const mask = document.querySelector(".modal-mask");
const drawer = document.querySelector(".drawer-modal");

const listBox = document.getElementById("commentList");
const input = document.getElementById("commentInput");
const sendBtn = document.getElementById("sendCommentBtn");

/* ================= STATE ================= */

let replyTarget = null;

/* ================= PHYSICS ================= */

let startY = 0;
let lastY = 0;
let velocity = 0;
let lastTime = 0;

let translateY = 0;
let dragging = false;

const FRICTION = 0.92;

/* ================= OPEN ================= */

export function openCommentModal() {
  mask.classList.add("show");
}

/* ================= CLOSE ================= */

function closeModal() {
  mask.classList.remove("show");
  drawer.style.transform = "translateY(100%)";
}

/* ================= CLICK COMMENT ================= */

document.addEventListener("click", (e) => {
  const item = e.target.closest(".comment-item");

  if (!item) return;

  // 🧲 磁吸定位（核心）
  item.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  setActive(item);

  if (e.target.classList.contains("reply")) {
    setReply(item);
  }
});

/* ================= ACTIVE ================= */

function setActive(item) {
  document.querySelectorAll(".comment-item")
    .forEach(el => el.classList.remove("active"));

  item.classList.add("active");
}

/* ================= REPLY ================= */

function setReply(item) {
  const name = item.dataset.name || "用户";

  replyTarget = item;

  let bar = document.querySelector(".reply-preview");

  if (!bar) {
    bar = document.createElement("div");
    bar.className = "reply-preview";
    input.parentNode.insertBefore(bar, input);
  }

  bar.innerHTML = `
    <span>回复 @${name}</span>
    <button id="cancelReply">✕</button>
  `;

  document.getElementById("cancelReply").onclick = () => {
    replyTarget = null;
    bar.remove();
  };

  // 🧭 输入框跟随（知乎级）
  document.querySelector(".comment-input-bar")
    .classList.add("focused");
}

/* ================= SEND ================= */

sendBtn.onclick = () => {
  input.value = "";
  replyTarget = null;

  document.querySelector(".reply-preview")?.remove();

  document.querySelector(".comment-input-bar")
    .classList.remove("focused");
};

/* ================= WECHAT DRAG ================= */

drawer.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
  lastY = startY;
  lastTime = Date.now();
  dragging = true;

  drawer.classList.add("dragging");
});

drawer.addEventListener("touchmove", (e) => {
  if (!dragging) return;

  const y = e.touches[0].clientY;

  const delta = y - startY;

  const now = Date.now();
  velocity = (y - lastY) / (now - lastTime);

  lastY = y;
  lastTime = now;

  let move = delta;

  // 🪶 小红书阻尼
  if (move > 0) {
    move = move * (1 / (1 + move * 0.002));
  }

  translateY = move;

  drawer.style.transform = `translateY(${translateY}px)`;

  updateBackdrop(move);
});

drawer.addEventListener("touchend", () => {
  dragging = false;
  drawer.classList.remove("dragging");

  const v = velocity * 1000;

  if (translateY > 160 || v > 1200) {
    inertiaClose(v);
  } else {
    snapBack();
  }
});

/* ================= INERTIA ================= */

function inertiaClose(v) {
  let pos = translateY;
  let vel = v;

  function step() {
    vel *= FRICTION;
    pos += vel * 0.016;

    drawer.style.transform = `translateY(${pos}px)`;

    if (Math.abs(vel) > 0.5) {
      requestAnimationFrame(step);
    } else {
      closeModal();
    }
  }

  requestAnimationFrame(step);
}

/* ================= SNAP ================= */

function snapBack() {
  drawer.style.transition =
    "transform 0.4s cubic-bezier(0.2,0.9,0.2,1)";

  drawer.style.transform = "translateY(0)";

  setTimeout(() => {
    drawer.style.transition = "none";
  }, 400);
}

/* ================= BACKDROP ================= */

function updateBackdrop(p) {
  mask.style.backdropFilter =
    `blur(${Math.min(10, p * 0.05)}px)`;
}
