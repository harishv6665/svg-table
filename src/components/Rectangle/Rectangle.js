import React from 'react';

const Rectangle = ({
                     x, y, width, height, fill, stroke,
                     className, selectedItems, onClick,
                     onMouseMove, id, fillOpacity,
                     onMouseOut,
                   }) => (
  <rect
    x={x}
    y={y}
    width={width}
    height={height}
    fill={fill}
    stroke={stroke}
    className={className}
    onClick={onClick}
    onMouseMove={onMouseMove}
    onMouseOut={onMouseOut}
    fillOpacity={fillOpacity}
  />
);

export default Rectangle;