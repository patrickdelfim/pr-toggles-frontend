import { render, screen } from "@testing-library/react"
import App from "./App"
import React from "react"

describe("Test demo", () => {
  test("should render text correctly on paragraph", () => {
    render(<App />)
    const paragraph = screen.getByTestId("textApp")
    expect(paragraph).toHaveTextContent("Edit src/App.tsx and save to reload.")
    expect(1).toBe(1)
  })
})
