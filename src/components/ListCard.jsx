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
        <div className={`card mb-3 shadow-sm border-start border-4 border-${priorityColor} bg-body-tertiary`}>
            <div className="card-body py-3">
                <div className="row align-items-center gx-3">

                    {/* Checkbox */}
                    {!isEditOpen && (
                        <div className="col-auto">
                            <Input type="checkbox" className="form-check-input" onChange={handleChecked} checked={isMarkedComplete} />
                        </div>
                    )}

                    {/* Title and Actions */}
                    <div className="col d-flex justify-content-between align-items-center flex-wrap gap-3">

                        {isEditOpen ? (
                            // Full-width input when editing
                            <form className="d-flex align-items-center flex-grow-1" onSubmit={handleTaskSubmit}>
                                <Input className="form-control border-0 rounded-3" defaultValue={task} ref={taskRef} />

                                <Button
                                    type="submit"
                                    className="btn btn-sm btn-outline-success mx-2"
                                    data-mdb-ripple-init
                                    aria-label="Edit task"
                                >
                                    <i className="fas fa-save"></i>
                                </Button>
                            </form>
                        ) : (
                            // Title and badge in normal view
                            <div className="d-flex align-items-center gap-2 flex-wrap flex-grow-1">
                                <h6 className={`mb-0 fw-semibold ${isMarkedComplete ? 'text-decoration-line-through' : ''}`}>{task}</h6>
                                <span className={`badge bg-${priorityColor} rounded-pill small`}>{!isMarkedComplete ? priority : 'Completed'}</span>

                            </div>
                        )}

                        {/* Actions */}
                        <div className="d-flex align-items-center gap-1">

                            {!isEditOpen && !isMarkedComplete ? (
                                <Button
                                    className="btn btn-sm btn-outline-secondary"
                                    data-mdb-ripple-init
                                    aria-label="Edit task"
                                    onClick={() => setIsEditOpen()}
                                >
                                    <i className="fas fa-pen"></i>
                                </Button>
                            ) : null}

                            <Button
                                className="btn btn-sm btn-outline-danger"
                                data-mdb-ripple-init
                                aria-label="Delete task"
                                onClick={() => deleteTodo(id)}
                            >
                                <i className="fas fa-trash"></i>
                            </Button>

                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}