import { FiChevronDown } from "react-icons/fi";
import "../styles/components/Sort.css";

export default function Sort({ showSort, onToggle, sortOrder, onSortSelect }) {
  return (
    <div className="dropdown-wrapper">
      <button
        className={`filter-toggle-btn ${showSort ? "active" : ""}`}
        onClick={onToggle}
      >
        <span>
          {sortOrder === "asc"
            ? "Price: Low to High"
            : sortOrder === "desc"
            ? "Price: High to Low"
            : "Sort"}
        </span>
        <FiChevronDown />
      </button>

      {showSort && (
        <div className="dropdown-menu">
          <button
            className={`dropdown-item ${!sortOrder ? "active" : ""}`}
            onClick={() => onSortSelect(null)}
          >
            Default
          </button>
          <button
            className={`dropdown-item ${sortOrder === "asc" ? "active" : ""}`}
            onClick={() => onSortSelect("asc")}
          >
            Price: Low to High
          </button>
          <button
            className={`dropdown-item ${sortOrder === "desc" ? "active" : ""}`}
            onClick={() => onSortSelect("desc")}
          >
            Price: High to Low
          </button>
        </div>
      )}
    </div>
  );
}
