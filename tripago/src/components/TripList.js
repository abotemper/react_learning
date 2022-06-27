//, useEffect, useCallback先不用了
import { useState } from 'react'
import './TripList.css'
import { useFetch } from '../hook/useFetch'

export default function TripList() {
    // const [trips, setTrips] = useState([])
    const [url, setUrl] = useState('http://localhost:3000/trips')

    const { data: trips, isPending, error } = useFetch(url, { type: 'GET' })

//依赖是一个函数的情况,这种情况这个函数还可以reuse
    // const fetchTrips = useCallback( async () => {
    //   const response = await fetch(url)
    //   const json = await response.json()
    //   setTrips(json)
    // }, [url])

    // useEffect(() => {
    //    fetchTrips()
    // }, [fetchTrips])

    //依赖是一个数组
    // useEffect(() => {
    //   fetch(url)
    //     .then(response => response.json())
    //     .then(json => setTrips(json))
    // }, [url])

    console.log(trips)

  return (
    <div className='trip-list'>
        <h1>Trip List</h1>
        {isPending && <div>loading trips...</div>}
        {error && <div>{error}</div>}
        <ul>
          {trips && trips.map(trip => (
            <li key={trip.id}>
              <h3>{trip.title}</h3>
              <p>{trip.price}</p>
            </li>
          ))}
          
        </ul>
        <div className='filters'>
          <button onClick={() => setUrl('http://localhost:3000/trips?loc=europe')}>
            European Trips
          </button>
          <button onClick={() => setUrl('http://localhost:3000/trips')}>
            All Trips
          </button>
        </div>
    </div>
  )
}
