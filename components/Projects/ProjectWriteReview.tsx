/**
 * React component for rendering a form to write a review for a project.
 * @param {Props} onSubmit - Callback function to handle form submission.
 * @returns {JSX.Element} - Returns the JSX representation of the project review form.
 */

"use client";
import React, { FC, useState } from "react";
import style from "./Project.module.css";

// Define the type for the properties passed to the Function Component (FC)
type Props = {
  onSubmit: (form: FormValues) => void;
};

// Define the type for the form values
type FormValues = {
  rating: number;
  comment: string;
};

// Define the ProjectWriteReview Function Component (FC)
const ProjectWriteReview: FC<Props> = ({ onSubmit }) => {
  // State variables to manage form inputs and toast display
  const [rating, setRating] = useState<number>(50);
  const [comment, setComment] = useState<string>("");
  const [toast, setToast] = useState<boolean>(false);

  // Function to handle form submission
  const handleSubmit = () => {
    console.log("submit");
    if (!comment) {
      setTimeout(() => setToast(false), 5000);
      return setToast(true);
    }
    onSubmit({ rating, comment });
  };

  // Function to render a toast notification for an invalid review
  const renderToast = () => (
    <div
      key={`review-toast-${toast}`}
      className="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{
        color: "white",
        display: toast ? "block" : "none",
        position: "absolute",
        top: "3px",
        right: "3px",
        backgroundColor: "var(--warning)",
      }}
    >
      <div className="toast-header warning">
        <strong className="me-auto">Invalid Review</strong>
        <button
          onClick={() => setToast(false)}
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">Please enter text into the comment field</div>
    </div>
  );

  // Return the JSX representation of the project review form
  return (
    <div>
      {renderToast()}
      <div className="mb-3">
        <label htmlFor="customRange1" className="form-label">
          Rating: {rating}
        </label>
        <input
          value={rating}
          onChange={(e) => {
            try {
              setRating(parseInt(e.target.value));
            } catch (e) {
              console.error(e);
            }
          }}
          type="range"
          max={100}
          min={0}
          className="form-range"
          id="customRange1"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Comments
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={3}
        ></textarea>
      </div>
      <div className={style["submit-button"]}>
        <button type="submit" className="btn btn-info" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <hr />
    </div>
  );
};

// Export the ProjectWriteReview Function Component (FC) as the default export
export default ProjectWriteReview;
