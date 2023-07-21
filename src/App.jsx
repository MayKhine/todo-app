import { useState } from 'react'
import './App.css'
import { TodoList } from './TodoList'
import { useEffect } from 'react'
import { ProjectList } from './ProjectList'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DateTime } from 'luxon'

function App() {
    const [todoArr, setTodoArr] = useState(
        JSON.parse(localStorage.getItem('todoArr')) || []
    )
    const [visibleTodoArr, setVisibleTodoArr] = useState(todoArr) // null
    const [projectArr, setProjectArr] = useState(
        JSON.parse(localStorage.getItem('projectArr')) || []
    )

    const [showTodoInput, setShowTodoInput] = useState(false)
    const [showProjectInput, setShowProjectInput] = useState(false)

    const [projectText, setProjectText] = useState('')

    //creating todo task
    const [todoText, setTodoText] = useState('')
    const [menuActive, setMenuActive] = useState(false)
    const [todoDueDate, setTodoDueDate] = useState() //new Date()
    const [todoPriority, setTodoPriority] = useState(0) // num
    // const [showPriorityDropDown, setshowPriorityDropDown] = useState(false)

    const priorityValueArr = ['Low', 'Medium', 'High']
    const projectListClasses = `projectList ${menuActive ? 'active' : ''}`

    // const today = DateTime.now()

    // console.log(
    //     'Today: ',
    //     today,
    //     'updated Today: ',
    //     today.toLocaleString(DateTime.DATE_SHORT),
    //     'updated Today2: ',
    //     today.toLocaleString(DateTime.DATETIME_FULL)
    // )

    const formatDate = (longDate) => {
        return (
            longDate.getMonth() +
            1 +
            '/' +
            longDate.getDate() +
            '/' +
            longDate.getFullYear()
        )
    }

    const createTodo = (todo, dueDate, priority, project) => {
        const newTodo = [
            ...todoArr,
            {
                name: todo,
                date: dueDate ? formatDate(dueDate) : 'no date',
                priority: priority, //when null, it's low priority
                project: project,
            },
        ]

        setTodoArr(newTodo)

        setTodoText('')
        setTodoDueDate()
        setTodoPriority(0)
        // setVisibleTodoArr(newTodo)
        showHome(newTodo)
    }

    const createProject = (projectName) => {
        setProjectArr((projectArr) => [...projectArr, projectName])
    }

    const showHome = (curTodoArr) => {
        console.log('Does it contain latest update: ', curTodoArr)
        setVisibleTodoArr(curTodoArr)
        console.log('SetVisibleTodoarry is updated', visibleTodoArr)
    }

    const showToday = (curTodoArr) => {
        const today = formatDate(new Date())
        let curTodoArrToPrint = curTodoArr.filter((todo) => {
            console.log('Todo:', todo.date)
            if (todo.date == today) {
                console.log('Today check: ', today, 'and ', todo.date)
                return true
                //update the array for today
                // setVisibleTodoArr([
            }
        })

        console.log('curTodoArrToPrint:', curTodoArrToPrint)
    }

    const showThisWeek = (curTodoArr) => {
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
                                    onClick={() => showHome(todoArr)}
                                >
                                    Home
                                </li>
                                <li
                                    id="Today"
                                    className="projectItem"
                                    onClick={() => {
                                        showToday(todoArr)
                                    }}
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
                                <div>
                                    <label>Task</label>
                                    <input
                                        id="todoInput"
                                        value={todoText}
                                        onChange={(e) =>
                                            setTodoText(e.target.value)
                                        }
                                    ></input>
                                </div>
                                <div>
                                    <label>Date</label>
                                    <DatePicker
                                        selected={todoDueDate}
                                        onChange={(date) => {
                                            setTodoDueDate(date)
                                        }}
                                        value={todoDueDate || 'mm/dd/yyyy'}
                                    ></DatePicker>
                                </div>
                                <div>
                                    <label>Priority</label>
                                    <div>
                                        <button
                                            onClick={() => setTodoPriority(0)}
                                        >
                                            Low
                                        </button>
                                        <button
                                            onClick={() => setTodoPriority(1)}
                                        >
                                            Medium
                                        </button>
                                        <button
                                            onClick={() => setTodoPriority(2)}
                                        >
                                            High
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label>Project</label>
                                </div>
                                <button
                                    style={buttonStyle}
                                    onClick={() => {
                                        setShowTodoInput(false)
                                        createTodo(
                                            todoText,
                                            todoDueDate,
                                            todoPriority,
                                            'proj category'
                                        )
                                    }}
                                >
                                    Add
                                </button>
                            </>
                        )}
                    </div>
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
