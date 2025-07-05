/**
 * A reusable container component that wraps its children in a div with a customizable class name.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className="container"] - The CSS class name for the container div.
 * @param {React.ReactNode} props.children - The content to be rendered inside the container.
 * @returns {JSX.Element} The rendered container component.
 */
export default function Container({ className = 'container', children }) {
    return (
        <div className={className}>{children}</div>
    );
}