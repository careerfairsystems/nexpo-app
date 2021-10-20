import * as React from 'react';
import renderer from 'react-test-renderer';

import { DefaultText } from '../StyledText';

it(`renders correctly`, () => {
  const tree = renderer.create(<DefaultText>Snapshot test!</DefaultText>).toJSON();

  expect(tree).toMatchSnapshot();
});
