import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import React from 'react';

import NotFound from './NotFound';

describe('<NotFound />', () => {
  test('it should mount', () => {
    render(<NotFound />);

    const notFound = screen.getByTestId('NotFound');

    expect(notFound).toBeInTheDocument();
  });
});
