/**
 * RootController is the main entry point component for the application.
 *
 * @component
 * @returns {JSX.Element} The rendered root container component.
 */
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import Container from "../components/Container";
import InputWithDropdown from "../components/InputWithDropdown";
import Modal from "../components/Modal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useToggleState from "../hooks/useToggleState";
import TodoHeader from "../components/TodoHeader";
import ListCard from "../components/ListCard";
import { useState } from "react";
import fallBackImg from "../assets/empty.svg"
import fallBackImgSearch from "../assets/search.svg"
import Alert from "../components/Alert";
import { motion, AnimatePresence } from "framer-motion";
import Fallback from "../components/Fallback";

/**
 * Generates a unique identifier string using the current timestamp and a random component.
 * @returns {string} A unique ID in the format 'timestamp-random'.
 */
function generateUniqueID() {
    const timestamp = Date.now().toString(36); // Base36 timestamp
    const random = Math.random().toString(36).substring(2, 8); // Random string
    return `${timestamp}-${random}`;
}

export default function RootController() {
    const [isModalOpen, setIsModalOpen] = useToggleState();
    const [isAlertOpen, setIsAlertOpen] = useToggleState(true);

    const [todos, setTodos] = useLocalStorage('todos', []);
    const [search, setSearch] = useState('');

    /**
     * Filters the list of todos based on the search query.
     * Returns todos whose task includes the search string (case-insensitive).
     *
     * @type {Array<{ task: string, [key: string]: any }>}
     */
    const filteredTodos = todos.filter(todo =>
        todo.task.toLowerCase().includes(search.toLowerCase())
    );

    const sortedTodos = [...filteredTodos].sort((a, b) => {
        return a.isCompleted - b.isCompleted;
    })

    /**
     * Creates a new todo item and adds it to the list of todos.
     *
     * @param {string} task - The description of the todo task.
     * @param {string|number} priority - The priority level of the todo item.
     */
    function createNewTodo(task, priority) {
        toast.success('Task added');
        const UID = generateUniqueID();
        setTodos((prev) => ([{ id: UID, task: task, priority: priority, isCompleted: false }, ...prev]));
    }

    /**
     * Removes a todo item from the list by its unique identifier.
     *
     * @param {string|number} targetId - The ID of the todo item to delete.
     */
    function deleteTodo(targetId) {
        toast.success('Task deleted');
        setTodos((prev) => prev.filter((todo) => todo.id !== targetId));
    }

    /**
     * Updates the task text of a todo item with the specified ID.
     *
     * @param {string|number} targetId - The unique identifier of the todo to edit.
     * @param {string} editText - The new text for the todo's task.
     */
    function editTodo(targetId, editText) {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === targetId ? { ...todo, task: editText } : todo
            )
        );
    }

    function isCompleted(targetId, boolVal) {
        console.log('DATA COLLECTED:', targetId, boolVal);
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === targetId ? { ...todo, isCompleted: boolVal } : todo
            )
        );
    }

    return (
        <Container className="container mt-3 custom-container-width">

            {isAlertOpen && (
                <Alert
                    emphasizeMsg="New Update!"
                    message="Smooth framer motion added"
                    Icon={() => (<i className="fas fa-check-circle me-3 mt-1 fs-5"></i>)}
                    setIsAlertOpen={() => setIsAlertOpen(false)}
                />
            )}

            <Toaster />

            <Button className="btn btn-primary btn-floating btn-lg position-fixed custom-floating-btn" onClick={setIsModalOpen}>
                <i className="fas fa-plus"></i>
            </Button>

            <InputWithDropdown setSearch={setSearch} />
            <TodoHeader title="Todos" count={todos.length} />

            <div className="my-3">
                {sortedTodos.length !== 0 ? (
                    <AnimatePresence>
                        {sortedTodos.map((todo) => (
                            <motion.div
                                key={todo.id}
                                layout // enables automatic smooth animation on reorder
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <ListCard
                                    id={todo.id}
                                    task={todo.task}
                                    isMarkedComplete={todo.isCompleted}
                                    priority={todo.priority}
                                    deleteTodo={deleteTodo}
                                    editTodo={editTodo}
                                    isCompleted={isCompleted}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                ) : (

                    <>
                        {/* If user searched but nothing matched */}
                        {search && filteredTodos.length === 0 && (
                            <Fallback
                                image={fallBackImgSearch}
                                headTxt="No results found"
                                message={`No tasks match "${search}"`}
                            />
                        )}

                        {/* If there are no tasks at all (empty list) */}
                        {!todos.length && !search && (
                            <Fallback
                                image={fallBackImg}
                                headTxt="You have no list"
                                message="Add a task to get started!"
                            />
                        )}

                    </>
                )}
            </div>


            {isModalOpen && (<Modal setIsOpen={setIsModalOpen} createNewTodo={createNewTodo} />)}

        </Container>
    );
}