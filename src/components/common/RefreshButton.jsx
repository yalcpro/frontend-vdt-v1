import { FaSyncAlt } from 'react-icons/fa'

export default function RefreshButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'var(--accent)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow)',
        zIndex: 1000,
        fontSize: '1.3rem'
      }}
    >
      <FaSyncAlt />
    </button>
  )
}