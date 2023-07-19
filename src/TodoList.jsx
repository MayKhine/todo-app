export const TodoList = (props) => {
    //listArr
    console.log('props:', props.listArr)

    const output = props.listArr.map((e, index) => (
        // console.log(e.name)
        // Todo(e.name)
        <div key={index}>
            {e.name} {e.date} {e.priority} {e.project}
        </div>
    ))
    // return <>Hi Helloddd</>
    return <>Hi {output}</>
}

const Todo = (props) => {
    console.log('Todo props: ', props)
    return (
        <>
            <div>
                {props.name} {props.name}
            </div>
        </>
    )
}
