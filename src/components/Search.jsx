import { FiSearch, FiX } from "react-icons/fi";
import "../styles/components/Search.css";

export default function Search({ searchTerm, onSearchChange }) {
  return (
    <div className="search-form-home">
      <div className="search-input-wrapper-home">
        <FiSearch className="search-icon-home" />
        <input
          type="text"
          placeholder="Search visible items..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input-home"
        />
        {searchTerm && (
          <button
            className="search-clear-btn"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
      </div>
    </div>
  );
}
