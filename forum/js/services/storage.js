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
