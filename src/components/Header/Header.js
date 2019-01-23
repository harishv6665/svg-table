import React from 'react';

const Header = ({ modeValue, onModeChange, editValue, onEditChange, actionValue, onActionChange, showAxisInput, axisValue, onAxisChange }) => (
  <header className="App-header">
    <div className="modesListContainer">

      <div className="modeContainer">
        <label htmlFor="modeSelect">Mode: </label>
        <select
          id="modeSelect"
          value={modeValue}
          onChange={onModeChange}
        >
          <option value="view">view</option>
          <option value="edit">edit</option>
        </select>
      </div>

      <div className="modeContainer">
        <label htmlFor="editEntitySelect">Editing entity: </label>
        <select
          id="editEntitySelect"
          value={editValue}
          onChange={onEditChange}
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
          value={actionValue}
          onChange={onActionChange}
        >
          <option value="merge">Merge</option>
          <option value="delete">Delete</option>
          <option value="split">Split</option>
        </select>
      </div>

      {showAxisInput &&
      <div className="modeContainer">
      <label htmlFor="splitAxisSelect">Split Axis: </label>
      <select
      id="splitAxisSelect"
      value={axisValue}
      onChange={onAxisChange}
      >
      <option value="horizontal">Horizontal</option>
      <option value="vertical">Vertical</option>
      </select>
      </div>}
    </div>
  </header>
);

export default Header;
