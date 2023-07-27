import { DateTime } from 'luxon'
import { check } from 'prettier'

let priorityColorNum = 0

export const TodoList = (props) => {
  const priorityValueArr = ['Low', 'Medium', 'High']
  const output = props.listArr?.map((e, index) => {
    const formattedDate = e.date
      ? DateTime.fromISO(e.date).toLocaleString(DateTime.DATE_SHORT)
      : null
    priorityColorNum = e.priority

    return (
      <div
        key={index}
        // style={priorityColorNum == 0 ? bg1 : priorityColorNum == 1 ? bg2 : bg3}
        style={bg}
      >
        <input
          type="checkbox"
          checked={e.checked}
          onChange={() => {
            props.checkboxClicked(e.name)
          }}
        ></input>
        <div className="sideBar" style={sideBarStyle1}></div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={style1}>{e.name}</div>
            <div style={style2}> {formattedDate || 'no due date'} </div>
          </div>
          <div style={{ alignSelf: 'flex-start', marginLeft: '8px' }}>
            {e.project}
          </div>
        </div>
      </div>
    )
  })
  // return <>Hi Helloddd</>
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
  backgroundColor: 'gray',
  color: 'black',
  borderRadius: '4px',
  border: '1px solid transparent',
  fontSize: '1em',
  margin: '5px 5px 5px 5px',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
}

const sideBarStyle1 = {
  borderLeft: '6px solid green',
}

const sideBarStyle2 = {
  borderLeft: '6px solid yellow',
}

const sideBarStyle3 = {
  borderLeft: '6px solid red',
}
