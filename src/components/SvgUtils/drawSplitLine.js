import React from 'react';

const drawSplitLine = ({
                         x1,
                         y1,
                         x2,
                         y2,
                       }) => (
  <line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke="white"
    stroke-width=".01"
    stroke-dasharray=".2"
    strokeOpacity={1}
    style={{ pointerEvents: 'none' }}
  />
);

export default drawSplitLine;