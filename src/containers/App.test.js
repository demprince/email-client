import React from 'react';

import { shallow, mount } from 'enzyme';
import App from './App';


describe('App', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<App debug />);
    expect(component).toMatchSnapshot();
  });
});

it('App renders without crashing', () => {
  shallow(<App />);
});

// Fetches json with results


