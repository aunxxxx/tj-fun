
export function renderComments(tree, container) {
  container.innerHTML = "";

  tree.forEach(comment => {
    container.appendChild(renderNode(comment));
  });
}

function renderNode(comment, depth = 0) {
  const div = document.createElement("div");

  div.style.marginLeft = depth * 16 + "px";

  div.className = "comment-item";

  div.innerHTML = `
    <div class="comment-user">${comment.user.name}</div>
    <div class="comment-content">${comment.content}</div>
    <button class="reply-btn" data-id="${comment.id}">
      回复
    </button>
  `;

  if (comment.children?.length) {
    comment.children.forEach(child => {
      div.appendChild(renderNode(child, depth + 1));
    });
  }

  return div;
}
