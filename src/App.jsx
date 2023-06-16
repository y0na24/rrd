import { NavLink, useRoutes, useParams, Outlet, Navigate } from 'react-router-dom'

const routes = [
  {
    path: '',
    element: <HomePage />,
  },
  {
    path: 'users',
    element: <UsersLayout />,
    children: [
      {
        index: true,
        element: <UsersList />,
      },
      {
        path: ':userId',
        element: <UserPageLayout />,
        children: [
          {
            index: true,
            element: <UserPage />,
          },
          {
            path: 'edit',
            element: <EditUserPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
]

function HomePage() {
  return (
    <>
      <h1>HomePage</h1>
      <NavLink to={'/users'}>UsersList</NavLink>
    </>
  )
}

function UserPageLayout() {
  return <Outlet />
}

function UsersLayout() {
  return <Outlet />
}

function UsersList() {
  const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' },
    { id: 5, name: 'User 5' },
  ]

  return (
    <>
      <h2>
        <NavLink to={'/'}>Home page</NavLink>
      </h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <NavLink to={`/users/${user.id}`}>{user.name}</NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}

function UserPage() {
  const { userId } = useParams()

  return (
    <>
      <h1>UserPage</h1>
      <ul>
        <li>
          <NavLink to="/users">Users List Page</NavLink>
        </li>
        <li>
          <NavLink to={`/users/${userId}/edit`}>Edit user Page</NavLink>
        </li>
      </ul>
      <div>userId: {userId}</div>
    </>
  )
}

function EditUserPage() {
  const { userId } = useParams()

  return (
    <>
      <ul>
        <li>
          <NavLink to={-1}>previousPage</NavLink>
        </li>
        <li>
          <NavLink to={`/users/${Number(userId) + 1}`}>Next User</NavLink>
        </li>
        <li>
          <NavLink to={`/users`}>Users List</NavLink>
        </li>
      </ul>
    </>
  )
}

function App() {
  const elements = useRoutes(routes)

  return elements
}

export default App
