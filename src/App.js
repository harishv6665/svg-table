import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import classNames from 'classnames';


const tableData = {
  id: 't1',
  confidenceScore: 50,
  tag: 'Bank details',
  coordinates: { x: 0, y: 0, width: 200, height: 100 },
  styles: { stroke: 'red', fill: 'transparent' },
  type: 'table',
  tableCols: [
    {
      id: 'col1',
      coordinates: { x: 5, y: 5, width: 90, height: 90 },
      styles: { stroke: 'blue', fill: 'transparent' },
      type: 'col',
    },
    {
      id: 'col2',
      coordinates: { x: 105, y: 5, width: 90, height: 90 },
      styles: { stroke: 'blue', fill: 'transparent' },
      type: 'col',
    },
  ],
  tableRows: [
    {
      id: 'row1',
      isHeader: true,
      coordinates: { x: 5, y: 5, width: 180, height: 45 },
      styles: { stroke: 'green', fill: 'transparent' },
      type: 'row',
      cells: [
        {
          id: 'cell11',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-11',
          coordinates: { x: 10, y: 10, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        },
        {
          id: 'cell12',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-12',
          coordinates: { x: 100, y: 10, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        },
      ]
    },
    {
      id: 'row2',
      isHeader: true,
      coordinates: { x: 5, y: 55, width: 180, height: 45 },
      styles: { stroke: 'green', fill: 'transparent' },
      type: 'row',
      cells: [
        {
          id: 'cell21',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-21',
          coordinates: { x: 10, y: 55, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        },
        {
          id: 'cell22',
          isNull: false,
          colSpan: 1,
          rowSpan: 1,
          value: 'c-22',
          coordinates: { x: 100, y: 55, width: 85, height: 35 },
          styles: { stroke: 'yellow', fill: '#ccc' },
          type: 'cell',
        },
      ]
    },
  ],
};


const tableCords = [{
    ...tableData.coordinates,
    ...tableData.styles,
  type: tableData.type,
  id: tableData.id,
}];

const tableRowCellCords = tableData.tableRows.reduce((acc, cord) => {
    acc.tableRowCords.push({
    ...cord.coordinates,
    ...cord.styles,
  type: cord.type,
  id: cord.id,
});
const cells = cord.cells.map(cell => ({
    ...cell.coordinates,
    ...cell.styles,
  type: cell.type,
  id: cell.id,
}));
acc.tableCellCords = [...acc.tableCellCords, ...cells];
return acc;
}, { tableRowCords: [], tableCellCords: [] });

const tableColCords = tableData.tableCols.map(col => ({
    ...col.coordinates,
    ...col.styles,
  type: col.type,
  id: col.id,
}));

const { tableRowCords, tableCellCords } = tableRowCellCords;


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
)

const drawRectangles = (
  rectangles, customClassName, selectedItems, onClick,
  onMouseMove,
  onMouseOut,
) => rectangles
  .map((data) => {
    const {
      x, y, width, height, fill, stroke, className, id,
    } = data;
    return (
      <Rectangle
        id={id}
        x={x}
        y={y}
        width={width}
        height={height}
        stroke={stroke}
        fill={selectedItems.has(id) ? "blue" : "transparent"}
        className={classNames(customClassName, className)}
        onClick={e => {onClick(e, data);}}
        onMouseMove={e => {onMouseMove(e, data);}}
        onMouseOut={e => {onMouseOut(e, data);}}
        selectedItems={selectedItems}
        fillOpacity={selectedItems.has(id) ? .2 : 1}
    />
    )
  });

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
  />
);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'view', // view | edit,
      editEntity: 'cell', // 'cell' | 'column' | 'row' | 'table'
      editAction: 'merge', // 'merge' | 'delete' | 'split'
      selectedItems: new Set([]),
      splitLineCoordinates: null,
      splitAxis: 'horizontal', // 'horizontal', 'vertical'
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.selectMode = this.selectMode.bind(this);
    this.selectEditEntity = this.selectEditEntity.bind(this);
    this.selectEditAction = this.selectEditAction.bind(this);
    this.selectSplitAxis = this.selectSplitAxis.bind(this);
  }

  handleMouseMove(e, item) {
    const getLineCoordinates = (item, hoverCoordinates, axis) => {
      const getLineCoordinatesByAxis = (item, hoverCoordinates, horizontalAxis) => (
        horizontalAxis ? ({
          x1: item.x,
          y1: hoverCoordinates.y,
          x2: item.x + item.width,
          y2: hoverCoordinates.y,
        }) : ({
          x1: hoverCoordinates.x,
          y1: item.y,
          x2: hoverCoordinates.x,
          y2: item.y + item.height,
        })
      );
      if (item.type === 'row') {
        return getLineCoordinatesByAxis(item, hoverCoordinates, true)
      } else if (item.type === 'col') {
        return getLineCoordinatesByAxis(item, hoverCoordinates, false)
      }
      return getLineCoordinatesByAxis(item, hoverCoordinates, this.state.splitAxis === 'horizontal');
    };

    if (this.state.mode !== 'view' && this.state.editAction === 'split') {
      e.stopPropagation();
      let pt = this.svgRef.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      const hoverCoordinates = pt.matrixTransform(this.svgRef.getScreenCTM().inverse());
      this.setState({
        splitLineCoordinates: getLineCoordinates(item, hoverCoordinates),
      })
      // console.log({ l });
      // console.log('item ', item.id, ' hovered of type: ', item.type, ' for action: ', this.state.editAction, e.clientX, e.clientY)
      // const { selectedItems } = this.state;
      // this.setState({
      //   selectedItems: selectedItems.has(item.id) ?
      //     (this.state.selectedItems.delete(item.id) && this.state.selectedItems) : this.state.selectedItems.add(item.id),
      // })
    } else {
      // highlightTableData();
    }
  }

  handleClick(e, item) {
    const { mode, editAction } = this.state;
    if (mode !== 'view') {
      e.stopPropagation();
      console.log('item ', item.id, ' clicked of type: ', item.type, ' for action: ', this.state.editAction)
      if ( editAction === 'split') {

      } else {
        const { selectedItems } = this.state;
        this.setState({
          selectedItems: selectedItems.has(item.id) ?
            (this.state.selectedItems.delete(item.id) && this.state.selectedItems) : this.state.selectedItems.add(item.id),
        })
      }
    } else {
      // highlightTableData();
    }
  }

  handleMouseOut(e, item) {
    this.setState({
      splitLineCoordinates: null,
    })
  }

  selectMode(e) {
    this.setState({
      mode: e.target.value,
      selectedItems: new Set([]),
    })
  }

  selectEditEntity(e) {
    this.setState({
      editEntity: e.target.value,
      selectedItems: new Set([]),
    })
  }

  selectEditAction(e) {
    this.setState({
      editAction: e.target.value,
      selectedItems: new Set([]),
    })
  }

  selectSplitAxis(e) {
    this.setState({
      splitAxis: e.target.value,
    })
  }

  render() {
    const { mode, editEntity, editAction, selectedItems, splitLineCoordinates } = this.state;
    const applyHiddenClassName = (entityName) => mode === 'edit' && editEntity !== entityName ? 'noDisplay' : '';

    const tableClassNames = applyHiddenClassName('table');
    const tableRowClassNames = mode === 'view' ? 'noDisplay' : applyHiddenClassName('row');
    const tableColumnClassNames = mode === 'view' ? 'noDisplay' : applyHiddenClassName('column');
    const tableCellClassNames = applyHiddenClassName('cell');
    const showSplitAxisDropDown = (mode === 'edit')
      && (editAction === 'split' || editAction === 'split')
      && (editEntity === 'table' || editEntity === 'cell')

    const entityCoordinatesList = [
      {
        coordinates: tableCords,
        className: tableClassNames,
        type: 'table',
      },
      {
        coordinates: tableRowCords,
        type: 'row',
        className: tableRowClassNames,

      },
      {
        coordinates: tableColCords,
        type: 'col',
        className: tableColumnClassNames,
      },
      {
        coordinates: tableCellCords,
        type: 'cell',
        className: tableCellClassNames,
      },
    ];

    const tableFigure = entityCoordinatesList.map(entityCoordinates => drawRectangles(
      entityCoordinates.coordinates,
      entityCoordinates.className,
      selectedItems,
      this.handleClick,
      this.handleMouseMove,
      this.handleMouseOut,
    ));

    return (
      <div className="App">
        <header className="App-header">
          <div className="modesListContainer">

            <div className="modeContainer">
              <label htmlFor="modeSelect">Mode: </label>
              <select
                id="modeSelect"
                value={this.state.mode}
                onChange={ this.selectMode }
              >
                <option value="view">view</option>
                <option value="edit">edit</option>
              </select>
            </div>

            <div className="modeContainer">
              <label htmlFor="editEntitySelect">Editing entity: </label>
              <select
                id="editEntitySelect"
                value={this.state.editEntity}
                onChange={this.selectEditEntity}
              >
                <option value="cell">cell</option>
                <option value="column">column</option>
                <option value="row">row</option>
                <option value="table">table</option>
              </select>
            </div>

            <div className="modeContainer">
              <label htmlFor="editEntitySelect">Editing Action: </label>
              <select
                id="editActionSelect"
                value={this.state.editAction}
                onChange={ this.selectEditAction }
              >
                <option value="merge">Merge</option>
                <option value="delete">Delete</option>
                <option value="split">Split</option>
              </select>
            </div>

            {
              showSplitAxisDropDown &&
              <div className="modeContainer">
              <label htmlFor="splitAxisSelect">Split Axis: </label>
              <select
                id="splitAxisSelect"
                value={this.state.splitAxis}
                onChange={ this.selectSplitAxis }
              >
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </div>
            }
          </div>
        </header>
        <div className="App-content">
          <svg ref={r => this.svgRef = r}>
            {tableFigure}
            {splitLineCoordinates && drawSplitLine(splitLineCoordinates)}
          </svg>
        </div>
      </div>
    );
  }
}

export default App;
