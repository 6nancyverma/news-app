import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { FaCompass } from "react-icons/fa";
import NavLinks from "../NavLink";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string>("In");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      navigate(`/search?q=${encodeURIComponent(trimmedSearchTerm)}`);
      setSearchTerm("");
    }
    if (selectedCountry) {
      console.log("selectedCountry", selectedCountry);
    }
  };

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    navigate(`/${countryCode}`);
  };

  return (
    <main className="nav-container">
      <nav className="navbar navbar-expand-lg bg-white d-flex flex-column  p-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand" to="#">
            <h1>
              <FaCompass />
            </h1>
          </Link>

          <form
            className="d-flex search-form"
            onSubmit={handleSearch}
            role="search"
          >
            <input
              className="form-control me-2 search-input"
              type="search"
              placeholder="Search by location,topic & sources.."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="d-flex justify-content-start align-items-start">
          <NavLinks handleCountryChange={handleCountryChange} />
        </div>
      </nav>
    </main>
  );
}

export default Navbar;
