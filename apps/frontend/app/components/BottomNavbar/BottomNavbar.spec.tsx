import { render } from '@testing-library/react';

import BottomNavbar from './BottomNavbar';

describe('BottomNavbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BottomNavbar />);
    expect(baseElement).toBeTruthy();
  });
});
