import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/main/routes/router'
import { makeServer } from './fakeServer/server'

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' })
}
ReactDOM.render(
  <Router />,
  document.getElementById('main')
)
