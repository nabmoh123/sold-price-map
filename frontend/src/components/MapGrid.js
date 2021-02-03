import React from 'react';
import PropTypes from 'prop-types';
import './MapGrid.css';

import MapGridRow from './MapGridRow';

export default function MapGrid(props) {

  const gridRows = props.price2DArray.map((priceRow, index) => {
    return <MapGridRow priceRow={priceRow} rowNumber={index} key={index} />
  });

  return (
      <table className="grid">
        <tbody>
          {gridRows}
        </tbody>
      </table>
  )
}

MapGrid.propTypes = {
  price2DArray: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number).isRequired,
  ),
};