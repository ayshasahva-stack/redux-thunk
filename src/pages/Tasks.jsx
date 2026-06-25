import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getTaskFromServer} from '../slice/taskListSlice'

const Tasks = () => {
  const { taskLists, is_loading, error } = useSelector((state) => state.tasks)
  // console.log(taskLists);
  // console.log(is_loading);
  // console.log(error);

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getTaskFromServer())

  },[])

  return (
    <div>
      <h1>List Task</h1>

      <div>
        {taskLists.map((item)=>(
          <div >
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks
