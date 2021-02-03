import React from 'react';
import PropTypes from 'prop-types';
import ReactHover, {Hover, Trigger} from "react-hover";
import HoverComponent from './HoverComponent';
import determinCellColour from "../utils/determineCellColour";
import hoverOptions from '../utils/hoverOptions';
import './MapGridCell.css';

export default function MapGridCell(props) {
  let cellColour = '#e2e2e2';

  // Only add hover dialog for cells which have a price
  if (props.price > 0) {
    cellColour = '#'+determinCellColour(props.price);
    return (
        <ReactHover options={hoverOptions}>
          <Trigger type={'trigger'}>
            <div className="grid-cell" style={{backgroundColor: cellColour}}/>
          </Trigger>
          <Hover>
            <HoverComponent x={props.rowNumber} y={props.colNumber} price={props.price}/>
          </Hover>
        </ReactHover>
    )
  }
  // Otherwise have a plain empty cell
  return <td className="grid-cell" style={{backgroundColor: cellColour}}/>
}

MapGridCell.propTypes = {
  price: PropTypes.number.isRequired,
  rowNumber: PropTypes.number.isRequired,
  colNumber: PropTypes.number.isRequired,
};