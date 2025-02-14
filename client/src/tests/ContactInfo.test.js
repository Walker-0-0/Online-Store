import { render, screen } from "@testing-library/react";
import ContactInfo from "../components/homeComponents/ContactInfo.js"; 
import '@testing-library/jest-dom';
test("getByText", () => {
  render(<ContactInfo />);
  expect(screen.getByText("Call Us 24x7")).toBeInTheDocument();
  expect(screen.getByText("+1 123 456 7890")).toBeInTheDocument();
  expect(screen.getByText("Headquarter")).toBeInTheDocument();
  expect(screen.getByText("Vancouver,BC")).toBeInTheDocument();
  expect(screen.getByText("Fax")).toBeInTheDocument();
  expect(screen.getByText("+1 012 345 6789")).toBeInTheDocument();
});