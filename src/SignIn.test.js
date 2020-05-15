import React from 'react';
import { shallow } from 'enzyme';
import SignIn from './SignIn.js';

test('renders signin correctly', () => {
  const wrapper = shallow(<SignIn />);
  expect(wrapper).toMatchSnapshot();
});