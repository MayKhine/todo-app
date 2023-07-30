import './App.css'
import { BiTrash, BiListCheck } from 'react-icons/bi'

export const ProjectList = (props) => {
  const output = props.projArr?.map((projName, index) => {
    return (
      <li className="projectItem" key={index}>
        <div style={{ display: 'flex' }}>
          <div
            onClick={() => {
              props.showCurPage('project', projName)
            }}
            style={{ margin: '1px', flex: '1' }}
          >
            {' '}
            {projName}
          </div>
          <BiTrash
            style={deleteButtonStyle}
            onClick={() => props.deleteProject(projName)}
          >
            Delete
          </BiTrash>
        </div>
      </li>
    )
  })
  return output
}

const deleteButtonStyle = {
  color: 'black',
  borderRadius: '4px',
  border: '1px solid transparent',
  fontSize: '1em',
  cursor: 'pointer',
  height: '20px',
  width: '20px',
  alignItems: 'flex-end',
  // alignSelf: 'flex-end',
  // paddingTop: '8px',
  // marginRight: '8px',
  // paddingBottom: '4px',
}
