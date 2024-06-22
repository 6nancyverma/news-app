import React from "react";

interface SearchFormProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  suggestions: string[];
  handleSearch: (e: React.FormEvent) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchTerm,
  setSearchTerm,
  suggestions,
  handleSearch,
}) => {
  return (
    <form className="d-flex search-form" onSubmit={handleSearch} role="search">
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
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion: string, index: number) => (
            <li key={index} onClick={() => setSearchTerm(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchForm;
