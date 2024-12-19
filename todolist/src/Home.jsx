import React, { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Create";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import './App.css';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id, currentStatus) => {
        axios.put(`http://localhost:3001/update/${id}`, { done: !currentStatus }) // Toggle 'done' state
            .then(result => {
                const updatedTodos = todos.map(todo => 
                    todo._id === id ? { ...todo, done: result.data.done } : todo
                );
                setTodos(updatedTodos);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(() => setTodos(todos.filter(todo => todo._id !== id)))
            .catch(err => console.log(err));
    };

    return (
        <div className="home">
            <h2>To Do List</h2>
            <Create />
            {
                todos.length === 0
                    ? <div>No tasks found</div>
                    : todos.map(todo => (
                        <div key={todo._id} className="task">
                            <div className="checkbox" onClick={() => handleEdit(todo._id, todo.done)}>
                                { todo.done 
                                    ? <BsFillCheckCircleFill className='icon done' /> 
                                    : <BsCircleFill className='icon' />
                                }
                                <p style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                                    {todo.task}
                                </p>
                            </div>
                            <div onClick={() => handleDelete(todo._id)}>
                                <BsFillTrashFill className='icon trash' />
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

export default Home;
