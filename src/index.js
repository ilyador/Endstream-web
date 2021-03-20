import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'react-jss'
import App from './components/App'
import 'modern-css-reset'
import * as serviceWorker from './helpers/serviceWorker'

const theme = {
  colorPrimary: '#12141a',
  colorBackground: '#1d2026',
  textColor: '#fff'
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
