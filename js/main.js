document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     POST 点击 -> 打开评论
  ========================= */

  const posts = document.querySelectorAll(".post");

  posts.forEach(post => {
    post.addEventListener("click", () => {
      post.classList.toggle("liked");
    });
  });

  /* =========================
     COMMENT MODAL
  ========================= */

  const modal = document.getElementById("commentModal");
  const closeBtn = document.getElementById("closeCommentModal");
  const postList = document.getElementById("postList");

  // 打开
  postList.addEventListener("click", (e) => {
    const post = e.target.closest(".post");
    if (!post) return;

    modal.classList.remove("hidden");
  });

  // 关闭按钮
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // 点击背景关闭
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

});
