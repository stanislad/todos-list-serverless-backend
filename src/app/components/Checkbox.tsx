import React, { useState } from "react";
import { CompleteMutation } from "../query/mutations";

interface Props {
    completed : boolean;
    id: string;
}

export const Checkbox = (props  : Props) => {
    const [check, setCheck] = useState(props.completed)
    const {mutate : completeMutation} = CompleteMutation()

    const click = (e: any) => {
        e.stopPropagation()
        const newVal = !check
        setCheck(newVal)
        completeMutation({id: props.id, completed: newVal})
    }

    return (
        <div className="pt-6 pl-4">
        <input 
            id="default-checkbox" 
            type="checkbox" 
            checked={check}
            onClick={e=>click(e)}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            >
        </input>
        </div>
    )
}