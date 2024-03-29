import './App.css'
import plus from '../public/image/plus.png'
import deleteIcon from '../public/image/Vector.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { nanoid } from 'nanoid'
import { todoAdd, todoDelete, todoCheck } from './redux/counterSlice'

function validate(name) {
  if (!name.current.value) {
    alert("Task kiriting!");
    name.current.focus();
    name.current.value = '';
    return false
  }
  return true;
}

function App() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  let localTodos = localStorage.getItem('todos')?JSON.parse(localStorage.getItem('todos')):[];
  const name = useRef();
  const status = useRef();
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.value);

  useEffect(() => {
    let a = 0;
    let b = 0;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].status) {
        a++;
      } else {
        b++
      }
    }
    setCounter1(a);
    setCounter2(b);
  }, [todos])

  function handleClick() {
    const isValid = validate(name);
    if (isValid) {
      let todo = {
        id:nanoid(),
        name:name.current.value,
        status:true
      }
      name.current.value = '';
      dispatch(todoAdd(todo));
      localTodos.push(todo);
      localStorage.setItem('todos', JSON.stringify(localTodos));  
    }
  }

  function handleDelete(id) {
    const isDelete = confirm("Rostdan ham o'chirmoqchimisiz?");
    if (isDelete) {
      dispatch(todoDelete(id));
      localTodos = localTodos.filter(el => el.id != id);
      localStorage.setItem('todos', JSON.stringify(localTodos));
    }
  }

  function handleCheck(todo) {
    let todod = {
      id:todo.id,
      name:todo.name,
      status:false
    }
    console.log(todod);
    dispatch(todoCheck(todod));
    localTodos = localTodos.map(el => {
      if (el.id == todod.id) {
        el = todod;
      }
      return el;
    });
    localStorage.setItem('todos', JSON.stringify(localTodos));
  }

  function handleReturn(todo) {
    let todod = {
      id:todo.id,
      name:todo.name,
      status:true
    }
    console.log(todod);
    dispatch(todoCheck(todod));
    localTodos = localTodos.map(el => {
      if (el.id == todod.id) {
        el = todod;
      }
      return el;
    });
    localStorage.setItem('todos', JSON.stringify(localTodos));
  }

  return (
    <>
     <div className="todo">
        <div className="todo-input">
          <input ref={name} type="text" placeholder='Add a new task'/>
          <button onClick={handleClick}><img src={plus} alt="plus icon" /></button>
        </div>

        {/* TASK SECTIONS  */}
        <div className="task">
              <h1 className="task--title">Tasks - {counter1}</h1>
        {
          todos.length > 0 &&
          todos.map((el, index) => {
            return (
              el.status == true &&
              <div key={index} className="task--card">
              <p className="task--text">{el.name}</p>
              <div className="task--actions">
                <input ref={status} type="checkbox" id='checked' />
                <label onClick={() => handleCheck(el)} htmlFor="checked">              
                  <i className="fa-solid fa-check"></i>
                </label>
                <img onClick={() => handleDelete(el.id)} src={deleteIcon} alt="delete" />
              </div>
            </div>
            )
          })
        }
        
        </div>
       

        {/* DONE SECTION  */}
        
      <div className="done">
            <h1 className="done--title">Done - {counter2}</h1>
      {
        todos.length > 0 && 
        todos.map((el, index) => {
          return (
            el.status == false &&
            <div  key={index} className="done--card">
              <p className="done--text">
                <del>{el.name}</del>
              </p>
              <div className="done--actions">
                <i onClick={() => handleReturn(el)} className="fa-solid fa-rotate-left"></i>
              </div>
            </div>
          )
        })
      }
      </div>


     </div>
    </>
  )
}

export default App
