import { commentState } from "./commentState.js";
import { updateCommentState } from "./commentTree.js";

const mockComments = [
  {
    id: "1",
    postId: "p1",
    parentId: null,
    content: "第一条评论",
    user: { id: "u1", name: "Alice" }
  },
  {
    id: "2",
    postId: "p1",
    parentId: "1",
    content: "回复第一条",
    user: { id: "u2", name: "Bob" }
  },
  {
    id: "3",
    postId: "p1",
    parentId: "2",
    content: "继续回复",
    user: { id: "u3", name: "Charlie" }
  }
];

updateCommentState(commentState, mockComments);

console.log(commentState.commentTree);
