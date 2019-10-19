import React from 'react';
import ReactDOM from 'react-dom';
import SlideFilters from './SlideFilters';
import renderer from 'react-test-renderer';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';

const config = {maxVideosToLoad:24};
let store;
const onChanges = (fn) => {
  if (fn) {
    store = fn;
  }

  store();
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SlideFilters config={config} onChanges={onChanges}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('handleInputChange function', () => {
  const mockHandleInputCountry = jest.fn();
  const component = renderer.create(
    <Downshift onChange={mockHandleInputCountry} />
  );
  const instance = component.getInstance();

  instance.props.onChange();

  expect(mockHandleInputCountry.mock.calls.length).toBe(1);
});
it('handleChange function', () => {
  const mockHandleChangeCategory = jest.fn();
  const component = renderer.create(
    <TextField onChange={mockHandleChangeCategory} />
  );
  const instance = component.getInstance();

  instance.props.onChange();

  expect(mockHandleChangeCategory.mock.calls.length).toBe(1);
});

