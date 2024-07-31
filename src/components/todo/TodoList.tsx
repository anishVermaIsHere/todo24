import {Dispatch, FC, SetStateAction} from 'react'
import Todo from './Todo'
import { Task } from './models/task.model'
import { EditValType } from '../../App';


export type TodoListPropsType ={
  tasks:Task[];
  deleteTask:(id:string)=>void;
  editTask:(id:string)=>void;
  completeTask:(id:string)=>void;
  setEditVal:Dispatch<SetStateAction<EditValType>>;
  updateTask:(id:string)=>void;
}

const TodoList:FC<TodoListPropsType> = ({tasks, deleteTask,editTask,completeTask,setEditVal}:TodoListPropsType) => {
  return (
    <section className='col-span-5 md:col-span-3 xl:col-span-4 mx-3'>
      <div className='flex justify-between'>
        <h3 className='text-xl'>All Todos</h3>
        <h4>Total {tasks.length}</h4>
      </div>
      
      <hr className='my-4'/>
      <div className='grid grid-rows-1 max-h-[90vh] overflow-auto pr-4 pb-6'>
        <div className='grid grid-cols-2 gap-6'>
          <div className='col-span-2 lg:col-span-1 flex flex-col gap-3'>
            <h4 className='text-sm text-blue-600 font-semibold'>New tasks</h4>
          {tasks.filter(task=>!task.isCompleted).map((task:Task)=><Todo 
                key={task.id} 
                task={task} 
                deleteTask={deleteTask} 
                editTask={editTask}
                completeTask={completeTask}
                setEditVal={setEditVal}
            />)}
          </div>
          <div className='col-span-2 lg:col-span-1 flex flex-col gap-3'>
          <h4 className='text-sm text-green-600 font-semibold'>Completed tasks</h4>
            {tasks.filter(task=>task.isCompleted).map((task:Task)=><Todo 
                key={task.id} 
                task={task} 
                deleteTask={deleteTask} 
                editTask={editTask}
                completeTask={completeTask}
                setEditVal={setEditVal}
            />)}
          </div>
        </div>
      </div>      
    </section>
  )
}

export default TodoList