import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import './index.css'
import Root from './containers/Root'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Root>
  , document.getElementById('root')
)
