import React from 'react';
    import './TrackerSkeleton.css';

    function TrackerSkeleton() {
      return (
        <div>
          <div className="skeleton-text skeleton-heading"></div>
          <div className="tracker-item">
            <div className="skeleton-checkbox"></div>
            <div className="skeleton-text"></div>
          </div>
          <div className="tracker-item">
            <div className="skeleton-checkbox"></div>
            <div className="skeleton-text"></div>
          </div>
          <div className="tracker-item">
            <div className="skeleton-checkbox"></div>
            <div className="skeleton-text"></div>
          </div>
          <div className="skeleton-bar-container">
            <div className="skeleton-bar"></div>
          </div>
        </div>
      );
    }

    export default TrackerSkeleton;
