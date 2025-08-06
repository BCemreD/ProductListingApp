import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '../../components/Product/ProductCard';
import { useFavoriteStore } from 'store/FavoriteStore';
import { mockProducts, getMockFavoriteStore } from '../mocks/zustandMocks';

// Favorite store mock
jest.mock('store/FavoriteStore', () => ({
  useFavoriteStore: jest.fn(),
}));

// FavoriteButton tested separately
jest.mock('../../components/Product/FavoriteButton', () => () => (
  <div>Mocked Favorite Button</div>
));

describe('ProductCard Component', () => {
  const product = mockProducts[0]; // sample test "laptop"

  beforeEach(() => {
    useFavoriteStore.mockImplementation((selector) =>
      selector(getMockFavoriteStore())
    );
  });

  test('renders product name and price', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.price)).toBeInTheDocument();
  });

  test('renders product image with correct alt text', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByAltText(product.imageAlt)).toBeInTheDocument();
  });

  test('renders mocked FavoriteButton correctly', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText('Mocked Favorite Button')).toBeInTheDocument();
  });

  test('does not render missing description', () => {
    const productWithoutDescription = {
      ...product,
      name: 'Simple Product',
      description: undefined,
    };

    render(<ProductCard product={productWithoutDescription} />);
    const description = screen.queryByText(/This is a description/i);
    expect(description).toBeNull();
  });
});