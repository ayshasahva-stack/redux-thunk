import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTaskServer } from '../slice/taskListSlice';

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })

  const dispatch=useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, id: Date.now(), [name]: value })

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addTaskServer(formData))

  }


  return (
    <div>
      <h1>Create Task</h1>

      <form onSubmit={handleSubmit}>

        {/* title */}
        <label htmlFor="">Title : </label>
        <input
          type="text"
          placeholder='Enter Task'
          name="title"
          value={formData.title}
          onChange={handleChange} />
        <p></p>

        {/* description */}
        <label htmlFor="">Description : </label>
        <input
          type="text"
          placeholder='task description'
          name='description'
          value={formData.description}
          onChange={handleChange} /> <br /><br />

        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default CreateTask
