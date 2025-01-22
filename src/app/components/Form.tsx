'use client'

import { Todos } from "@/types/types";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { ImageUploadMutation } from "../query/mutations";
import Image from "next/image";

interface Props{
  todo: Todos
  callback: (name : string, description : string)=>void;
  callbackDelete?: ()=>void;
  editMode?: boolean;
  createMode?: boolean;
}

export const Form = (params: Props) => {
    const [name, setName] = useState<string>(params.todo.todo)
    const [description, setDescription] = useState<string>('describe...')
    const {mutate : imageUploadMutation} = ImageUploadMutation()

    const router = useRouter();


    function handleChange(e : any) {
      const selectedFile = e.target.files[0]; // Get the selected file
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result; // Contains the Base64 string
          processImage(base64String as string)
        };
        reader.readAsDataURL(selectedFile); // Read the file as a data URL
      }
    }

    const processImage = (base64Image : string) => {
      const parts = base64Image.split(';');
      const mime = parts[0].split(':')[1];
      const image = parts[1];
      imageUploadMutation({id: params.todo.id, mime,image})
    }

    const callback = (e: any) => {
        e.preventDefault()
        params.callback(name, description)
    }

    const callbackDelete = (e: any) => {
      e.preventDefault()
      if(params.callbackDelete) params.callbackDelete()
    }

    const renderImage = () =>{
      if(params.todo.imageUrl)
        return (
          <div>
            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900 pt-6">
              Image:
            </label>
            <div className="mt-2">
              <img src={params.todo.imageUrl} height={50} width={100}/>
            </div>
          </div>
        )
    }

    const deleteButton = () =>{
      if(params.editMode)
        return (
          <button onClick={e=>callbackDelete(e)} type="button" className="text-sm/6 font-semibold text-red-600 pt-6 pl-3">
            Delete
          </button>
        )
    }

    const uploadImageButton = () =>{
      if(params.editMode)
        return (
          <div>
            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900 pt-6">
                  Choose Image:
            </label>
            <div className="mt-2">
              <input type="file" accept=".png,jpeg,.jpg" onChange={handleChange} />
            </div>
          </div>
        )
    }

    return (
        <div>
        <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                Todo Title:
              </label>
              <div className="mt-2">
                <input
                  type="name"
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={name}
                  onChange={e=>setName(e.target.value)}
                />
              </div>
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900 pt-6">
                Description:
              </label>
              <div className="mt-2">
                <input
                  type="name"
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={description}
                  onChange={e=>setDescription(e.target.value)}
                />
              </div>
              {renderImage()}
              {uploadImageButton()}
              {deleteButton()}
            </div>
          </div>
          
        </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button onClick={()=>router.back()} type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button 
          onClick={e=>callback(e)}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    </div>
    )
}