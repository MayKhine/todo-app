import { DateTime } from 'luxon'

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
        style={priorityColorNum == 0 ? bg1 : priorityColorNum == 1 ? bg2 : bg3}
      >
        <div style={style1}>{e.name}</div>
        {/* <div style={todoStyle2}>{priorityValueArr[e.priority]}</div> */}
        <div style={style2}> {formattedDate || 'no due date'} </div>
        <div style={style2}> {e.project}</div>
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
  margin: '8px 8px 8px 8px',
  alignSelf: 'flex-end',
  width: '100px',
}

const bg1 = {
  backgroundColor: 'green',
  color: 'black',
  borderRadius: '4px',
  border: '1px solid transparent',
  fontSize: '1em',
  margin: '5px 5px 5px 5px',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
}

const bg2 = {
  backgroundColor: 'yellow',
  color: 'black',
  borderRadius: '4px',
  border: '1px solid transparent',
  fontSize: '1em',
  margin: '5px 5px 5px 5px',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
}

const bg3 = {
  backgroundColor: 'red',
  color: 'black',
  borderRadius: '4px',
  border: '1px solid transparent',
  fontSize: '1em',
  margin: '5px 5px 5px 5px',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
}
