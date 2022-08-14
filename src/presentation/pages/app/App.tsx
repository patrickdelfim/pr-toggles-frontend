import React from "react"
import logo from "../../assets/logo.svg"
import Styles from "./App.module.scss"
function App() {
  return (
    <div className={Styles.appWrap}>
      <header className={Styles.header}>
        <img src={logo} className={Styles.logo} alt="logo" />
        <p data-testid="textApp">Edit src/App.tsx and save to reload.</p>
        <a
          className={Styles.link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
