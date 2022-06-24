import './NewEventForm.css'
import { useState, useRef } from 'react'


export default function NewEventForm({ addEvent }) {

    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('Dublin')

    // const title = useRef()
    // const date = useRef()

    const resetForm = () => {
        // title.current.value=''
        // date.current.value=''
        setTitle('')
        setDate('')
        setLocation('Dublin')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(title, date)
        const event = {
            title: title,
            date: date,
            location:location,
            id: Math.floor(Math.random() * 10000)
        }
        console.log(event)
        addEvent(event)
        resetForm()

    }

    // const handelChange = (e) => {
    //     setTitle(e.taget.value)
    // }


  return (
    <form className='new-event-form' onSubmit={handleSubmit}>
        <label >
            <span>event title: </span>
            <input 
                type="text" 
                // ref={title}
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
            />
        </label>

        <label >
            <span>event date: </span>
            <input 
                type="date" 
                // ref={date}
                onChange={(e) => setDate(e.target.value)} 
                value={date}
            />
        </label>
        <label>
            <span>event location</span>
            <select onChange={(e) => setLocation(e.target.value)}>
                <option value="Dublin">Dublin</option>
                <option value="Cork">Cork</option>
                <option value="Galway">Galway</option>
            </select>
        </label>
        <button>submit</button>
        {/* <p>titile - {title}, date - {date}</p>
        <p onClick={resetForm}>reset the form</p> */}
        
    </form>
  )
}
