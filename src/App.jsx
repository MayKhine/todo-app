import { useState } from 'react'
import './App.css'

function App() {
    const [todoArr, setTodoArr] = useState([])
    const [showTodoInput, setShowTodoInput] = useState(false)
    const [todoText, setTodoText] = useState('')
    const [projectArr, setProjectArr] = useState([])
    const [showProjectInput, setShowProjectInput] = useState(false)
    const [projectText, setProjectText] = useState('')
    // const [toggleButton, setToggleButton] = useState(true)

    return (
        <div style={{ fontFamily: 'Verdana', fontSize: '15px' }}>
            <header style={{ fontSize: '30px', fontStyle: 'bold' }}>
                TodoApp
            </header>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    // position: 'relative',
                    flexWrap: 'wrap',
                }}
            >
                <leftSec id="leftSec">
                    <div
                        className="toggleButton"
                        onClick={() => {
                            console.log('Toggle is clicked')
                            // setToggleButton(!toggleButton)

                            const projectList =
                                document.getElementById('projectList')
                            console.log(projectList)
                            projectList.classList.toggle('active')
                        }}
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                    {
                        <projectList id="projectList" className="projectList">
                            <ul>
                                <li
                                    className="projectItem"
                                    style={projectItemStyle}
                                >
                                    Home
                                </li>
                                <li
                                    className="projectItem"
                                    style={projectItemStyle}
                                >
                                    Today
                                </li>
                                <li
                                    className="projectItem"
                                    style={projectItemStyle}
                                >
                                    Important
                                </li>
                            </ul>
                        </projectList>
                    }
                </leftSec>
                <rightSec
                    style={{
                        // width: '100%',
                        backgroundColor: 'lightblue',
                        // flexGrow: '1',
                        flex: '1',
                    }}
                >
                    hi
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
                                        setTodoArr((todoArr) => [
                                            ...todoArr,
                                            todoText,
                                        ])
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
                                        setProjectArr((projectArr) => [
                                            ...projectArr,
                                            projectText,
                                        ])
                                        setProjectText('')
                                    }}
                                >
                                    Add Project
                                </button>
                            </>
                        )}
                    </div>
                    <div>{todoArr}</div>
                    <div>{projectArr}</div>
                </rightSec>
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

const projectItemStyle = {
    width: '300px',
    padding: '5px 5px 5px 5px',
}
