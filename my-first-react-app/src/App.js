// import logo from './logo.svg';
import './App.css'
import { useState } from 'react'
import Title from './components/Title'
import Modal from './components/Modal'
import Eventlist from './components/Eventlist'
import NewEventForm from './components/NewEventForm'

//use



function App() {
  // let name = 'mario'
  // const [name, setName] = useState('mario')
  const [showModal, setShowModal] = useState(false)
  const [showEvents, setShowEvents] = useState(true)
  const [events, setEvents] = useState([])

 const addEvent = (event) => {
    setEvents((prevEvents) => {
      return [...prevEvents, event]
    })
    setShowModal(false)
 }

  const handleClick = (id) => {
    setEvents((prevEvents) => {
      return prevEvents.filter((event) => {
        return id !== event.id
      })
    })
    console.log(id);
  };

  const handleClose = () => {
    setShowModal(false)
  }


  const subtitle = "tianbo shuai niao le "

  return (
    <div className="App">
      

      <Title title="events in your area" subtitle={subtitle}/>
     

      {showEvents && (
      <div>
        <button onClick={() => setShowEvents(false)}>hide events</button>
      </div>
      )}
      {!showEvents && (
      <div>
        <button onClick={() => setShowEvents(true)}>show events</button>
      </div>
      )}

      {showEvents && <Eventlist events={events} handleClick={handleClick} />}


        {/* <Modal >
            <h2>10% off coupon code</h2>
            <p>use the code ninja10 at the checkout</p>
        </Modal> */}
        {showModal && <Modal handleClose={handleClose} isSalesModal={true}>
          <NewEventForm addEvent={addEvent}/>
          <h2>陆游</h2>
          <p>伤心桥下春波绿，曾是惊鸿照影来</p>
          <a href='https://github.com/'> find out more </a> 
        </Modal>}
        <div>
          <button onClick={() => setShowModal(true)}>Add New Event</button>
        </div>

    </div>
  );
}

export default App;


/* <header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<p>
  Edit <code>src/App.js</code> and save to reload.
</p>
<a
  className="App-link"
  href="https://reactjs.org"
  target="_blank"
  rel="noopener noreferrer"
>
  Learn React & firebase
</a>
</header> */

   // if(name === 'luigi'){
    //   setName('mario')
    //   console.log(name)
    // }else if(name === 'mario'){
    //   setName('luigi')
    //   console.log(name)
    // }