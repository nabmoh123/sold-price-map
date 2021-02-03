import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { addPoint } from '../utils/api';
import './NewPointForm.css';

export default function NewPointForm(props) {
  const [xTextFieldValue, setXTextFieldValue] = useState('x');
  const [yTextFieldValue, setYTextFieldValue] = useState('y');
  const [priceTextFieldValue, setPriceTextFieldValue] = useState('price');
  const [errorText, setErrorText] = useState('');

  function onFormSubmit(event) {
    event.preventDefault();

    // Clear the error text once submitting the form
    setErrorText('');

    addPoint(xTextFieldValue, yTextFieldValue, priceTextFieldValue)
        .then(() => {
            const newPrice2DArray = [...props.price2DArray];
            newPrice2DArray[xTextFieldValue][yTextFieldValue] = priceTextFieldValue;

            props.setPrice2DArray(newPrice2DArray)
          })
        .catch(err => {
          console.log(err);
          if (err.response.status === 400) {
              setErrorText(`Error: ${err.response.data}`);
            }
        });
  }

  function onTextFieldFocus(event) {
    event.target.select();
  }

  return (
      <form onSubmit={onFormSubmit}>
        <p>Enter a new point:</p>
        <input type="text" name="x" value={xTextFieldValue} onFocus={onTextFieldFocus} onChange={(event) => setXTextFieldValue(event.target.value)} />
        <input type="text" name="y" value={yTextFieldValue} onFocus={onTextFieldFocus} onChange={(event) => setYTextFieldValue(event.target.value)} />
        <input type="text" name="price" value={priceTextFieldValue} onFocus={onTextFieldFocus} onChange={(event) => setPriceTextFieldValue(event.target.value)} />
        <input type="submit" />
        <div className="error-text">{errorText}</div>
      </form>
  )
}

NewPointForm.propTypes = {
  price2DArray: PropTypes.arrayOf(
      PropTypes.array.isRequired
  ).isRequired,
  setPrice2DArray: PropTypes.func.isRequired,
};