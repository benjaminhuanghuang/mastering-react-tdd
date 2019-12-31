import React, { useCallback } from 'react';

const ToggleButton = ({ id, onClick, toggled, children }) => {
  let className = 'toggle-button';
  if (toggled) {
    className += ' toggled';
  }
  return (
    <a id={id} onClick={onClick} className={className}>
      {children}
    </a>
  );
};

export const SearchButtons = ({
  handleLimit,
  handleNext,
  handlePrevious,
  limit,
  hasNext,
  hasPrevious
}) => {
  return (
    <div className="button-bar">
    <ToggleButton
      id="limit-10"
      onClick={() => handleLimit(10)}
      toggled={limit === 10}>
      10
    </ToggleButton>
    <ToggleButton
      id="limit-20"
      onClick={() => handleLimit(20)}
      toggled={limit === 20}>
      20
    </ToggleButton>
    <ToggleButton
      id="limit-50"
      onClick={() => handleLimit(50)}
      toggled={limit === 50}>
      50
    </ToggleButton>
    <ToggleButton
      id="limit-100"
      onClick={() => handleLimit(100)}
      toggled={limit === 100}>
      100
    </ToggleButton>
    <button
      role="button"
      id="previous-page"
      onClick={handlePrevious}
      disabled={!hasPrevious}>
      Previous
    </button>
    <button
      role="button"
      id="next-page"
      onClick={handleNext}
      disabled={!hasNext}>
      Next
    </button>
  </div>
  )
}