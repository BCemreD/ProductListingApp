import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import FavoriteButton from '../components/Product/FavoriteButton'
import { useFavoriteStore } from '../store/FavoriteStore'

// Mocking Zustand store
jest.mock('../store/FavoriteStore', () => ({
  useFavoriteStore: jest.fn(),
}))

const product = {
  id: 1,
  name: 'Test Product',
  imageSrc: 'test.jpg',
  imageAlt: 'Test alt',
  price: '$999.00',
  category: 'Test',
}

test('adds product to favorite if not already in list', () => {
  const addFavorite = jest.fn()
  const isFavorite = jest.fn(() => false)

  useFavoriteStore.mockImplementation((selector) =>
    selector({ addFavorite, isFavorite })
  )

  render(<FavoriteButton product={product} />)

  const button = screen.getByRole('button')
  fireEvent.click(button)

  expect(addFavorite).toHaveBeenCalledWith(product)
})

test('does not add product if already in favorite', () => {
  const addFavorite = jest.fn()
  const isFavorite = jest.fn(() => true)

  global.alert = jest.fn()

  useFavoriteStore.mockImplementation((selector) =>
    selector({ addFavorite, isFavorite })
  )

  render(<FavoriteButton product={product} />)

  const button = screen.getByRole('button')
  fireEvent.click(button)

  expect(global.alert).toHaveBeenCalledWith('Test Product already exists.')
})
