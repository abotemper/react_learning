import { useLocation } from "react-router-dom"

export default function Contact() {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const name = queryParams.get("name")

  //?name=mario
  return (
    <div>
        <h2>hey {name} ,Contact us here ...</h2>
        <p>飞流直下三千尺</p>
        <p>疑是银河落九天</p>
    </div>
  )
}
