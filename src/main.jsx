import { render } from 'react-dom'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './styles.css'
import App from './App'
import { ThemeProvider } from './contexts/theme'

render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
