import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { visitanteApi } from "@/api/visitante.api";
import styles from "./Search.module.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recordings, setRecordings] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const abortRef = useRef(null);
  const navigate = useNavigate();

  const performSearch = useCallback(async (term) => {
    if (term.trim().length < 3) {
      setRecordings([]);
      setAuthors([]);
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setIsLoading(true);
    try {
      const [recRes, authRes] = await Promise.all([
        visitanteApi.get(`/v1/recordings/`, {
          params: { search: term, limit: 5 },
          signal: abortRef.current.signal,
        }),
        visitanteApi.get(`/v1/authors/`, {
          params: { search: term, limit: 5 },
          signal: abortRef.current.signal,
        }),
      ]);
      setRecordings(recRes.data.results || []);
      setAuthors(authRes.data.results || []);
    } catch (err) {
      if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  function debounce(func, delay) {
    return (...args) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedSearch = useCallback(
    debounce((term) => performSearch(term), 300),
    [performSearch]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const clearAndClose = () => {
    setSearchTerm("");
    setRecordings([]);
    setAuthors([]);
  };

  const handleSelectRecording = (rec) => {
    clearAndClose();
    navigate(`/record/${rec._id}`);
  };

  const handleSelectAuthor = (author) => {
    clearAndClose();
    navigate(`/perfil/${author._id}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setRecordings([]);
        setAuthors([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const hasResults = recordings.length > 0 || authors.length > 0;

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      <div className={styles.searchInputWrapper}>
        <FaSearch size={18} color="#fff" />
        <input
          onChange={handleInputChange}
          value={searchTerm}
          type="text"
          placeholder="Buscar..."
          className={styles.searchInput}
        />
      </div>
      {isLoading && <div className={styles.loader}>Buscando...</div>}
      {hasResults && (
        <ul className={styles.resultsList}>
          {recordings.length > 0 && (
            <>
              <li className={styles.sectionHeader}>Grabaciones</li>
              {recordings.map((rec) => (
                <li
                  key={rec._id}
                  className={styles.resultItem}
                  onClick={() => handleSelectRecording(rec)}
                >
                  <span className={styles.resultTitle}>{rec.title}</span>
                  {rec.author && (
                    <span className={styles.resultSubtitle}>{rec.author}</span>
                  )}
                </li>
              ))}
            </>
          )}
          {authors.length > 0 && (
            <>
              <li className={styles.sectionHeader}>Autores</li>
              {authors.map((author) => (
                <li
                  key={author._id}
                  className={styles.resultItem}
                  onClick={() => handleSelectAuthor(author)}
                >
                  <span className={styles.resultTitle}>{author.name}</span>
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
