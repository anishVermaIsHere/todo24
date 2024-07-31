import {FC, useState,Dispatch,SetStateAction} from 'react'
import { Task } from './models/task.model'
import AlertModal from '../modal/AlertModal';
import { EditValType } from '../../App';


type TodoPropsType={
  task:Task;
  deleteTask:(id:string)=>void;
  editTask:(id:string)=>void;
  completeTask:(id:string)=>void;
  setEditVal:Dispatch<SetStateAction<EditValType>>;
}
const Todo:FC<TodoPropsType>= ({task,deleteTask,editTask,completeTask,setEditVal}:TodoPropsType) => {
  const [isOpen, setIsOpen]=useState<boolean>(false);
  const {id,title,description,dueDate,isCompleted}=task;
  const formatDate:string=dueDate.split('-').reverse().join('-');


  const removeTask=()=>{
    deleteTask(task.id);
    setIsOpen(false);
  }

  const edit=()=>{
    editTask(task.id);
    setEditVal({id:task.id,isActive:true});
  }


  return (
    <>
    <div className='col-span-3 lg:col-span-1 flex flex-col p-3 bg-gray-100 border shadow-md rounded-lg'>
    {isOpen&&<AlertModal setIsOpen={setIsOpen} deleteTask={removeTask} />}
        <div className='flex justify-between mb-3'>
          <p className='flex items-center font-semibold truncate'> 
            {!isCompleted&&<span 
            className='text-gray-600 hover:text-green-600 hover:scale-110 transition-all duration-300 cursor-pointer mr-2' 
            title='complete task button' 
            onClick={()=>completeTask(id)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </span>}
            {title}
          </p>
          <div className='flex gap-2'>
            {!isCompleted&&<span className='text-gray-600 cursor-pointer' title='edit task button' onClick={edit}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
            </span>
            }
            <span className='text-gray-600 cursor-pointer' title='delete task button' onClick={()=>setIsOpen(!isOpen)}>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
            </span>
          </div>
        </div>
        <div className='py-1 px-2 mb-3 bg-white rounded-lg min-h-20'>
          {description} 
        </div>      

        {
          new Date()<new Date(dueDate)&&!isCompleted? <div className='text-xs text-red-500 font-semibold'>
            Due on: {formatDate} 
          </div> :
          <div className='text-xs text-green-500 font-semibold'>
            Completed on {formatDate} 
          </div> 
        }

        {isCompleted?<p className='bg-green-300 text-xs rounded-full px-3 mt-4 h-4 w-full transiton-all duration-300'></p>
        :
        ""}
           
    </div>
    </>
  )
}

export default Todo