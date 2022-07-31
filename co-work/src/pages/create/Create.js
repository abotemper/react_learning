import Select from 'react-select'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

//styles
import './Create.css'
import { timestamp } from '../../firebase/config';


//file global variables
const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
]

const Create = () => {
    //react hook
    const navigate = useNavigate()

    //properties
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate,setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError,setFormError] = useState(null)

    const [users, setUsers] = useState([])

    //hook things
    const { documents } = useCollection('users')
    const { user } = useAuthContext()
    const { addDocument, response } = useFirestore('projects')

    
    useEffect(() => {
        if(documents){
            const options = documents.map(user => {
                return  { value: user, label: user.displayName }
            })
            setUsers(options)
        }
    }, [documents]);

    //functions
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if(!category){
            setFormError('please select a project category')
            return
        }
        if(assignedUsers.length < 1) {
            setFormError('please assign the project at least 1 user')
            return
        }

    // project information
    const createdBy = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid
    }
    const assignedUsersList = assignedUsers.map((u) => {
        return { 
            displayName: u.value.displayName,
            photoURL: u.value.photoURL,
            id: u.value.id
        }
    })
    //create a project object
    const project = {
        name,
        details,
        category: category.value,
        dueDate: timestamp.fromDate(new Date(dueDate)),
        comments: [],
        createdBy,
        assignedUsersList
    }
    console.log(project)
    await addDocument(project)
    if (!response.error){
        navigate('/')
    }
    
}

    return (
        <div className='create-form'>
            <h2 className="page-title">create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>project name</span>
                    <input
                       required
                       type="text"
                       onChange={(e) => setName(e.target.value)}
                       value={name}
                    />
                </label>

                <label>
                    <span>project details</span>
                    <textarea
                       required
                       onChange={(e) => setDetails(e.target.value)}
                       value={details}
                    ></textarea>
                </label>

                <label>
                    <span>set due date</span>
                    <input
                       required
                       type="date"
                       onChange={(e) => setDueDate(e.target.value)}
                       value={dueDate}
                    />
                </label>

                <label >
                    <span>project category: </span>
                    <Select 
                        onChange={(option) => setCategory(option)}
                        options={categories}
                    />
                </label>

                <label >
                    <span>Assign to: </span>
                    <Select 
                       onChange={(option) => setAssignedUsers(option)}
                       options={users}
                       isMulti
                    />
                </label>

                <button className="btn">Add Project</button>

                {formError && <p className='error'>{formError}</p>}

            </form>
            Create
        </div>
    );


}

export default Create;
