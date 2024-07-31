import { FC, FormEvent,ChangeEvent } from 'react';
import { Task } from './models/task.model';
import { EditValType } from '../../App';

type TodoFormType ={
  formValues:Task;
  currentDate:string;
  tasks:Task[];
  handleChange:(e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>void;
  addTask:(e:FormEvent)=>void;
  editVal:EditValType;
  updateTask:(id:string)=>void;
}

const TodoForm:FC<TodoFormType>= ({formValues,currentDate,handleChange,addTask,updateTask,editVal}:TodoFormType) => {
  const {title,dueDate,description}=formValues;

  return (
    <aside className="col-span-5 md:col-span-2 xl:col-span-1 rounded-lg mb-5 md:mx-3">
      <h3 className='text-xl'>Todo</h3>
      <hr className='my-4'/>
      <div className='border-2 bg-slate-100 rounded w-[80vw] md:w-full mx-auto p-2'>
      <form className='text-sm'>
        <div className='mb-4 p-1 bg-gray-300 rounded'>
          <label htmlFor='title' className='text-gray-600 mb-2'>Task</label>
          <input type="text" name="title" id="title" value={title} onChange={handleChange} className='py-2.5 px-2 border-none outline-gray-300 w-full' placeholder='Type your todo...'/>
        </div>
        <div className='mb-4 p-1 bg-gray-300 rounded'>
          <label htmlFor={description} className='text-gray-600 mb-2'>Description</label>
          <textarea 
            className='border-none outline-gray-300 py-2.5 px-2 w-full resize-none' 
            name="description" 
            id="description" 
            value={description}
            onChange={handleChange}
            cols={30}
            rows={5} 
            title='task description'
          ></textarea>

        </div>
        <div className='mb-4 p-1 bg-gray-300 rounded'>
          <label htmlFor='dueDate' className='text-gray-600 mb-2'>Due date</label>
          <input type="date" name="dueDate" id="dueDate" onChange={handleChange} min={currentDate} value={dueDate} className='py-2.5 px-2 border-none outline-gray-300 w-full' placeholder='DD-MM-YYYY'/>
        </div>
        <div className='flex justify-center'>
          {editVal.isActive?<button type='button' className='bg-gray-600 hover:bg-gray-700 rounded text-white py-2 px-2 w-1/3 lg:w-full' onClick={()=>updateTask(editVal.id)}>Update</button>:
          <button type='button' className='bg-gray-600 hover:bg-gray-700 rounded text-white py-2 px-2 w-1/3 lg:w-full' onClick={addTask}>Add</button>}
        </div>
      </form>
      </div>
    </aside>
  )
}

export default TodoForm