/**
 * Reusable button component.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.type="button"] - The button type attribute.
 * @param {string} [props.className=""] - Additional CSS classes for the button.
 * @param {React.ReactNode} props.children - Button content.
 * @param {...Object} rest - Additional props passed to the button element.
 * @returns {JSX.Element} The rendered button element.
 */
export default function Button({ type = 'button', className = '', children, ...rest }) {
    return (
        <button
            type={type}
            className={className}
            {...rest}
        >
            {children}
        </button>
    );
}