import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Button from '@material-ui/core/Button';
import renderer from 'react-test-renderer';
//import SettingsIcon from '@material-ui/icons/Settings';
const config = {};
let store;
const onChanges = (fn) => {
  if (fn) {
    store = fn;
  }

  store();
};
let titleStore = '';
const setTitle = (title) => {
  if (title) {
    titleStore = title;
  }
  return titleStore;
}; 

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header config={config} onChanges={onChanges} setTitle={setTitle} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('check if the toogleDrawer function call', () => {
  const mockTogglefn = jest.fn();
  const component = renderer.create(
    <Button onClick={mockTogglefn} label="this is test label" />
  );
  const instance = component.getInstance();

  instance.props.onClick();

  expect(mockTogglefn.mock.calls.length).toBe(1);
});
