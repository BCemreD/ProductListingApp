import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductPage from '../../pages/ProductPage';
import { useProductStore } from '../../store/useProductStore';
import userEvent from '@testing-library/user-event';
import { getMockProductStore, mockProducts } from '../mocks/zustandMocks';

// Zustand store mock
jest.mock('../../store/useProductStore', () => ({
  useProductStore: jest.fn(),
}));

describe('ProductPage Integration Test', () => {
  beforeEach(() => {
    useProductStore.mockImplementation((selector) =>
      selector(getMockProductStore())
    );
  });

  test('filters products based on search input', async () => {
    render(<ProductPage />);

    // First all products must be shown
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Webcam')).toBeInTheDocument();

    // Write "Laptop" searchbar
    const searchInput = screen.getByPlaceholderText('Search products...');
    await userEvent.type(searchInput, 'Laptop');

    // Show only laptop
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.queryByText('Webcam')).not.toBeInTheDocument();
  });
});