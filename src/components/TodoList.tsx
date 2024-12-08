import React from 'react'
import { ITask } from '../../types/tasks'
import Task from './Task'

interface TodoListProps {
    tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead className='bg-gray-200'>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        tasks.map((task) => (
                           <Task key={task.id} task={task} />
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default TodoList
