import { SortBy, type User } from "../types.d";

interface Props {
    users: User[],
    showColors: boolean,
    handleDelete: (uuid: string) => void,
    changeSorting: (sort: SortBy) => void
}

export default function UsersList({ users, showColors, handleDelete, changeSorting }: Props) {

    return (
        <table width='100%'>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th style={{ cursor: "pointer" }} onClick={() => { changeSorting(SortBy.NAME) }}>First Name</th>
                    <th style={{ cursor: "pointer" }} onClick={() => { changeSorting(SortBy.LAST) }}>Last Name</th>
                    <th style={{ cursor: "pointer" }} onClick={() => { changeSorting(SortBy.COUNTRY) }}>Country</th>
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