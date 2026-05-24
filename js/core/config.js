/* ========================================
   Global State
======================================== */

// ========================================
// user
// ========================================

let currentUser =
  JSON.parse(
    localStorage.getItem(
      'currentUser'
    )
  ) || null;

// ========================================
// posts
// ========================================

let posts =
  JSON.parse(
    localStorage.getItem(
      'posts'
    )
  ) || [];

// ========================================
// modal
// ========================================

let activeMask = null;

let activeDrawer = null;

let scrollPosition = 0;

// ========================================
// comment / reply
// ========================================

let currentCommentModalPostId =
  null;

let activeReplyTarget =
  null;

// ========================================
// ui
// ========================================

const MOBILE_WIDTH = 768;
