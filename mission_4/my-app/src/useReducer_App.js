import React, { useRef, useReducer, useMemo, useCallback } from "react"
import UserList from "./UserList"
import CreateUser from "./CreateUser"
import useInputs from "./Hooks/useInputs"

function countActiveUsers(users) {
  console.log("Counting Active Users ...")
  return users.filter((user) => user.active).length
}

const initialState = {
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmali.com",
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
  ],
}

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return {
        users: state.users.concat(action.user),
      }
    case "TOGGLE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      }
    case "REMOVE_USER":
      return {
        users: state.users.filter((user) => user.id !== action.id),
      }
    default:
      return state
  }
}

function App() {
  const [{ username, email }, onChange, onReset] = useInputs({
    username: "",
    email: "",
  })
  const [state, dispatch] = useReducer(reducer, initialState)
  const nextId = useRef(4)

  const { users } = state

  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    })
    onReset()
    nextId.current += 1
  }, [username, email, onReset])

  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id,
    })
  }, [])

  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    })
  }, [])

  const count = useMemo(() => countActiveUsers(users), [users])

  return (
    <>
      <CreateUser uername={username} email={email} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>Number of Active Users : {count}</div>
    </>
  )
}

export default App
