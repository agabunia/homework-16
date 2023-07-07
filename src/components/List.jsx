import React, { useCallback, useState } from "react";
import DoneLogo from '../assets/done.png';
import ToDoLogo from '../assets/to-do.png';
import InProgress from '../assets/in-progress.png';
import Task from "./Task";


const List = () => {

    const [newTasks, setNewTasks] = useState([{id: 1, name: 'Skillwill'}, {id: 2, name: 'Bitcamp'}])
    const [doneTasks, setDoneTasks] = useState([{id: 99, name: 'Sleep'}, {id: 98, name: 'Eat'}])
    const [inProgressTasks, setInProgress] = useState([{id: 50, name: 'Homework'}])
    const [inputTask, setInputTask] = useState('')
    

    const onChange = useCallback((event => {
        const value = event.target.value
        setInputTask(value)
    }), [])


    const addTask = useCallback((event) => {
        event.preventDefault()

        const userInput = {
            id: newTasks.length + 1, 
            name: inputTask
        }

        setNewTasks((prevState) => [...prevState, userInput])
        setInputTask('')
    }, [inputTask, newTasks])


    const moveInProgress = useCallback((id) => {
        setNewTasks((newTasks) => newTasks.filter((task) => task.id !== id))

        const inProgress = newTasks.filter((task) => task.id === id)
        setInProgress((tasks) => [...tasks, inProgress[0]])

        console.log('move To Done')
    }, [newTasks])


    const moveToDone = useCallback((id) => {
        setInProgress((inProgressTasks) => inProgressTasks.filter((task) => task.id !== id))

        const done = inProgressTasks.filter((newTask) => newTask.id === id)
        setDoneTasks((doneTasks) => [...doneTasks, done[0]])

        console.log('move To Done')
    }, [inProgressTasks])

    const moveToDo = useCallback((id) => {
        setDoneTasks((doneTasks) => doneTasks.filter((task) => task.id !== id))

        const toDo = doneTasks.filter((doneTask) => doneTask.id === id)
        setNewTasks((newTasks) => [...newTasks, toDo[0]])

        console.log('move to Do')
    }, [doneTasks])



    const removeToDoTask = useCallback((id) => {
        const updatedTasks = newTasks.filter((newTask) => newTask.id !== id)
        setNewTasks(updatedTasks)

        console.log('remove',id)
    }, [newTasks])

    const removeInProgressTask = useCallback((id) => {
        const updatedTasks = inProgressTasks.filter((inProgressTask) => inProgressTask.id !== id)
        setInProgress(updatedTasks)

        console.log('remove',id)
    }, [inProgressTasks])

    const removeDoneTask = useCallback((id) => {
        const updatedTasks = doneTasks.filter((doneTask) => doneTask.id !== id)
        setDoneTasks(updatedTasks)

        console.log('remove',id)
    }, [doneTasks])



    console.log(doneTasks)
    return (
        <div className="background">
            <div className="users">
                <div className="form">
                    <form className="user-form" onSubmit={addTask}>
                        <input type="text" onChange={onChange} value={inputTask} placeholder="e.g. Do Homework" />
                        <button type="submit">Add Task</button>
                    </form>
                </div>

                <div className="lists">
                    <div className="section">
                        <div className="box">
                            <div className="image">
                                <img src={ToDoLogo} alt='text' />
                            </div>
                            <p>To-Do</p>
                        </div>
                        {newTasks.map((newTask) => (
                            <Task 
                            key={newTask.id} 
                            id={newTask.id} 
                            name={newTask.name} 
                            buttonOne={"Remove"} 
                            buttonTwo={"In Progress"} 
                            actionOne={removeToDoTask} 
                            actionTwo={moveInProgress}
                            />
                        ))}
                    </div>

                    <div className="section">
                        <div className="box">
                            <div className="image">
                                <img src={InProgress} alt='text' />
                            </div>
                            <p>In Progress</p>
                        </div>
                        {inProgressTasks.map((inProgressTask) => (
                            <Task 
                            key={inProgressTask.id} 
                            id={inProgressTask.id} 
                            name={inProgressTask.name} 
                            buttonOne={"Remove"} 
                            buttonTwo={"Done"} 
                            actionOne={removeInProgressTask} 
                            actionTwo={moveToDone}
                            />
                        ))}
                    </div>

                    <div className="section">
                        <div className="box">
                            <div className="image">
                                <img src={DoneLogo} alt='text' />
                            </div>
                            <p>Done</p>
                        </div>
                        {doneTasks.map((doneTask) => (
                            <Task 
                            key={doneTask.id} 
                            id={doneTask.id} 
                            name={doneTask.name} 
                            buttonOne={"Remove"} 
                            buttonTwo={"To Do"} 
                            actionOne={removeDoneTask} 
                            actionTwo={moveToDo}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default List