import React from 'react';
import PropTypes from 'prop-types';
import './HoverComponent.css';

export default function HoverComponent(props) {
  const priceWithCommas =props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
      <div className={'hover'}>
        <p>x: {props.x}</p>
        <p>y: {props.y}</p>
        <p>price: {priceWithCommas}</p>
      </div>
  )
}

HoverComponent.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};