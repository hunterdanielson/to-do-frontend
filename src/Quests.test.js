import React from 'react';
import { shallow } from 'enzyme';
import Quests from './Quests.js';

test('renders quests correctly', () => {
  const wrapper = shallow(<Quests />);
  expect(wrapper).toMatchSnapshot();
});