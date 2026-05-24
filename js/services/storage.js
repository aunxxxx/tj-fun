/* ========================================
   POSTS
======================================== */

function loadPosts() {

  try {

    return JSON.parse(
      localStorage.getItem(
        'posts'
      )
    ) || [];

  } catch (err) {

    console.error(
      'loadPosts error',
      err
    );

    return [];
  }
}

function savePosts() {

  try {

    localStorage.setItem(
      'posts',
      JSON.stringify(posts)
    );

  } catch (err) {

    console.error(
      'savePosts error',
      err
    );
  }
}

/* ========================================
   USER
======================================== */

function loadCurrentUser() {

  try {

    return JSON.parse(
      localStorage.getItem(
        'currentUser'
      )
    );

  } catch (err) {

    console.error(
      'loadCurrentUser error',
      err
    );

    return null;
  }
}

function saveCurrentUser(user) {

  try {

    localStorage.setItem(
      'currentUser',
      JSON.stringify(user)
    );

  } catch (err) {

    console.error(
      'saveCurrentUser error',
      err
    );
  }
}

/* ========================================
   INIT
======================================== */

posts = loadPosts();

currentUser =
  loadCurrentUser();
/* ========================================
   like
======================================== */
function loadLikeState() {
  try {
    return JSON.parse(
      localStorage.getItem('likeState')
    ) || {};
  } catch (err) {
    console.error('loadLikeState error', err);
    return {};
  }
}

function saveLikeStateAll(data) {
  try {
    localStorage.setItem(
      'likeState',
      JSON.stringify(data)
    );
  } catch (err) {
    console.error('saveLikeState error', err);
  }
}

/* 暴露给 like.js 用 */
function getLikeState(postId) {
  const all = loadLikeState();
  return all[postId] || { count: 0, users: [] };
}

function saveLikeState(postId, state) {
  const all = loadLikeState();
  all[postId] = state;
  saveLikeStateAll(all);
}
