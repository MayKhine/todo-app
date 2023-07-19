import { useState } from 'react'
import './App.css'

function App() {
    // for all todos
    const [todoArr, setTodoArr] = useState([])

    // project list arry [[], [], []]
    const [projectArr, setProjectArr] = useState([])

    const [showTodoInput, setShowTodoInput] = useState(false)
    const [todoText, setTodoText] = useState('')
    const [showProjectInput, setShowProjectInput] = useState(false)
    const [projectText, setProjectText] = useState('')
    const [menuActive, setMenuActive] = useState(false)
    // const [menuButtonColor, setMenuButtonColor] = useState('gray')
    const [showHomeTodo, setShowHomeTodo] = useState(false)
    const [showTodyTodo, setShowTodayTodo] = useState(false)
    const [showThisWeekTodo, setShowThisWeekTodo] = useState(false)

    const projectListClasses = `projectList ${menuActive ? 'active' : ''}`

    const createTodo = (todo, date, priority, project) => {
        setTodoArr((todoArr) => [
            ...todoArr,
            { name: todo, date: date, priority: priority, project: project },
        ])
    }

    const createProject = (projectName) => {
        setProjectArr((projectArr) => [...projectArr, projectName])
    }

    const showHome = () => {
        if (!showHomeTodo) {
            setShowHomeTodo(true)
        }
        console.log('showHomeTodo: ', showHomeTodo)
    }

    const showToday = () => {
        if (!showTodyTodo) {
            setShowTodayTodo(true)
        }
        console.log('showTodyTodo: ', showTodyTodo)
    }

    const showThisWeek = () => {
        if (!showThisWeekTodo) {
            setShowThisWeekTodo(true)
        }
        console.log('showThisWeekTodo: ', showThisWeekTodo)
    }

    const showThisProject = (project) => {
        //show this project code
    }

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
                    <div>
                        {todoArr.forEach((e) =>
                            console.log('e:', e, todoArr.length)
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
                                <li className="projectItem" onClick={showHome}>
                                    Home
                                </li>
                                <li className="projectItem" onClick={showToday}>
                                    Today
                                </li>
                                <li
                                    className="projectItem"
                                    onClick={showThisWeek}
                                >
                                    This Week
                                </li>
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
                    <TodoList />
                </div>
            </div>
        </div>
    )
}

export default App

const TodoList = () => {
    // todoList.forEach((e) => {
    //     console.log(e)
    // })

    return <>HI</>
}

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
