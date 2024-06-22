import React from "react";
import { NavLink } from "react-router-dom";
import CountryDropdown from "../CountryDropdown";

interface NavLinksProps {
  handleCountryChange: (countryCode: string) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ handleCountryChange }) => {
  return (
    <ul className="nav nav-underline">
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/"
          end
        >
          Home
        </NavLink>
      </li>
      <CountryDropdown handleCountryChange={handleCountryChange} />
      <li className="d-flex justify-content-center align-items-center">|</li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/business"
        >
          Business
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/technology"
        >
          Technology
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/sports"
        >
          Sports
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/entertainment"
        >
          Entertainment
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/science"
        >
          Science
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          to="/health"
        >
          Health
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
