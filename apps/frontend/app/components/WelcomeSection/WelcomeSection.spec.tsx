import { render } from '@testing-library/react';

import WelcomeSection from './WelcomeSection';

describe('WelcomeSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WelcomeSection />);
    expect(baseElement).toBeTruthy();
  });
});
