import { useState } from 'react'
import './App.css'
import { TodoList } from './TodoList'
import { useEffect } from 'react'
import { ProjectList } from './ProjectList'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DateTime } from 'luxon'
import { BiPlusCircle } from 'react-icons/bi'
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

  const showThisProject = (projectName) => {
    const curTodoArrToPrint = todoArr.filter((todo) => {
      if (todo.project == projectName) {
        return true
      }
    })
    setVisibleTodoArr(curTodoArrToPrint)
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
    <div style={appStyle}>
      <div style={headerStyle}>TodoApp</div>

      <div id="container" style={containerStyle}>
        <div id="leftSec">
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

                <div
                  className="projectHeader"
                  // style={projectHeaderStyle}
                >
                  Projects
                </div>
                <div className="project">
                  {!showProjectInput && (
                    <li
                      className="projectItem"
                      onClick={() => {
                        setShowTodoInput(false)
                        setShowProjectInput(true)
                      }}
                    >
                      + Add Project
                    </li>
                  )}

                  {showProjectInput && (
                    <>
                      <div style={projectBoxStyle}>
                        <p style={inputLabelStyle}>Project Name</p>
                        <input
                          id="projectText"
                          style={inputTextStyle}
                          value={projectText}
                          onChange={(e) => {
                            setValidation(true)
                            setProjectText(e.target.value)
                          }}
                        ></input>

                        <div>
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
                            validateInput(projectText) &&
                              createProject(projectText)
                            // setShowProjectInput(false)
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <ProjectList
                  projArr={projectArr}
                  showThisProject={showThisProject}
                  onClick={(e) => {
                    console.log('Pj list e: ', e)
                  }}
                ></ProjectList>
              </ul>
            </div>
          }
        </div>
        <div
          id="rightSec"
          style={{
            // backgroundColor: 'lightblue',
            flex: '1',
          }}
        >
          <div className="todoContainer" style={todoContainerStyle}>
            <div id="todo" style={todoBoxStyle}>
              {!showTodoInput && (
                <button
                  style={addTodobuttonStyle}
                  onClick={() => {
                    setShowProjectInput(false)
                    setShowTodoInput(true)
                  }}
                >
                  Add todo
                </button>
              )}
              {showTodoInput && (
                <>
                  <div style={todoInputDivStyle}>
                    <label style={inputLabelStyle}>Todo Task</label>
                    <input
                      id="todoInput"
                      type="text"
                      style={inputTextStyle}
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
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '30%',
                    }}
                  >
                    <div style={todoInputDivStyle}>
                      <label style={inputLabelStyle}>Date</label>

                      <DatePicker
                        selected={todoDueDate}
                        onChange={(date) => {
                          setTodoDueDate(date)
                        }}
                        value={todoDueDate || 'mm/dd/yyyy'}
                        // showIcon
                        // isClearable
                        wrapperClassName="dateStyle"
                      ></DatePicker>
                    </div>
                    <div style={todoInputDivStyle}>
                      <label style={inputLabelStyle}>Priority</label>
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
                  </div>
                  <div style={todoInputDivStyle}>
                    <label style={inputLabelStyle}>Project</label>
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
    </div>
  )
}

export default App

const desertSand = '#E5B897ff'
const melon = '#F4B1A8ff'
const lightCoral = '#E57E81ff'
const roseTaupe = '#976870ff'
const paynesGray = '#526C79ff'
const paynesGray2 = '#285B75ff'
const caputMortuum = '#432328ff'
const mountbattenPink = '#94797Eff'

const appStyle = {
  fontFamily: 'Bitter',
  fontSize: '15px',
  height: '100vh',
}

const headerStyle = {
  height: '12%',
  fontSize: '2em',
  textAlign: 'center',
  backgroundColor: roseTaupe,
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
}

const addTodobuttonStyle = {
  color: 'black',
  backgroundColor: melon,
  borderRadius: '8px',
  border: '1px solid transparent',
  fontSize: '1em',
  cursor: 'pointer',
  padding: '8px 8px 8px 8px',
  textDecoration: 'underline',
  width: 'calc(100% - 16px)',
}

const buttonStyle = {
  color: 'white',
  backgroundColor: paynesGray2,
  borderRadius: '4px',
  border: '1px solid transparent',
  padding: '.4em .4em',
  fontSize: '1em',
  cursor: 'pointer',
  margin: '5px 5px 5px 5px',
  alignSelf: 'flex-start',
}

const todoContainerStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}

const todoBoxStyle = {
  width: '100%',
  backgroundColor: 'lightgray',
}

const todoInputDivStyle = {
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '16px',
  paddingLeft: '8px',
}
const projectBoxStyle = {
  margin: '0px 5px 0px 15px',
  display: 'flex',
  flexDirection: 'column',
}

const inputLabelStyle = {
  textAlign: 'left',
  margin: '0',
  fontSize: '.8em',
}

const inputTextStyle = {
  backgroundColor: desertSand,
  margin: '0px 10px 0px 0px',
  borderColor: mountbattenPink,
  borderStyle: 'solid',
  borderWidth: '1px',
  borderRadius: '4px',
  padding: '6px',
  marginTop: '2px',
}

const errorStyle = {
  color: paynesGray2,
  fontSize: '.7em',
}
