import { useState, useEffect, useCallback } from 'react';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../services/watchlist.service';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const useWatchlist = () => {
  const { isAuthenticated } = useAuth();
  const [watchlist, setWatchlist]     = useState([]);
  const [loading, setLoading]         = useState(false);
  const [watchlistIds, setWatchlistIds] = useState(new Set());

  const fetchWatchlist = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await getWatchlist();
      const items = res.data.data.watchlist || [];
      setWatchlist(items);
      setWatchlistIds(new Set(items.map((i) => i.coinId)));
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => { fetchWatchlist(); }, [fetchWatchlist]);

  const toggle = useCallback(async (coin) => {
    if (!isAuthenticated) {
      toast.error('Please log in to manage your watchlist.');
      return;
    }
    const inList = watchlistIds.has(coin.id);
    try {
      if (inList) {
        await removeFromWatchlist(coin.id);
        setWatchlistIds((prev) => { const s = new Set(prev); s.delete(coin.id); return s; });
        setWatchlist((prev) => prev.filter((i) => i.coinId !== coin.id));
        toast.success(`${coin.name} removed from watchlist.`);
      } else {
        await addToWatchlist({
          coinId: coin.id,
          coinName: coin.name,
          coinSymbol: coin.symbol,
          coinImage: coin.image,
        });
        setWatchlistIds((prev) => new Set([...prev, coin.id]));
        await fetchWatchlist();
        toast.success(`${coin.name} added to watchlist!`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Watchlist update failed.');
    }
  }, [isAuthenticated, watchlistIds, fetchWatchlist]);

  const isWatched = (coinId) => watchlistIds.has(coinId);

  return { watchlist, loading, toggle, isWatched, refresh: fetchWatchlist };
};
