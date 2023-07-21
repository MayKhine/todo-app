import { DateTime } from 'luxon'

export const TodoList = (props) => {
    const output = props.listArr?.map((e, index) => (
        // console.log(e.name)
        // Todo(e.name)
        <div key={index}>
            {e.name} {e.date} {e.priority} {e.project}
        </div>
    ))
    // return <>Hi Helloddd</>
    return <>{output}</>
}

const Todo = (props) => {
    return (
        <>
            <div>
                {props.name} {props.name}
            </div>
        </>
    )
}
