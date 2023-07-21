import { useState } from 'react'
import './App.css'
import { TodoList } from './TodoList'
import { useEffect } from 'react'
import { ProjectList } from './ProjectList'
function App() {
    // for all todos
    const [todoArr, setTodoArr] = useState(
        JSON.parse(localStorage.getItem('todoArr')) || []
    )
    const [visibleTodoArr, setVisibleTodoArr] = useState([])

    const [projectArr, setProjectArr] = useState(
        JSON.parse(localStorage.getItem('projectArr')) || []
    )

    const [showTodoInput, setShowTodoInput] = useState(false)
    const [todoText, setTodoText] = useState('')
    const [showProjectInput, setShowProjectInput] = useState(false)
    const [projectText, setProjectText] = useState('')
    const [menuActive, setMenuActive] = useState(false)

    const projectListClasses = `projectList ${menuActive ? 'active' : ''}`

    const createTodo = (todo, date, priority, project) => {
        setTodoArr((todoArr) => [
            ...todoArr,
            {
                name: todo,
                date: date,
                priority: priority,
                project: project,
            },
        ])
    }

    const createProject = (projectName) => {
        setProjectArr((projectArr) => [...projectArr, projectName])
    }

    const showHome = () => {
        setVisibleTodoArr(todoArr)
    }

    const showToday = () => {
        setVisibleTodoArr([
            {
                name: 'todoay',
                date: 'date to fill',
                priority: 'priority',
                project: 'proj category',
            },
            {
                name: 'today',
                date: 'date to fill',
                priority: 'priority',
                project: 'proj category',
            },
        ])
    }

    const showThisWeek = () => {
        setVisibleTodoArr([
            {
                name: 'this weeeeek',
                date: 'date to fill',
                priority: 'priority',
                project: 'proj category',
            },
            {
                name: 'this weeeekkkk',
                date: 'date to fill',
                priority: 'priority',
                project: 'proj category',
            },
        ])
    }

    const showThisProject = (project) => {
        //show this project code
    }

    useEffect(() => {
        localStorage.setItem('todoArr', JSON.stringify(todoArr))
    }, [todoArr])

    useEffect(() => {
        localStorage.setItem('projectArr', JSON.stringify(projectArr))
    }, [projectArr])

    return (
        <div
            id="container"
            style={{
                fontFamily: 'Verdana',
                fontSize: '15px',
                // width: '100vw',
                height: '100vh',
            }}
        >
            <div style={{ fontSize: '20px', fontStyle: 'bold' }}>
                TodoApp
                <>
                    <div id="todo">
                        {!showTodoInput && (
                            <button
                                onClick={() => setShowTodoInput(true)}
                                style={buttonStyle}
                            >
                                Add todo
                            </button>
                        )}

                        {showTodoInput && (
                            <>
                                <input
                                    id="todoInput"
                                    value={todoText}
                                    onChange={(e) =>
                                        setTodoText(e.target.value)
                                    }
                                ></input>
                                <button
                                    style={buttonStyle}
                                    onClick={() => {
                                        setShowTodoInput(false)
                                        createTodo(
                                            todoText,
                                            'date to fill',
                                            'priority',
                                            'proj category'
                                        )
                                        setTodoText('')
                                    }}
                                >
                                    Add
                                </button>
                            </>
                        )}
                    </div>
                    <div id="project">
                        {!showProjectInput && (
                            <button
                                style={buttonStyle}
                                onClick={() => {
                                    setShowProjectInput(true)
                                }}
                            >
                                Add Project
                            </button>
                        )}

                        {showProjectInput && (
                            <>
                                <input
                                    id="projectText"
                                    value={projectText}
                                    onChange={(e) => {
                                        setProjectText(e.target.value)
                                    }}
                                ></input>
                                <button
                                    style={buttonStyle}
                                    onClick={() => {
                                        setShowProjectInput(false)
                                        createProject(projectText)
                                        setProjectText('')
                                    }}
                                >
                                    Add Project
                                </button>
                            </>
                        )}
                    </div>
                </>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}
            >
                <div id="leftSec" style={leftSecStyle}>
                    <div
                        className="toggleButton"
                        onClick={() => {
                            console.log('Toggle is clicked')
                            setMenuActive(!menuActive)
                        }}
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                    {
                        <div id="projectList" className={projectListClasses}>
                            <ul>
                                <li
                                    id="Home"
                                    className="projectItem"
                                    onClick={showHome}
                                >
                                    Home
                                </li>
                                <li
                                    id="Today"
                                    className="projectItem"
                                    onClick={showToday}
                                >
                                    Today
                                </li>
                                <li
                                    id="ThisWeek"
                                    className="projectItem"
                                    onClick={showThisWeek}
                                >
                                    This Week
                                </li>

                                <ProjectList projArr={projectArr}></ProjectList>
                            </ul>
                        </div>
                    }
                </div>
                <div
                    id="rightSec"
                    style={{
                        backgroundColor: 'lightblue',
                        flex: '1',
                    }}
                >
                    <TodoList listArr={visibleTodoArr} />
                </div>
            </div>
        </div>
    )
}

export default App

// button style
const buttonStyle = {
    color: 'black',
    backgroundColor: 'lightgray',
    borderRadius: '8px',
    border: '1px solid transparent',
    padding: '.5em .5em',
    fontSize: '1em',
    cursor: 'pointer',
    margin: '5px 5px 5px 5px',
}

const leftSecStyle = {
    backgroundColor: 'gray',
}
