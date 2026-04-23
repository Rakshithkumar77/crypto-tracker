import './Pagination.css';

export default function Pagination({ page, totalPages, onPageChange }) {
  const maxButtons = 5;
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, page - half);
  let end   = Math.min(totalPages, start + maxButtons - 1);
  if (end - start < maxButtons - 1) start = Math.max(1, end - maxButtons + 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="pagination">
      <button
        className="page-btn"
        disabled={page === 1}
        onClick={() => onPageChange(1)}
        title="First page"
      >«</button>

      <button
        className="page-btn"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >‹</button>

      {pages.map((p) => (
        <button
          key={p}
          className={`page-btn ${p === page ? 'active' : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="page-btn"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >›</button>

      <button
        className="page-btn"
        disabled={page === totalPages}
        onClick={() => onPageChange(totalPages)}
        title="Last page"
      >»</button>
    </div>
  );
}
