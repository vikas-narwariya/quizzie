import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function QuizPublish({ isOpen, onClose, onDelete, quizId }) {
  if (!isOpen) {
    return null;
  }
  const notify = () => toast.success("Link copied to Clipboard");
  return (
    <div className="q-modal-container">
      <div className="q-modal">
        <div className="q-modal-content">
          <p>Congrats your Quiz is Published!</p>

          <div className="q-publish-link-wrap">
            <input
              type="text"
              value={`http://localhost:3000/quiz/$quizId`}
              className="q-publish-link"
            />
          </div>
          <div className="q-modal-button-wrap1">
            <button className="q-quiz-continue-btn" onClick={notify}>
              share
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPublish;
