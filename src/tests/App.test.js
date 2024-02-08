import { render, screen } from '@testing-library/react';
import App from '../App';
test('renders Landing Page', () => {
  const component = render(<App />);
  const landingPageApp = screen.getByTestId('landing-page');

  expect(landingPageApp).toBeInTheDocument();
  expect(component).toMatchSnapshot();
});
