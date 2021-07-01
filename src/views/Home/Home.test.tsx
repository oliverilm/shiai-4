import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import React from 'react';

import HomePage from './HomePage';

describe('<Home />', () => {
  test('it should mount', () => {
    render(<HomePage />);

    const home = screen.getByTestId('Home');

    expect(home).toBeInTheDocument();
  });
});
