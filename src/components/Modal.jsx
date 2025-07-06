import { forwardRef, useRef } from "react";
import Button from "./Button";
import Input from "./Input";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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
const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
};

const modal = {
    hidden: { opacity: 0, scale: 0.9, y: "-30%" },
    visible: { opacity: 1, scale: 1, y: "0%" },
    exit: { opacity: 0, scale: 0.9, y: "-30%" }
};

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
        priorityRef.current.value = 'Important';
    }

    return (
        <motion.div
            className="modal fade show d-block custom-modal"
            tabIndex="-1"
            aria-modal="true"
            role="dialog"
            aria-labelledby="addTodoModalLabel"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.div
                className="modal-dialog modal-md"
                variants={modal}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                <form className="modal-content shadow-lg" onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title d-flex align-items-center" id="addTodoModalLabel">
                            <i className="fas fa-tasks me-2"></i> Create Todo
                        </h5>
                        <Button className="btn-close btn-close-white" onClick={() => setIsOpen()} />
                    </div>

                    {/* Body */}
                    <div className="modal-body p-4">
                        <div className="container-fluid px-0">
                            {/* Task Input */}
                            <div className="mb-4">
                                <label htmlFor="todoInput" className="form-label fw-semibold text-muted mb-2">
                                    <i className="fas fa-edit me-1"></i> Todo Description
                                </label>
                                <Input
                                    className="form-control form-control-lg border-0 rounded-3"
                                    placeholder="What needs to be done?"
                                    ref={inputRef}
                                    autoFocus
                                />
                                <div className="form-text">Describe your task in detail to stay organized</div>
                            </div>

                            {/* Priority Select */}
                            <div className="mb-4">
                                <label htmlFor="category" className="form-label fw-semibold text-muted mb-2">
                                    <i className="fas fa-tag me-1"></i> Category
                                </label>
                                <Select
                                    options={['Important', 'Essential', 'Crucial']}
                                    id="category"
                                    ref={priorityRef}
                                />
                                <div className="form-text">Organize your todos by category</div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="modal-footer">
                        <div className="d-flex gap-2">
                            <Button className="btn btn-outline-secondary" onClick={() => setIsOpen()}>
                                Cancel
                            </Button>
                            <Button type="submit" className="btn btn-primary">
                                Create Todo
                            </Button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}