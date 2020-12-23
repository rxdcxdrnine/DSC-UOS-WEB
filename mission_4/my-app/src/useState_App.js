import React, { useRef, useState, useMemo, useCallback } from "react"
import UserList from "./UserList"
import CreateUser from "./CreateUser"

function countActiveUsers(users) {
  console.log("Counting Active Users ...")
  return users.filter((user) => user.active).length
}

function App() {
  //User state
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  })
  const { username, email } = inputs //trace state "input"

  //onChange
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target
      setInputs({
        ...inputs,
        [name]: value,
      })
    },
    [inputs]
  )

  //UserList state
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ])

  // onCreate
  const nextId = useRef(4)
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    }
    setUsers((users) => users.concat(user))

    setInputs({
      username: "",
      email: "",
    })
    nextId.current += 1
  }, [username, email])

  //onRemove
  const onRemove = useCallback((id) => {
    setUsers((users) => users.filter((user) => user.id !== id))
  }, [])

  //onToggle
  const onToggle = useCallback((id) => {
    setUsers((users) =>
      users.map((user) => (user.id === id ? { ...user, active: !user.active } : user))
    )
  }, [])

  const count = useMemo(() => countActiveUsers(users), [users])

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>"Number of Active Users : {count}"</div>
    </>
  )
}

export default App

// 2 elements here
// CreateUser, UserList -> User

// If user write text in input, onChange event handler in User Component causes setInput to set state "input"
// constant username, email trace state "input"

// If user click register button, onClick event handler in User Component executes onCreate()
// in onCreate function, creates new user with traced value on username, email
// setUsers for users, setInputs for empty "input"

// If user click Remove button, onClick event handler in User Component xecutes onRemove(user.id)
// setUsers for users

// If user click username, onClick event handler in User component executes onToggle(user.id)
// setUsers for users
