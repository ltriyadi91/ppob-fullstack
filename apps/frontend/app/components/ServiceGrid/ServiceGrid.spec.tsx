import { render } from '@testing-library/react';

import ServiceGrid from './ServiceGrid';

describe('ServiceGrid', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ServiceGrid />);
    expect(baseElement).toBeTruthy();
  });
});
