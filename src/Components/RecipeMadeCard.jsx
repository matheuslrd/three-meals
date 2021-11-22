import React from 'react';

export default function RecipeMadeCard() {
  return (
    <div className="Card">
      <img data-testid="${index}-horizontal-image"></img>
      <p data-testid="${index}-horizontal-top-text"></p>
      <p data-testid="${index}-horizontal-name"></p>
      <p data-testid="${index}-horizontal-done-date"></p>
      <p data-testid="${index}-${tagName}-horizontal-tag"></p>
    </div>
  );
}
