import React from "react";
import { Link } from "react-router-dom";

interface CountryDropdownProps {
  handleCountryChange: (countryCode: string) => void;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({
  handleCountryChange,
}) => {
  return (
    <li className="nav-item dropdown">
      <Link
        className="nav-link dropdown-toggle"
        to="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Choose Country
      </Link>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleCountryChange("In")}
          >
            India
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleCountryChange("us")}
          >
            United States
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleCountryChange("gb")}
          >
            United Kingdom
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleCountryChange("ca")}
          >
            Canada
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleCountryChange("au")}
          >
            Australia
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={() => handleCountryChange("de")}
          >
            Germany
          </button>
        </li>
      </ul>
    </li>
  );
};

export default CountryDropdown;
