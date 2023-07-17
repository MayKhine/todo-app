import { useState } from 'react'
import './App.css'

function App() {
  const [todoArr, setTodoArr] = useState([])

  const onClick = () => {
    setTodoArr(todoArr => [...todoArr, 'NEW TODO']);
    console.log(todoArr)
    return <div>{todoArr.forEach((e) => { 
      <div> {e}</div>
      
    })   }</div>
  }

  return (
    <>
      <header>Header</header>
      <container>Todo body</container>
     <button onClick={onClick}></button>
     <div>{todoArr}</div>

    </>
  )
}

export default App
