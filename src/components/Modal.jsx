import { forwardRef, useRef } from "react";
import Button from "./Button";
import Input from "./Input";
import toast from "react-hot-toast";

/**
 * A reusable Select dropdown component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<string>} [props.options=[]] - Array of option values to display in the dropdown.
 * @param {string} [props.className] - Additional CSS classes to apply to the select element.
 * @param {...Object} rest - Additional props spread to the select element.
 * @returns {JSX.Element} The rendered select dropdown.
 */
const Select = forwardRef(({ options = [], className, ...rest }, ref) => {

    return (
        <select
            ref={ref}
            className={`form-select form-select-lg border-0 rounded-3 ${className}`}
            {...rest}
        >

            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}

        </select>
    );
});

/**
 * Modal component for creating a new Todo item.
 *
 * Renders a modal dialog with input fields for the todo description and category,
 * and provides buttons to submit or cancel the creation process.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.setIsOpen - Function to control the modal's open/close state.
 * @returns {JSX.Element} The rendered modal component.
 */
export default function Modal({ setIsOpen, createNewTodo }) {
    const inputRef = useRef();
    const priorityRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        const task = inputRef.current.value.trim();
        const priority = priorityRef.current.value;

        if (task) {
            createNewTodo(task, priority);
            setIsOpen();
        } else {
            toast.error('Task is required 💀');
        }

        inputRef.current.value = '';
        priorityRef.current.value = 'Important'
    }

    return (
        <div className="modal fade show d-block custom-modal" tabIndex="-1" aria-modal="true" role="dialog" aria-labelledby="addTodoModalLabel">
            <div className="modal-dialog modal-dialog-centered modal-md">
                <form className="modal-content shadow-lg" onSubmit={handleSubmit}>
                    {/* Modal Header */}
                    <div className="modal-header bg-primary text-white">

                        <h5 className="modal-title d-flex align-items-center" id="addTodoModalLabel">
                            <i className="fas fa-tasks me-2"></i>
                            Create Todo
                        </h5>

                        <Button
                            className="btn-close btn-close-white"
                            data-mdb-ripple-init
                            data-mdb-dismiss="modal"
                            aria-label="Close modal"
                            onClick={() => setIsOpen()}
                        >
                        </Button>

                    </div>

                    {/* Modal Body */}
                    <div className="modal-body p-4">
                        <div className="container-fluid px-0">
                            {/* Todo Input Section */}
                            <div className="mb-4">
                                <label htmlFor="todoInput" className="form-label fw-semibold text-muted mb-2">
                                    <i className="fas fa-edit me-1"></i>
                                    Todo Description
                                </label>
                                <div>
                                    <Input className="form-control form-control-lg border-0  rounded-3"
                                        placeholder="What needs to be done?" ref={inputRef} />

                                    <div id="todoInputHelp" className="form-text">
                                        Describe your task in detail to stay organized
                                    </div>
                                </div>
                            </div>

                            {/* Category Section */}
                            <div className="mb-4">
                                <label htmlFor="category" className="form-label fw-semibold text-muted mb-2">
                                    <i className="fas fa-tag me-1"></i>
                                    Category
                                </label>
                                <div>

                                    <Select options={['Important', 'Essential', 'Crucial']} id="category" aria-describedby="categoryHelp" ref={priorityRef} />

                                    <div id="categoryHelp" className="form-text">
                                        Organize your todos by category
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="modal-footer">
                        <div className="d-flex justify-content-between align-items-center">

                            <div className="d-flex gap-2">

                                <Button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    data-mdb-ripple-init
                                    data-mdb-dismiss="modal"
                                    onClick={() => setIsOpen()}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    className="btn btn-primary"
                                    data-mdb-ripple-init
                                >
                                    Create Todo
                                </Button>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}