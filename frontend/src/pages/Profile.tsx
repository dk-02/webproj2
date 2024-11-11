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

const Profile : React.FC<{ userId: string }> = ({ userId }) => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const fetchUserById = async (userId: string) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`);
            return response.data;
        } catch (error: any) {
            toast.error('Error fetching user.');
            console.error('Error fetching user:', error);
            throw error;
        }
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await fetchUserById(userId);
                setUser(data);
            } catch (err) {
                toast.error('Failed to fetch user');
            }
        };
        
        getUser();
    }, [userId]);

    return(
        <>
            <div className="h-screen w-full bg-slate-100 flex flex-col">
                <Header/>
                <div className="w-full h-full flex flex-col relative items-center justify-center">
                    <div className="absolute top-8 left-10">
                        <button onClick={() => navigate('/home')} className="hover:border-b-2 hover:border-b-indigo-400 transition-all duration-100 ease-in font-medium text-indigo-950">Go back</button>
                    </div>
                    <div className="w-1/4 min-h-1/2 rounded bg-indigo-300 flex flex-col items-center p-5">
                        <h1 className="font-bold text-2xl text-indigo-950">Profile info</h1>
                        <p className="flex flex-col items-center mt-5 text-lg">
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


export default Profile;