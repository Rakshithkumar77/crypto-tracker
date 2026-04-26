import { useState, useEffect, useCallback, useRef } from 'react';
import { getMarkets, searchCoins } from '../services/crypto.service';

export const useCoins = (options = {}) => {
  const { initialPage = 1, perPage = 20, currency = 'usd' } = options;

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [totalPages] = useState(50);
  const abortRef = useRef(null);

  const fetchMarkets = useCallback(async (p = page) => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const res = await getMarkets({ currency, page: p, perPage });

      // ✅ CORRECT FOR YOUR BACKEND
      const coinsData = res?.data?.data?.coins;

      if (Array.isArray(coinsData)) {
        setCoins(coinsData);
      } else {
        setCoins([]);
      }

    } catch (err) {
      if (err.name !== 'CanceledError') {
        setError(err.message || 'Failed to fetch coins');
        setCoins([]);
      }
    } finally {
      setLoading(false);
    }
  }, [currency, page, perPage]);

  useEffect(() => {
    fetchMarkets(page);
  }, [page, currency]);

  const goToPage = (p) => setPage(p);
  const refresh = () => fetchMarkets(page);

  return { coins, loading, error, page, totalPages, goToPage, refresh };
};



// 🔍 SEARCH HOOK
export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setSearching(true);

      try {
        const res = await searchCoins(query);

        // ✅ FIX FOR YOUR BACKEND (if same structure)
        setResults(res?.data?.data?.results || []);

      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }

    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  return { query, setQuery, results, searching };
};