import './App.css'

export const ProjectList = (props) => {
  const output = props.projArr?.map((projName, index) => {
    return (
      <li
        className="projectItem"
        key={index}
        onClick={() => {
          props.showThisProject(projName)
        }}
      >
        {projName}
      </li>
    )
  })
  return output
}
