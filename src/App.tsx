import {useState,FC, ChangeEvent} from 'react';
import './App.css';
import TodoForm from './components/todo/TodoForm';
import TodoList from './components/todo/TodoList';
import { Task } from './components/todo/models/task.model';


export type EditValType ={
  isActive:boolean;
  id:string;
}

const App:FC=()=>{
  const [tasks, setTasks]=useState<Task[]>([]);
  const [editVal, setEditVal]=useState<EditValType>({isActive:false,id:''});
  const currentDate:string=new Date().toISOString().split("T")[0];
  const nextDate:Date= new Date(new Date().valueOf() + 1000 * 60 * 60 * 24);
  
  const [formValues, setFormValues]=useState<Task>({
    id:'',
    title:'',
    description:'',
    dueDate:nextDate.toISOString().split('T')[0],
    isCompleted:false
  });

  const handleChange=(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    setFormValues({...formValues,[event.target.name]: event.target.value});
  }

  const addTask=()=>{
    const {title,description,dueDate}=formValues;
    if(title&&description&&dueDate){
      setTasks([...tasks,{...formValues,id:String(Date.now())}]);    
    }
  };

  const updateTask=(id:string)=>{
    const filteredTasks=tasks.map((task)=>task.id===id?{
      ...task,
      isCompleted:formValues.isCompleted,
      title:formValues.title,
      description:formValues.description,
      dueDate:formValues.dueDate
    }
    :task);
    setTasks(filteredTasks);
    setEditVal({id:'',isActive:false});
  }

  const editTask=(id:string)=>{
    const task=tasks.filter((task)=>task.id===id);
    setFormValues(task[0]);
  };

  const deleteTask=(id:string)=>{
    setTasks(tasks.filter((task)=>task.id!==id));
  }

  const completeTask=(id:string)=>{
    const allTasks=tasks.map((task)=>task.id===id?{...task,isCompleted:!task.isCompleted}:task);
    setTasks(allTasks);
  }
  
  return (
    <>
     <header className='bg-gray-600 py-2'>
        <h2 className='text-2xl font-semibold text-center text-gray-100'>
          Todo <span className='bg-gray-500 text-white rounded p-1'>24</span>
        </h2>
     </header>
     <main className='grid grid-cols-5 gap-1 max-w-[1378px] mx-auto h-screen my-5'>
        <TodoForm 
          formValues={formValues}
          currentDate={currentDate}
          tasks={tasks}
          handleChange={handleChange}
          addTask={addTask}
          editVal={editVal}
          updateTask={updateTask}
        />
        <TodoList 
          tasks={tasks}
          deleteTask={deleteTask}
          editTask={editTask}
          completeTask={completeTask}
          setEditVal={setEditVal}
          updateTask={updateTask}
        />
     </main>
    
    </>
  )
}

export default App
