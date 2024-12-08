"use client";

import { FormEventHandler, HtmlHTMLAttributes, useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import Modal from './Modal';
import { MdModelTraining } from 'react-icons/md';
import { addTodo } from '../../api/api';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'



const AddTask = () => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');
  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // console.log(newTaskValue);
    await addTodo({
      id: uuidv4(),
      text : newTaskValue
    })
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  }

  return (
    <div>
      <button className='btn btn-primary w-full' onClick={() => setModalOpen(true)}>
        Add new task
        <AiOutlinePlus className='ml-2' size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
        <form onSubmit={handleSubmitNewTodo} >
          <h3 className='font-bold text-lg select-none'>Add new task</h3>
          <div className='mt-3'>
            <input
            value={newTaskValue}
            onChange={(e)=>setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs" />
            <button type='submit' className='btn ml-4 bg-green-600 text-white hover:bg-green-700'>Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTask
