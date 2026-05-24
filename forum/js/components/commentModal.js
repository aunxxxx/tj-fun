
/* ========================================
   WECHAT / RED NOTE / iOS SHEET FINAL
======================================== */

.modal-mask {
  position: fixed;
  inset: 0;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  background: rgba(0,0,0,0.3);

  z-index: 9999;

  opacity: 0;
  transition: opacity 0.25s ease;
}

.modal-mask.show {
  opacity: 1;
}

/* ================= SHEET ================= */

.drawer-modal {
  width: 100%;
  max-width: 720px;
  height: 85vh;

  background: #fff;
  border-radius: 28px 28px 0 0;

  display: flex;
  flex-direction: column;

  transform: translateY(100%);

  will-change: transform;
}

/* dragging state */
.drawer-modal.dragging {
  transition: none !important;
}

/* ================= ANIMATION ================= */

.modal-mask.show .drawer-modal {
  animation: sheetIn 0.35s cubic-bezier(0.2,0.8,0.2,1);
}

@keyframes sheetIn {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

/* ================= DRAG HANDLE ================= */

.drag-bar {
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drag-bar::before {
  content: "";
  width: 42px;
  height: 5px;
  border-radius: 999px;
  background: rgba(0,0,0,0.2);
}

/* ================= CONTENT ================= */

.drawer-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* ================= COMMENTS ================= */

.comment-item {
  padding: 10px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.comment-actions {
  font-size: 12px;
  color: #666;
  display: flex;
  gap: 10px;
}

/* ================= INPUT ================= */

.comment-input-bar {
  display: flex;
  gap: 8px;
  padding: 10px;
  border-top: 1px solid rgba(0,0,0,0.08);
  background: #fff;

  transition: transform 0.25s cubic-bezier(0.2,0.8,0.2,1);
}

.comment-input-bar input {
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.comment-input-bar button {
  padding: 10px 14px;
  border: none;
  background: #111;
  color: #fff;
  border-radius: 10px;
}

/* ================= REPLY ================= */

.reply-preview {
  padding: 6px 10px;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 12px;

  display: flex;
  justify-content: space-between;

  animation: pop 0.2s ease;
}

@keyframes pop {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
