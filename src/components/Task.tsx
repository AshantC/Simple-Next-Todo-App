"use client";

import { FormEventHandler, useEffect, useState } from 'react';
import { ITask } from '../../types/tasks'
import { FaRegEdit } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import Modal from './Modal';
import { useRouter } from 'next/navigation'
import { deleteTodo, editTodo } from '../../api/api';

interface TaskProps {
    task: ITask;
}


const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            text: taskToEdit
        })
        setTaskToEdit("");
        setOpenModalEdit(false);
        router.refresh();
    }

    const handleDeleteTask = async (id: string) => {
        await deleteTodo(id);
        setOpenModalDelete(false);
        router.refresh();
    }




    return (
        <tr key={task.id}>
            <td className='w-full'>{task.text}</td>
            <td className='flex gap-5'>

                <FaRegEdit onClick={() => setOpenModalEdit(true)} size={25} className='cursor-pointer text-blue-500' />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
                    <form onSubmit={handleSubmitEditTodo} className=' text-center' >
                        <h3 className='font-bold text-lg select-none'>Edit task</h3>
                        <div className='mt-3'>
                            <input
                                value={taskToEdit}
                                onChange={(e) => setTaskToEdit(e.target.value)}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs" />
                            <button type='submit' className='btn ml-4  bg-green-600 text-white hover:bg-green-700'>Submit</button>
                        </div>
                    </form>
                </Modal>

                <FiTrash2 size={25} onClick={() => setOpenModalDelete(true)} className='cursor-pointer text-red-500' />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} >

                    <div className='modal-action flex gap-2 mt-[1px] justify-center items-center'>
                        <h3 className='text-lg text-center'>
                            Are you sure, you want to delete this task ?
                        </h3>
                        <button
                            onClick={() => handleDeleteTask(task.id)}
                            className='btn btn-error'>

                            Yes
                        </button>
                    </div>
                </Modal>

            </td>
        </tr>
    )
}

export default Task
