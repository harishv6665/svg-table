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
  x, y, width, height, fill, stroke, className, onClick
}) => (
  <rect
    x={x}
    y={y}
    width={width}
    height={height}
    // fill={fill}
    fill="transparent"
    stroke={stroke}
    className={className}
    onClick={onClick}
    // onClick={ () => console.log(x, y)}
  />
)

const drawRectangles = (rectangles, customClassName, onClick) => rectangles
  .map((data) => {
    const {
      x, y, width, height, fill, stroke, className,
    } = data;
    return (
      <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      className={classNames(customClassName, className)}
      onClick={e => {onClick(e, data);}}
    />
    )
  });

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'view', // view | edit,
      editEntity: 'cell', // 'cell' | 'column' | 'row' | 'table'
      editAction: 'merge', // 'merge' | 'delete'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, item) {
    if (this.state.mode !== 'view') {
      e.stopPropagation();
      console.log('item ', item.id, ' clicked of type: ', item.type, ' for action: ', this.state.editAction)
      alert('item '+ item.id+ ' clicked of type: '+ item.type+ ' for action: '+ this.state.editAction)
    } else {
      // highlightTableData();
    }
  }

  render() {
    const { mode, editEntity } = this.state;
    const applyHiddenClassName = (entityName) => mode === 'edit' && editEntity !== entityName ? 'noDisplay' : '';

    const tableClassNames = applyHiddenClassName('table');
    const tableRowClassNames = mode === 'view' ? 'noDisplay' : applyHiddenClassName('row');
    const tableColumnClassNames = mode === 'view' ? 'noDisplay' : applyHiddenClassName('column');
    const tableCellClassNames = applyHiddenClassName('cell');

    return (
      <div className="App">
        <header className="App-header">
          <div className="modesListContainer">
            <div className="modeContainer">
              <label htmlFor="modeSelect">Mode: </label>
              <select
                id="modeSelect"
                value={this.state.mode}
                onChange={e => this.setState({mode: e.target.value})}
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
                onChange={e => this.setState({ editEntity: e.target.value })}
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
                onChange={e => this.setState({ editAction: e.target.value })}
              >
                <option value="merge">Merge</option>
                <option value="delete">Delete</option>
              </select>
            </div>
          </div>
        </header>
        <div className="App-content">
          <svg>
            {drawRectangles(tableCords, tableClassNames, this.handleClick)}
            {drawRectangles(tableRowCords, tableRowClassNames, this.handleClick)}
            {drawRectangles(tableColCords, tableColumnClassNames, this.handleClick)}
            {drawRectangles(tableCellCords, tableCellClassNames, this.handleClick)}
          </svg>
        </div>
      </div>
    );
  }
}

export default App;
