import './App.css'

export const ProjectList = (props) => {
    const output = props.projArr?.map((projName, index) => {
        return (
            <li className="projectItem" key={index}>
                {projName}
            </li>
        )
    })
    return output
}
