import Button from "./Button";
import Input from "./Input";
import useToggleState from "../hooks/useToggleState";

/**
 * Dropdown component that renders a list of filter options.
 *
 * @component
 * @param {Object} props
 * @param {string[]} props.links - Array of filter option strings to display in the dropdown.
 * @returns {JSX.Element} The rendered dropdown menu.
 */
function Dropdown({ links }) {
    return (
        <ul className="dropdown-menu dropdown-menu-end show custom-input-group">
            <li><span className="dropdown-item">All</span></li>
            {links.map((link) => (
                <li key={link}><span className="dropdown-item">{link}</span></li>
            ))}
        </ul>
    );
}

/**
 * InputWithDropdown is a React functional component that renders an input field with a dropdown filter button.
 * 
 * @component
 * @param {Object} props - Component props.
 * @param {string[]} [props.links=['High', 'Medium', 'Low']] - Array of dropdown filter options.
 * @returns {JSX.Element} The rendered input group with a dropdown filter.
 */
export default function InputWithDropdown({ links = [], setSearch }) {
    const [isDropdownOpen, setIsDropdownOpen] = useToggleState();

    function handleInput(e) {
        const searchTask = e.target.value;
        setSearch(searchTask);
    }

    return (
        <div className="input-group mb-3">

            <Input
                className="form-control shadow-sm rounded-start-3"
                aria-label="Search todo input"
                placeholder="Search"
                onChange={(e) => handleInput(e)}
            />

            <Button
                className="btn btn-primary dropdown-toggle rounded-end-3"
                type="button"
                data-mdb-dropdown-init
                data-mdb-ripple-init
                aria-expanded="false"
                onClick={setIsDropdownOpen}
                disabled
            >
                Filter
            </Button>

            {isDropdownOpen && (<Dropdown links={links} />)}

        </div>
    );
}