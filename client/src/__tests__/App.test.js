import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../containers/App';
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom';
import Root from '../containers/Root';

test('Navigation works', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /Whats new in the world/i})).toBeInTheDocument()
  userEvent.click(screen.getByRole('link', { name: /sign up/i}))
  expect(screen.getByRole('heading', { name: /Create New User/i})).toBeInTheDocument()
  userEvent.click(screen.getByRole('link', { name: /sign in/i}))
  expect(screen.getByRole('heading', { name: /welcome back/i})).toBeInTheDocument()
});

