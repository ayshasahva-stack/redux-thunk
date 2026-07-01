import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTaskFromServer, deleteTaskFromServer } from '../slice/taskListSlice'

const Tasks = () => {
  const { taskLists, is_loading, error } = useSelector((state) => state.tasks)
  // console.log(taskLists);
  // console.log(is_loading);
  // console.log(error);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTaskFromServer())

  }, [])

  const handleDelete = (id) => {
    const is_confirm = window.confirm("are you sure you want to delete the task")

    if (is_confirm) {
      dispatch(deleteTaskFromServer(id))
    }

  }

  return (
    <div>
      <h1>List Task</h1>

      <div>
        {taskLists.map((item) => (
          <div key={item.id}>
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks
