import React, { useState, useCallback, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import styles from "./Search.module.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchTermRef = useRef("");
  const timerRef = useRef(null);
  const cancelTokenRef = useRef(null);

  const performSearch = useCallback(async (term) => {
    if (term.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Cancel any ongoing requests
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel("New search initiated");
    }
    cancelTokenRef.current = axios.CancelToken.source();

    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          cancelToken: cancelTokenRef.current.token,
        }
      );
      // Filter posts by title (simulating a search)
      const filteredResults = response.data.filter((post) =>
        post.title.toLowerCase().includes(term.toLowerCase())
      );

      setResults(filteredResults);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError("An error occurred while searching. Please try again.");
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((term) => performSearch(term), 300),
    [performSearch]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchTermRef.current = value;
    debouncedSearch(value);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (cancelTokenRef.current)
        cancelTokenRef.current.cancel("Component unmounted");
    };
  }, []);

  function debounce(func, delay) {
    return (...args) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => func(...args), delay);
    };
  }

  const handleOnClickItem = (post) => {
    console.log(post);
    setResults([]);
    setSearchTerm("");
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputWrapper}>
        <FaSearch size={18} color="#fff" />
        <input
          onChange={handleInputChange}
          value={searchTerm}
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
        />
      </div>
      {isLoading && <div className={styles.loader}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {results.length > 0 && (
        <ul className={styles.resultsList}>
          {results.map((post) => (
            <li
              onClick={() => handleOnClickItem(post)}
              key={post.id}
              className={styles.resultItem}
            >
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
