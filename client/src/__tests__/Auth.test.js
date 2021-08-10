import React from 'react';
import { render, screen} from '@testing-library/react';
import App from '../containers/App';
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom';
import Root from '../containers/Root';


test('Signup and Login work', async () => {
    const history = createMemoryHistory()
    history.push('/signin')
    render(<Root><Router history={history}><App /></Router></Root>)
    userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'John')
    userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'Johan')
    userEvent.click(screen.getByRole('button', { name: /log in/i }))
    // expect(screen.getByText(/Invalid/i)).toBeInTheDocument()
})

