
import { TaskList } from "./components/TaskList";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { useTasks,} from "./context/TaskContext";
import { BackgroundPattern } from "./components/BackgroundPattern";
import {  JSX } from "react";
import { Task } from "./types/taskTypes";
function App(): JSX.Element {
  const {
    displayedTasks,
    isLoading,
    addTask,
    handleSearch,
    handleFilter,
    deleteTask,
    editTask,
    showForm,
    toggleForm,
    taskToEdit,
    setTaskToEdit
  } = useTasks();

  const handleOnEditClick = (selectedTask: Task): void => {
    setTaskToEdit(selectedTask);
    toggleForm(true); 
  };

  return (
    <div className="max-w-3xl mx-auto px-2 p-4 py-4">
      <Header toggleForm={toggleForm} handleSearch={handleSearch} handleFilter={handleFilter} />

      {isLoading && <p className="text-3xl font-bold">Loading...</p>}

      <TaskList tasks={displayedTasks} deleteTask={deleteTask} handleOnEditClick={handleOnEditClick} toggleForm={toggleForm}/>

      {showForm && <TaskForm addTask={addTask} editTask={editTask} taskToEdit={taskToEdit} toggleForm={toggleForm} setTaskToEdit={setTaskToEdit} />}

      <BackgroundPattern />
    </div>
  );
}

export default App;
