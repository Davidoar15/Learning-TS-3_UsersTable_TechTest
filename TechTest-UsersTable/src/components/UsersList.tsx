import { type User } from "../types";

interface Props {
    users: User[],
    showColors: boolean,
    handleDelete: (uuid: string) => void
}

export default function UsersList({ users, showColors, handleDelete }: Props) {

    return (
        <table width='100%'>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Country</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    users.map((user, index) => {
                        const bgColor = index%2 === 0 ? '#333' : '#555' 
                        const color = showColors ? bgColor : 'transparent'

                        return (
                            <tr key={user.login.uuid} style={{ backgroundColor: color }}>
                                <td>
                                    <img src={user.picture.thumbnail} alt={user.name.first}/>
                                </td>
                                <td>
                                    {user.name.first}
                                </td>
                                <td>
                                    {user.name.last}
                                </td>
                                <td>
                                    {user.location.country}
                                </td>
                                <td>
                                    <button onClick={() => {handleDelete(user.login.uuid)}}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

// ! TABLE:
/*
? thead --- tbody 
    Very Important to create a Table
? th
    cells for thead
? tr 
    row
? td
    cells for tbody
*/