import { useState } from 'react';
import './Pagination.css';

export default function Pagination({ page, totalPages, onPageChange }) {
  const [isThrottled, setIsThrottled] = useState(false);
  const maxButtons = 5;
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, page - half);
  let end   = Math.min(totalPages, start + maxButtons - 1);
  if (end - start < maxButtons - 1) start = Math.max(1, end - maxButtons + 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const handlePageChange = (p) => {
    if (isThrottled || p === page) return;
    setIsThrottled(true);
    onPageChange(p);
    setTimeout(() => setIsThrottled(false), 1000); // 1-second throttle
  };

  return (
    <div className="pagination">
      <button
        className="page-btn"
        disabled={page === 1 || isThrottled}
        onClick={() => handlePageChange(1)}
        title="First page"
      >«</button>

      <button
        className="page-btn"
        disabled={page === 1 || isThrottled}
        onClick={() => handlePageChange(page - 1)}
      >‹</button>

      {pages.map((p) => (
        <button
          key={p}
          className={`page-btn ${p === page ? 'active' : ''}`}
          disabled={isThrottled}
          onClick={() => handlePageChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="page-btn"
        disabled={page === totalPages || isThrottled}
        onClick={() => handlePageChange(page + 1)}
      >›</button>

      <button
        className="page-btn"
        disabled={page === totalPages || isThrottled}
        onClick={() => handlePageChange(totalPages)}
        title="Last page"
      >»</button>
    </div>
  );
}
