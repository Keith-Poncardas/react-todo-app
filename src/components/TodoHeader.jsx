/**
 * Renders the header section for the todo list, displaying the title and count of items.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - The title to display in the header.
 * @param {number} [props.count=0] - The number of todo items.
 * @param {string} [props.className] - Additional CSS classes for the header container.
 * @returns {JSX.Element} The rendered header component.
 */
export default function TodoHeader({ title, count = 0, className = '' }) {

    return (
        <div className={`d-flex align-items-center ${className}`}>
            <i className="fas fa-list-check text-primary me-2"></i>
            <small className="text-muted fw-semibold">{title}</small>
            <span className="badge rounded-pill badge-secondary ms-2">{count}</span>
        </div>
    );
} 