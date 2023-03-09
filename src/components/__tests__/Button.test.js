import { render, screen } from '@testing-library/react';
import Button from '../Button';

test('renders learn react link', () => {
  render(<Button />);
  const linkElement = screen.getByText(/Button/i);
  expect(linkElement).toBeInTheDocument();
});
