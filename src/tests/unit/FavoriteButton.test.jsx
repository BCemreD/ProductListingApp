import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteButton from '../../components/Product/FavoriteButton';
import { useFavoriteStore } from 'store/FavoriteStore';
import { getMockFavoriteStore, mockProducts } from '../mocks/zustandMocks';

// Mock store
jest.mock('store/FavoriteStore');

//  Global alert mock 
global.alert = jest.fn();

const product = mockProducts[0]; //Sample 'Test Laptop'

describe('FavoriteButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear first
  });

  test('adds product to favorite if not already in list', () => {
    const addFavorite = jest.fn();

    useFavoriteStore.mockImplementation((selector) =>
      selector(
        getMockFavoriteStore({
          isFavorite: () => false,
          addFavorite,
        })
      )
    );

    render(<FavoriteButton product={product} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(addFavorite).toHaveBeenCalledWith(product);
  });

  test('does not add product if already in favorite', () => {
    useFavoriteStore.mockImplementation((selector) =>
      selector(
        getMockFavoriteStore({
          isFavorite: () => true,
        })
      )
    );

    render(<FavoriteButton product={product} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(global.alert).toHaveBeenCalledWith(`${product.name} already exists.`);
  });

  /* test('deliberately fails to show how a test failure looks', () => {
    const addFavorite = jest.fn();
    const isFavorite = jest.fn(() => true);

    useFavoriteStore.mockImplementation((selector) =>
      selector({
        addFavorites: addFavorite,
        isFavorite,
      })
    );

    render(<FavoriteButton product={product} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Fail test case
    expect(addFavorite).toHaveBeenCalledWith(product); 
  }); */
});