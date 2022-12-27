import React from "react";
import SwitchButton from "../SwitchButton";
import { render,screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
test('should render correctly', () => { 
    const view = render(<SwitchButton/>);
   const headerEl= view.screen.getByTestId("header")
   expect(headerEl.texContent).toBe('switch')
 })