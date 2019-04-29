import React, {useState} from 'react'

const App = () => {

  const [name, setName] = useState<string>("Typescript")

  return <div>Welcome to {name}! <button onClick={() => {
    setName("Nextjs")
  }}>toggle</button></div>
}

export default App