
import { ITask } from "../types/tasks";

const baseUrl = 'http://localhost:3001';

// READ API
export const getAllTodos = async(): Promise<ITask[]>  =>{
    const res = await fetch(`${baseUrl}/tasks`, {cache:"no-store"});
    const todos = await res.json();
    return todos;
}

// ADD API
export const addTodo = async(todo:ITask): Promise<ITask>=>{
    const res = await fetch(`${baseUrl}/tasks`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const newTodo = await res.json();
    return newTodo;
}

// EDIT API
export const editTodo = async(todo:ITask): Promise<ITask>=>{
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const updatedTodo = await res.json();
    return updatedTodo;
}

// DELETE API
export const deleteTodo = async(id:string): Promise<void>=>{
    const res = await fetch(`${baseUrl}/tasks/${id}`,{
        method: 'DELETE'
    })
}
