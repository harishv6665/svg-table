import React from 'react';
import classNames from 'classnames';
import { tableData } from './../SvgUtils/tableData';
import Rectangle from './../Rectangle/Rectangle';

const drawRectangles = (
  rectangles, customClassName, selectedItems, onClick,
  onMouseMove,
  onMouseOut,
) => rectangles
  .map((data, index) => {
    const {
      x, y, width, height, fill, stroke, className, id, type, merged, colSpan=1, rowSpan=1,
      columnIndex, rowIndex
    } = data;
    if (type === 'cell') {
      if (merged) {
        if (colSpan > 1 || rowSpan > 1) {
          let mergedWidth = 0;
          let mergedHeight = 0;
          for (let i = columnIndex; i < columnIndex + colSpan; i++) {
            mergedWidth += tableData.tableRows[rowIndex].cells[i].coordinates.width;
          }
          for (let i = rowIndex; i < rowIndex + rowSpan; i++) {
            mergedHeight += tableData.tableRows[i].cells[columnIndex].coordinates.height;
          }
          const nextData = {
            ...data,
            mergedHeight,
            mergedWidth,
          };
          return (
            <Rectangle
              key={`id ${id} - ${index}`}
              id={id}
              x={x}
              y={y}
              width={mergedWidth}
              height={mergedHeight}
              stroke={stroke}
              fill={selectedItems.has(id) ? "blue" : "transparent"}
              className={classNames(customClassName, className)}
              onClick={e => { console.log('e: ',e); onClick(e, nextData);}}
              onMouseMove={e => {onMouseMove(e, nextData);}}
              onMouseOut={e => {onMouseOut(e, nextData);}}
              selectedItems={selectedItems}
              fillOpacity={selectedItems.has(id) ? .2 : 1}
            />
          );
        }
        return null;
      }
    }
    return (
      <Rectangle
        key={`id ${id} - ${index}`}
        id={id}
        x={x}
        y={y}
        width={width}
        height={height}
        stroke={stroke}
        fill={selectedItems.has(id) ? "blue" : "transparent"}
        className={classNames(customClassName, className)}
        onClick={e => { console.log('e: ',e); onClick(e, data);}}
        onMouseMove={e => {onMouseMove(e, data);}}
        onMouseOut={e => {onMouseOut(e, data);}}
        selectedItems={selectedItems}
        fillOpacity={selectedItems.has(id) ? .2 : 1}
      />
    )
  });

export default drawRectangles;