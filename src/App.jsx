import { useState } from 'react'
import './App.css'
import { TodoList } from './TodoList'
import { useEffect } from 'react'
import { ProjectList } from './ProjectList'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DateTime } from 'luxon'
import { BiListCheck } from 'react-icons/bi'

function App() {
  const [todoArr, setTodoArr] = useState(
    JSON.parse(localStorage.getItem('todoArr')) || []
  )

  const [visibleTodoArr, setVisibleTodoArr] = useState(todoArr)
  const [projectArr, setProjectArr] = useState(
    JSON.parse(localStorage.getItem('projectArr')) || []
  )

  const [curPage, setCurPage] = useState('home')

  const [showTodoInput, setShowTodoInput] = useState(false)
  const [showProjectInput, setShowProjectInput] = useState(false)

  const [projectText, setProjectText] = useState('')
  const [validation, setValidation] = useState(true)

  //creating todo task
  const [todoText, setTodoText] = useState('')
  const [menuActive, setMenuActive] = useState(false)
  const [todoDueDate, setTodoDueDate] = useState()
  const [todoPriority, setTodoPriority] = useState(0)
  const [todoProject, setTodoProject] = useState('')
  const [todoChecked, setTodoChecked] = useState(false)
  const projectListClasses = `projectList ${menuActive ? 'active' : ''}`
  const [errorText, setErrorText] = useState('')

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
        style={inputDropDownStyle}
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
    const newTodo = [
      ...todoArr,
      {
        name: todo,
        date: dueDate ? dueDate.toISOString() : null,
        priority: priority, //when null, it's low priority
        project: project,
        checked: todoChecked,
      },
    ]

    setTodoArr(newTodo)

    console.log('curpage', curPage)
    if (curPage != 'home' && curPage != 'today' && curPage != 'week') {
      showCurPage('project', curPage, newTodo)
    } else {
      showCurPage(curPage, null, newTodo)
    }

    setTodoText('')
    setTodoDueDate()
    setTodoPriority(0)
    setTodoProject('')

    setShowTodoInput(false)
  }

  const checkboxClicked = (name, projectName) => {
    const foundTodo = todoArr.find((todo) => {
      return todo.name == name && todo.project == projectName
    })

    foundTodo.checked = !foundTodo.checked
    setTodoArr((todoArr) => [...todoArr])
  }

  const createProject = (projectName) => {
    setProjectArr((projectArr) => [...projectArr, projectName])
    setProjectText('')
    setShowProjectInput(false)
    // setShowTodoInput(false)
  }

  const showHome = (curTodoArr) => {
    setVisibleTodoArr(curTodoArr)
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

  const showThisProject = (projectName, todoArr) => {
    const curTodoArrToPrint = todoArr.filter((todo) => {
      if (todo.project == projectName) {
        return true
      }
    })
    setVisibleTodoArr(curTodoArrToPrint)
  }

  const validateProjectInput = (text) => {
    if (text.trim()) {
      if (projectArr.includes(text.trim())) {
        setErrorText('Error: Project names must be different.')
        setValidation(false)
        return false
      }
      setErrorText('')
      return true
    } else {
      setErrorText('Error: This field cannot be empty.')
      setValidation(false)
      return false
    }
  }

  const validateTodoInput = (text, projectName) => {
    let result = true
    if (text.trim()) {
      //check if this task already exist in the project
      todoArr.forEach((todo) => {
        if (todo.name == text.trim() && todo.project == projectName) {
          if (projectName) {
            setErrorText('Error: This todo already exists in the same project.')
          } else {
            setErrorText('Error: This todo already exists.')
          }
          setValidation(false)
          result = false
        }
      })
    } else {
      setErrorText('Error: This field cannot be empty.')
      setValidation(false)
      result = false
    }
    return result
  }

  const showCurPage = (page, projectName, todoArr) => {
    switch (page) {
      case 'home':
        showHome(todoArr)
        setCurPage(page)
        break
      case 'today':
        showToday(todoArr)
        setCurPage(page)
        break
      case 'week':
        showThisWeek(todoArr)
        setCurPage(page)
        break
      case 'project':
        showThisProject(projectName, todoArr)
        setCurPage(projectName)
        break
    }
  }

  const deleteTodo = (todoName, projectName) => {
    const newTodoArr = todoArr.filter((todo) => {
      if (todo.name == todoName && todo.project == projectName) {
        return false
      }
      return true
    })

    if (curPage != 'home' && curPage != 'today' && curPage != 'week') {
      showCurPage('project', curPage, newTodoArr)
    } else {
      showCurPage(curPage, null, newTodoArr)
    }
    setTodoArr(newTodoArr)
  }

  const showPageHeader = () => {
    let text = ''
    switch (curPage) {
      case 'home':
        text = 'Home'
        break
      case 'today':
        text = "Today's todos"
        break
      case 'week':
        text = "This week's todos"
        break
      default:
        text = 'Project - ' + curPage + "'s todos"
    }

    return (
      <div style={{ fontSize: '1.5em', color: melon, marginTop: '8px' }}>
        {text}
      </div>
    )
  }

  useEffect(() => {
    localStorage.setItem('todoArr', JSON.stringify(todoArr))
  }, [todoArr])

  useEffect(() => {
    localStorage.setItem('projectArr', JSON.stringify(projectArr))
  }, [projectArr])

  return (
    <div style={appStyle}>
      <div style={headerStyle}>
        <BiListCheck
          style={{ width: '50px', height: '50px', marginLeft: '8px' }}
        />
        <p style={{ margin: '0', paddingTop: '8px', paddingLeft: '8px' }}>
          Todo App
        </p>
      </div>

      <div id="container">
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
                  onClick={() => showCurPage('home', null, todoArr)}
                >
                  Home
                </li>
                <li
                  id="Today"
                  className="projectItem"
                  onClick={() => {
                    // showToday(todoArr)
                    showCurPage('today', null, todoArr)
                  }}
                >
                  Today
                </li>
                <li
                  id="ThisWeek"
                  className="projectItem"
                  onClick={() => {
                    // showThisWeek(todoArr)
                    showCurPage('week', null, todoArr)
                  }}
                >
                  This Week
                </li>

                <div className="projectHeader">Projects</div>
                <div className="project">
                  {!showProjectInput && (
                    <li
                      className="projectItem"
                      onClick={() => {
                        setErrorText('')
                        setValidation(true)
                        setShowTodoInput(false)
                        setTodoText('')
                        setTodoDueDate()
                        setTodoPriority(0)
                        setTodoProject('')
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
                            <div style={errorStyle}>{errorText}</div>
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
                            validateProjectInput(projectText) &&
                              createProject(projectText)
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
                  showCurPage={(page, projectName) =>
                    showCurPage(page, projectName, todoArr)
                  }
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
            flex: '1',
          }}
        >
          <div className="todoContainer" style={todoContainerStyle}>
            {showPageHeader()}
            <div id="todo" style={todoBoxStyle}>
              {!showTodoInput && (
                <button
                  style={addTodobuttonStyle}
                  onClick={() => {
                    setErrorText('')
                    setValidation(true)
                    setProjectText('')
                    setShowProjectInput(false)
                    setShowTodoInput(true)
                  }}
                >
                  + Add Todo
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
                        setTodoText(e.target.value)
                      }}
                    ></input>
                    {!validation && <div style={errorStyle}>{errorText}</div>}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexGrow: '0',
                      justifyContent: 'center',
                      gap: '30%',
                      flexWrap: 'wrap',
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
                    <div
                      style={{
                        paddingRight: '8px',
                      }}
                    >
                      <ProjectDropDown
                        projectArr={projectArr}
                      ></ProjectDropDown>
                    </div>
                  </div>
                  <div>
                    <button
                      style={buttonStyle}
                      onClick={() => {
                        setValidation(true)
                        setShowTodoInput(false)
                        setTodoText('')
                        setTodoDueDate()
                        setTodoPriority(0)
                        setTodoProject('')
                      }}
                    >
                      X
                    </button>
                    <button
                      style={buttonStyle}
                      onClick={() => {
                        validateTodoInput(todoText, todoProject) &&
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

            <TodoList
              listArr={visibleTodoArr}
              checkboxClicked={checkboxClicked}
              deleteTodo={deleteTodo}
            />
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
  display: 'flex',
  flexDirection: 'column',
}

const headerStyle = {
  height: '50px',
  fontSize: '2em',
  textAlign: 'center',
  backgroundColor: roseTaupe,
  display: 'flex',
  flexDirection: 'row',
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  flex: '1',
}

const addTodobuttonStyle = {
  color: 'black',
  backgroundColor: lightCoral,
  borderRadius: '4px',
  border: '1px solid' + mountbattenPink,
  fontSize: '1em',
  cursor: 'pointer',
  padding: '8px 8px 8px 8px',
  width: 'calc(100% - 12px)',
  marginTop: '8px',
}

const buttonStyle = {
  color: 'black',
  backgroundColor: 'lightCoral',
  borderRadius: '4px',
  border: '1px solid' + mountbattenPink,
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
}

const todoInputDivStyle = {
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '8px',
  paddingLeft: '8px',
}

const projectBoxStyle = {
  margin: '0px 5px 0px 15px',
  display: 'flex',
  flexDirection: 'column',
}

const inputDropDownStyle = {
  width: '100%',
  backgroundColor: desertSand,
  borderColor: mountbattenPink,
  borderStyle: 'solid',
  borderWidth: '1px',
  borderRadius: '4px',
  padding: '6px',
  marginTop: '2px',
}

const inputLabelStyle = {
  textAlign: 'left',
  margin: '0',
  fontSize: '.8em',
  color: melon,
}

const inputTextStyle = {
  backgroundColor: desertSand,
  margin: '0px 8px 0px 0px',
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
