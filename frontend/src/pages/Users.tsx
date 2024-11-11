import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    created_at: string;
}

const Users : React.FC = () => {
    const [userData, setUserData] = useState<User[] | null>(null);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/users/getAll`);
            return response.data;
        } catch (error: any) {
            toast.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers();
                setUserData(data);
            } catch (err) {
                toast.error('Failed to fetch user');
            }
        };
        
        getUsers();
    }, []);

    return(
        <>
            <div className="min-h-screen w-full bg-slate-100 flex flex-col">
                <Header/>
                <div className="w-full h-full flex flex-col relative items-center justify-center">
                    <div className="absolute top-8 left-10">
                        <button onClick={() => navigate('/home')} className="hover:border-b-2 hover:border-b-indigo-400 transition-all duration-100 ease-in font-medium text-indigo-950">Go back</button>
                    </div>
                    <h1 className="font-bold text-2xl mt-20 mb-5 text-indigo-950">Users</h1>
                    <div className="flex flex-col gap-5 items-center w-full h-full mb-5">
                        {userData?.map((user, idx) => (
                            <div key={user.id} className="bg-indigo-200 w-1/2 p-5 rounded">
                                <p  className="flex flex-col items-center text-lg">
                                    <span className="font-bold text-indigo-950">Username: </span>
                                    {user?.username}
                                    <span className="font-bold text-indigo-950">Password: </span>
                                    {user?.password}
                                    <span className="font-bold text-indigo-950">E-mail: </span>
                                    {user?.email}
                                    <span className="font-bold text-indigo-950">Date created:</span>
                                    {user?.created_at.split('T')[0]}
                                </p>
                            </div>
                            
                        ))}
                        
                    </div>
                </div>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                limit={2}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
        
    );

}


export default Users;