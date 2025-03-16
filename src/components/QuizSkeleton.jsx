import React from 'react';
    import './QuizSkeleton.css';

    function QuizSkeleton() {
      return (
        <div>
          <div className="skeleton-text skeleton-heading"></div>
          <div className="skeleton-text"></div>
          <div className="options">
            <div className="skeleton-button"></div>
            <div className="skeleton-button"></div>
            <div className="skeleton-button"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      );
    }

    export default QuizSkeleton;
