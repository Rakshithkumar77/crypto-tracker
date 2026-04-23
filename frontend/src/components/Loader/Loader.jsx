import './Loader.css';

export default function Loader({ fullscreen = false, size = 'md' }) {
  if (fullscreen) {
    return (
      <div className="loader-fullscreen">
        <div className={`spinner spinner-${size}`} />
        <p className="loader-text">Loading…</p>
      </div>
    );
  }
  return (
    <div className="loader-inline">
      <div className={`spinner spinner-${size}`} />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="skeleton" style={{ height: 40, width: '60%' }} />
      <div className="skeleton" style={{ height: 24, width: '80%' }} />
      <div className="skeleton" style={{ height: 20, width: '40%' }} />
      <div className="skeleton" style={{ height: 16, width: '100%' }} />
    </div>
  );
}
