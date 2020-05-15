import React from 'react';
import { shallow } from 'enzyme';
import SignUp from './SignUp.js';

test('renders signup correctly', () => {
  const wrapper = shallow(<SignUp />);
  expect(wrapper).toMatchSnapshot();
});