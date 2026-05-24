/* ========================================
   escape html
======================================== */

function escapeHtml(text) {

  if (text == null) return '';

  return text
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ========================================
   relative time
======================================== */

function formatRelativeTime(timestamp) {

  const now = Date.now();

  const diff =
    now - timestamp;

  const minute =
    60 * 1000;

  const hour =
    60 * minute;

  const day =
    24 * hour;

  if (diff < minute) {

    return '刚刚';
  }

  if (diff < hour) {

    return `${Math.floor(diff / minute)}分钟前`;
  }

  if (diff < day) {

    return `${Math.floor(diff / hour)}小时前`;
  }

  if (diff < day * 7) {

    return `${Math.floor(diff / day)}天前`;
  }

  const date =
    new Date(timestamp);

  return `${date.getFullYear()}-${
    String(
      date.getMonth() + 1
    ).padStart(2, '0')
  }-${
    String(
      date.getDate()
    ).padStart(2, '0')
  }`;
}

/* ========================================
   random id
======================================== */

function generateId() {

  return (
    Date.now() +
    Math.floor(
      Math.random() * 10000
    )
  );
}

/* ========================================
   mobile
======================================== */

function isMobile() {

  return (
    window.innerWidth <=
    MOBILE_WIDTH
  );
}
