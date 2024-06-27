import React, { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
}

// Using vanilla react to do fetching, but in production I'd use swr or react-query.
export const List = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/users'
            );
            const data = (await response.json()) as User[];

            return data.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,

                // The API gives no date of birth, going to use today.
                dateOfBirth: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
            }));
        };

        fetchData()
            .then((data) => {
                setUsers(data);

                setLoading(false);
            })
            .catch((e: Error) => setError(e));
    }, []);

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error)
        return (
            <p className="text-center text-lg text-red-500">
                Error: {error.message}
            </p>
        );

    return (
        <div className="container mx-auto p-4">
            <h4 className="font-bold">As custom list</h4>
            {users.map((user) => (
                <ListItem
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    dateOfBirth={user.dateOfBirth}
                    phone={user.phone}
                />
            ))}
            <h4 className="font-bold">As table</h4>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Date of Birth</th>
                        <th className="px-4 py-2">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.id}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">
                                {user.dateOfBirth}
                            </td>
                            <td className="border px-4 py-2">{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ListItem: React.FC<User> = ({ id, name, email, dateOfBirth, phone }) => {
    return (
        <div className="p-4 mb-4 border rounded-lg shadow-md bg-white">
            <p>
                <strong>ID:</strong> {id}
            </p>
            <p>
                <strong>Name:</strong> {name}
            </p>
            <p>
                <strong>Email:</strong> {email}
            </p>
            <p>
                <strong>Date of Birth:</strong> {dateOfBirth}
            </p>
            <p>
                <strong>Phone:</strong> {phone}
            </p>
        </div>
    );
};
