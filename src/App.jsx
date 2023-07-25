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
  const [validation, setValidation] = useState(true)

  //creating todo task
  const [todoText, setTodoText] = useState('')
  const [menuActive, setMenuActive] = useState(false)
  const [todoDueDate, setTodoDueDate] = useState()
  const [todoPriority, setTodoPriority] = useState(0) // default priority is low
  const [todoProject, setTodoProject] = useState('')
  const priorityValueArr = ['Low', 'Medium', 'High']
  const projectListClasses = `projectList ${menuActive ? 'active' : ''}`

  const ProjectDropDown = (props) => {
    const pjList = props.projectArr.map((project, index) => {
      return (
        <option key={index} value={project}>
          {project}
        </option>
      )
    })
    return (
      <select
        value={todoProject}
        onChange={(event) => {
          console.log('On change for proj drop down: ', event.target.value)
          setTodoProject(event.target.value)
        }}
      >
        <option value="">None</option>
        {pjList}
      </select>
    )
  }

  const createTodo = (todo, dueDate, priority, project) => {
    console.log('newTODO project: ', project)

    const newTodo = [
      ...todoArr,
      {
        name: todo,
        date: dueDate ? dueDate.toISOString() : null,
        priority: priority, //when null, it's low priority
        project: project,
      },
    ]

    setTodoArr(newTodo)

    // setVisibleTodoArr(newTodo)
    showHome(newTodo)
    setTodoText('')
    setTodoDueDate()
    setTodoPriority(0)
    setTodoProject('')

    setShowTodoInput(false)
  }

  const createProject = (projectName) => {
    setProjectArr((projectArr) => [...projectArr, projectName])
    setProjectText('')
    setShowProjectInput(false)
    // setShowTodoInput(false)
  }

  const showHome = (curTodoArr) => {
    console.log('Does it contain latest update: ', curTodoArr)
    setVisibleTodoArr(curTodoArr)
    console.log('SetVisibleTodoarry is updated', visibleTodoArr)
  }

  const showToday = (curTodoArr) => {
    const start = DateTime.local().startOf('day')
    const end = DateTime.local().endOf('day')
    const curTodoArrToPrint = curTodoArr.filter((todo) => {
      if (
        start <= DateTime.fromISO(todo.date) &&
        end >= DateTime.fromISO(todo.date)
      ) {
        return true
      }
    })
    setVisibleTodoArr(curTodoArrToPrint)
  }

  const showThisWeek = (curTodoArr) => {
    const start = DateTime.local().startOf('week')
    const end = DateTime.local().endOf('week')

    const curTodoArrToPrint = curTodoArr.filter((todo) => {
      if (
        start <= DateTime.fromISO(todo.date) &&
        end >= DateTime.fromISO(todo.date)
      ) {
        return true
      }
    })
    setVisibleTodoArr(curTodoArrToPrint)
  }

  const showThisProject = (project) => {
    //show this project code
  }

  const validateInput = (text) => {
    if (text.trim()) {
      setValidation(true)
      return true
    } else {
      setValidation(false)
      return false
    }
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
      <div style={{ fontSize: '20px', fontStyle: 'bold' }}>TodoApp</div>

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
                  onClick={() => {
                    showThisWeek(todoArr)
                  }}
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
          <div
            id="project"
            style={{
              // backgroundColor: 'green',
              padding: '10px',
            }}
          >
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
                <div>
                  <input
                    id="projectText"
                    value={projectText}
                    onChange={(e) => {
                      setValidation(true)
                      setProjectText(e.target.value)
                    }}
                  ></input>

                  <div
                    style={{
                      height: '15px',
                    }}
                  >
                    {!validation && (
                      <div style={errorStyle}>
                        Error: This field cannot be empty.
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    style={buttonStyle}
                    onClick={() => {
                      setProjectText('')
                      setValidation(true)
                      setShowProjectInput(false)
                    }}
                  >
                    X
                  </button>
                  <button
                    style={buttonStyle}
                    onClick={() => {
                      // setShowProjectInput(false)
                      validateInput(projectText) && createProject(projectText)
                      // setShowProjectInput(false)
                    }}
                  >
                    Add
                  </button>
                </div>
              </>
            )}
          </div>

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
                    type="text"
                    required
                    value={todoText}
                    onChange={(e) => {
                      // console.log('e', e.target.value)
                      // validateInput(e.target.value) &&
                      setTodoText(e.target.value)
                    }}
                  ></input>
                  {!validation && (
                    <div style={errorStyle}>
                      Error: This field cannot be empty.
                    </div>
                  )}
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
                      className="priorityButton"
                      onClick={() => setTodoPriority(0)}
                    >
                      Low
                    </button>
                    <button
                      className="priorityButton"
                      onClick={() => setTodoPriority(1)}
                    >
                      Medium
                    </button>
                    <button
                      className="priorityButton"
                      onClick={() => setTodoPriority(2)}
                    >
                      High
                    </button>
                  </div>
                </div>
                <div>
                  <label>Project</label>
                  <ProjectDropDown projectArr={projectArr}></ProjectDropDown>
                </div>
                <div>
                  <button
                    style={buttonStyle}
                    onClick={() => {
                      setValidation(true)
                      setShowTodoInput(false)
                    }}
                  >
                    X
                  </button>
                  <button
                    style={buttonStyle}
                    onClick={() => {
                      // setShowTodoInput(false)

                      validateInput(todoText) &&
                        createTodo(
                          todoText,
                          todoDueDate,
                          todoPriority,
                          todoProject
                        )
                    }}
                  >
                    Add
                  </button>
                </div>
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

const errorStyle = {
  color: 'red',
  fontSize: '.7em',
}
