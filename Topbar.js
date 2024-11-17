import React, { useState } from 'react';
import './TopBar.css';

function Topbar({ onSearch, onSort }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Call the parent's search handler
  };

  const handleSort = (criteria) => {
    onSort(criteria); // Call the parent's sort handler
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container-fluid">
        {/* Title */}
        <div className="d-flex justify-content-center w-100">
          <a className="navbar-brand " href="#" style={{ fontSize: '25px' }}>
            Task Manager
          </a>
        </div>

        {/* Search Bar and Icon */}
        <div className="d-flex align-items-center ms-auto">
          {isSearchVisible ? (
            <>
              {/* Search Bar */}
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={handleSearch}
                style={{ maxWidth: '300px' }}
              />
              {/* Close Search Icon */}
              <button
                className="btn btn-outline-light"
                onClick={toggleSearchBar}
              >
                <i className="bi bi-x"></i>
              </button>
            </>
          ) : (
            /* Search Icon */
            <button
              className="btn btn-outline-light"
              onClick={toggleSearchBar}
            >
              <i className="bi bi-search"></i>
            </button>
          )}

          {/* Sort Dropdown */}
          <div className="dropdown ms-3">
            <button
              className="btn btn-outline-light dropdown-toggle"
              type="button"
              id="sortDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-funnel"></i> {/* Sort Icon */}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="sortDropdown">
              <li>
                <button className="dropdown-item" onClick={() => handleSort('priority')}>
                  Sort by Priority
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => handleSort('completion')}>
                  Sort by Completion
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => handleSort('title')}>
                  Sort by Title
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
