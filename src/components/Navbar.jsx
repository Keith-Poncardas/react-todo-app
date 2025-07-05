/**
 * Navbar component that displays a navigation bar with a logo and title.
 *
 * @param {Object} props - Component props.
 * @param {string} props.logoUrl - URL of the logo image to display.
 * @param {string} [props.title="React Todo"] - Title to display next to the logo.
 * @returns {JSX.Element} The rendered Navbar component.
 */
import Container from "./Container";

export default function Navbar({ logoUrl, title = 'React Todo' }) {
    return (
        <nav className="navbar bg-body-tertiary">

            <Container>
                <span className="navbar-brand">
                    <img src={logoUrl} className="me-2" height="24" alt={`${title}'s logo`} loading="lazy" />
                    <small>{title}</small>
                </span>
            </Container>

        </nav>
    );
}