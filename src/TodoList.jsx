import { DateTime } from 'luxon'
import { BiTrash, BiListCheck } from 'react-icons/bi'

let priorityColorNum = 0

export const TodoList = (props) => {
  const priorityValueArr = ['Low', 'Medium', 'High']
  const output = props.listArr?.map((e, index) => {
    const formattedDate = e.date
      ? DateTime.fromISO(e.date).toLocaleString(DateTime.DATE_SHORT)
      : null
    priorityColorNum = e.priority

    return (
      <div key={index} style={bg}>
        <div
          className="sideBar"
          style={
            priorityColorNum == 0
              ? sideBarStyle1
              : priorityColorNum == 1
              ? sideBarStyle2
              : sideBarStyle3
          }
        ></div>

        <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <input
              type="checkbox"
              style={checkboxStyle}
              checked={e.checked}
              onChange={() => {
                props.checkboxClicked(e.name, e.project)
              }}
            ></input>
            <div style={style1}>{e.name}</div>
            <div style={style2}> {formattedDate || 'no due date'} </div>
            <BiTrash
              style={deleteButtonStyle}
              onClick={() => props.deleteTodo(e.name, e.project)}
            >
              Delete
            </BiTrash>
          </div>
          <div
            style={{
              alignSelf: 'flex-start',
              marginLeft: '35px',
              fontSize: '.8em',
            }}
          >
            {e.project}
          </div>
        </div>
      </div>
    )
  })
  return <>{output}</>
}

const style1 = {
  margin: '8px 8px 8px 8px',
  flex: '1',
  textAlign: 'left',
}

const style2 = {
  margin: '8px 0px 8px 8px',
  width: '90px',
}

const bg = {
  backgroundColor: '#E57E81ff',
  color: 'black',
  borderRadius: '4px',
  border: '1px solid transparent',
  fontSize: '1em',
  margin: '5px 5px 5px 5px',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
}
const gray1 = '#b3d0df'
const paynesGray = '#526C79ff'
const paynesGray2 = '#285B75ff'

const sideBarStyle1 = {
  borderLeft: '6px solid #b3d0df',
  borderRadius: '8px',
}

const sideBarStyle2 = {
  borderLeft: '6px solid #447892',
  borderRadius: '8px',
}

const sideBarStyle3 = {
  borderLeft: '6px solid #0f4864',
  borderRadius: '8px',
}

const checkboxStyle = {
  width: '20px',
}

const deleteButtonStyle = {
  color: 'black',
  borderRadius: '4px',
  border: '1px solid transparent',
  fontSize: '1em',
  cursor: 'pointer',
  height: '20px',
  width: '20px',
  alignSelf: 'center',
  marginLeft: '8px',
  textAlign: 'center',
  marginRight: '8px',
  paddingBottom: '4px',
}
