import React from 'react';
import PropTypes from 'prop-types';
import MapGridCell from './MapGridCell';

export default function MapGridRow(props) {
  const rowNumber = props.rowNumber;
  const priceRow = props.priceRow;

  const gridRow = priceRow.map((price, index) => {
    return <MapGridCell price={price} rowNumber={rowNumber} colNumber={index} key={index} />
  });

  return (
    <tr>
      {gridRow}
    </tr>
  );
}

MapGridRow.propTypes = {
  rowNumber: PropTypes.number.isRequired,
  priceRow: PropTypes.array.isRequired,
};