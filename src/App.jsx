import {useState} from "react";
import {FaCheck} from "react-icons/fa";
import {MdEdit} from "react-icons/md";
import {FaPlus} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import { toast } from "react-toastify";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [editedText, setEditedText] = useState("");
    const [editedTaskId, setEditedTaskId] = useState(null);
    const [taskIdCounter, setTaskIdCounter] = useState(1);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const dataToAdd = {
            text: inputValue.trim(),
            id: taskIdCounter,
        };
        setTasks([...tasks, dataToAdd]);
        setTaskIdCounter(taskIdCounter + 1);
        setInputValue("");
        toast.success("toast")
    };

    const handleDeleteTask = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    };

    const handleEditStart = (id, text) => {
        setEditedTaskId(id);
        setEditedText(text);
    };

    const handleEditCancel = () => {
        setEditedTaskId(null);
        setEditedText("");
    };

    const handleEditSave = (id) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {...task, text: editedText.trim()};
            }
            return task;
        });
        setTasks(updatedTasks);
        setEditedTaskId(null);
        setEditedText("");
    };

    return (
        <div className="MainBody">
            <div className="TodoBody">
                <div className="TodoTopText">
                    <h2>Offline ToDo List</h2>
                </div>
                <div className="TodoDownView">
                    <div className="TodoInputBox">
                        <input
                            type="text"
                            placeholder="Write a todo"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button onClick={handleAddTask}>
                            <FaPlus />
                        </button>
                    </div>
                    <div className="TodoListItemsView">
                        <div className="TodoListItemsWrap">
                            {tasks.map((item, index) => (
                                <div className="TodoListItem" key={index}>
                                    <div className="TodoListItemText">
                                        {item?.id === editedTaskId ? (
                                            <div className="editInputHold">
                                                <input
                                                    type="text"
                                                    className="editInput"
                                                    value={editedText}
                                                    onChange={(e) =>
                                                        setEditedText(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <p>{item?.text}</p>
                                        )}
                                    </div>
                                    <div className="TodoListItemAction">
                                        {item?.id === editedTaskId ? (
                                            <span className="TodoListItemActionSecond">
                                                <FaCheck
                                                    size={25}
                                                    className="TodoListItemActionFirstC"
                                                    onClick={() =>
                                                        handleEditSave(item?.id)
                                                    }
                                                />
                                                <button
                                                    className="cancelBtn"
                                                    onClick={handleEditCancel}
                                                >
                                                    Cancel
                                                </button>
                                            </span>
                                        ) : (
                                            <span className="TodoListItemActionFirst">
                                                <MdDelete
                                                    size={25}
                                                    className="TodoListItemActionFirstA"
                                                    onClick={() =>
                                                        handleDeleteTask(
                                                            item?.id
                                                        )
                                                    }
                                                />
                                                <MdEdit
                                                    size={25}
                                                    className="TodoListItemActionFirstB"
                                                    onClick={() =>
                                                        handleEditStart(
                                                            item?.id,
                                                            item?.text
                                                        )
                                                    }
                                                />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
