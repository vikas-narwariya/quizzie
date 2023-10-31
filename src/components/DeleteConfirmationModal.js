import React, { useState } from "react";

function DeleteConfirmationModal({ isOpen, onClose, onDelete }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="q-modal-container">
      <div className="q-modal">
        <div className="q-modal-content">
          <p>Are you confirm you want to delete?</p>
          <div className="delete-modal-button-wrap">
            <button className="delete-modal-button1" onClick={onDelete}>
              Confirm Delete
            </button>
            <button className="delete-modal-button2" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
