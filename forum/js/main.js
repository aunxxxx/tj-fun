import { bindLike } from "./like.js";

const mockUser = {
  id: "guest_1",
  name: "Guest",
  avatar: "/img/default.png"
};

document.querySelectorAll(".post").forEach((postEl) => {
  const postId = postEl.dataset.id;

  bindLike(
    postEl,
    postId,
    mockUser,
    "feed",
    (users, state) => {
      // 现在先不用UI，只做验证
      console.log("点赞用户列表：", users);
      console.log("点赞数据：", state);
    }
  );
});
