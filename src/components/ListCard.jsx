import Button from "./Button";
import Input from "./Input";
import useToggleState from "../hooks/useToggleState";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function ListCard({ id, task, priority, deleteTodo, editTodo, isCompleted, isMarkedComplete }) {
    const [isEditOpen, setIsEditOpen] = useToggleState();

    const taskRef = useRef();

    function handleChecked() {
        isCompleted(id, !isMarkedComplete);
    }

    function handleTaskSubmit(e) {
        e.preventDefault();

        const task = taskRef.current.value.trim();

        if (task) {
            editTodo(id, task);
            setIsEditOpen();
        } else {
            toast.error("Bro, don't leave it empty 😑");
        }

        taskRef.current.value = '';
    }

    let priorityColor;

    switch (priority) {
        case 'Crucial':
            priorityColor = 'danger';
            break;
        case 'Essential':
            priorityColor = 'warning';
            break;
        case 'Important':
            priorityColor = 'success';
            break;
        default:
            console.error('Invalid priority!');
            break;
    }

    if (isMarkedComplete) {
        priorityColor = 'secondary';
    }

    return (
        <div className={`card mb-3 border border-${priorityColor} shadow-0 bg-transparent text-white`}>
            <div className="card-body py-3 px-4">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">

                    {/* Left Section: Checkbox and Task */}
                    <div className="d-flex align-items-center flex-grow-1 gap-3">

                        {/* Checkbox */}
                        {!isEditOpen && (
                            <div className="form-check m-0">
                                <Input type="checkbox" className="form-check-input" onChange={handleChecked} checked={isMarkedComplete} />
                            </div>

                        )}

                        {/* Task or Editable Input */}
                        {isEditOpen ? (
                            <form className="d-flex flex-grow-1 align-items-center" onSubmit={handleTaskSubmit}>

                                <input
                                    className="form-control bg-transparent border-0 text-white"
                                    defaultValue={task}
                                    ref={taskRef}
                                    autoFocus
                                    style={{ outline: 'none', boxShadow: 'none' }}
                                />

                                <Button
                                    type="submit"
                                    className="btn btn-sm shadow-none ms-2"
                                    data-mdb-ripple-init
                                    aria-label="Save task"
                                >
                                    <i className="fas fa-check"></i>
                                </Button>

                            </form>
                        ) : (
                            <span
                                className={`text-break ${isMarkedComplete
                                    ? 'text-decoration-line-through text-muted'
                                    : 'text-white'}`}
                                onClick={handleChecked}
                                style={{ cursor: 'pointer' }}
                            >
                                {task}
                            </span>
                        )}
                    </div>

                    {/* Right Section: Actions */}
                    <div className="d-flex align-items-center gap-2">

                        {!isEditOpen && !isMarkedComplete && (
                            <Button
                                className="btn btn-sm btn-link text-muted p-1"
                                data-mdb-ripple-init
                                aria-label="Edit task"
                                onClick={() => setIsEditOpen()}
                            >
                                <i className="fas fa-pen fa-sm"></i>
                            </Button>
                        )}

                        <Button
                            className="btn btn-sm btn-link text-muted p-1"
                            data-mdb-ripple-init
                            aria-label="Delete task"
                            onClick={() => deleteTodo(id)}
                        >
                            <i className="fas fa-trash fa-sm"></i>
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    );
}