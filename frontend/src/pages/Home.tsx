import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

interface Post {
    id: string;
    title: string;
    user_id: string;
    created_at: Date;
}

interface User {
    id: string;
    username: string;
}

const Home : React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [postContent, setPostContent] = useState<string>("");
    const [showContentIdx, setShowContentIdx] = useState<number>(-1);
    const [newPost, setNewPost] = useState<{ title: string; content: string }>({ title: "", content: "" });
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [xssEnabled, setXssEnabled] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts/getAll`);
                const sortedPosts = response.data.sort((a: Post, b: Post) => {
                    const dateA = new Date(a.created_at);
                    const dateB = new Date(b.created_at);
                    return dateB.getTime() - dateA.getTime();
                });
                setPosts(sortedPosts);
                setLoading(false);
            } catch (err) {
                toast.error("Failed to load posts.");
                setLoading(false);
                console.error("Error fetching posts:", err);
            }
        };
        getPosts();
        setUser(getUserFromToken());
    }, []);


    const getPostById = async (postId : string) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`);

            console.log(response.data.content)

            setPostContent(response.data.content);
        } catch (err) {
            toast.error("Failed to load post.");
            console.error("Error fetching post:", err);
        }
    };


    const getUserFromToken = (): User | null => {
        const token = localStorage.getItem('accessToken');
        if (!token) return null;
    
        try {
            const decoded = jwtDecode<User>(token);
            return decoded;
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };


    // Sanitize input before saving to DB
    const sanitizeInput = (input: string) => {
        // Replacing <, >, &, " and ' with their HTML entities
        return input
            .replace(/&/g, "&amp;")    
            .replace(/</g, "&lt;")     
            .replace(/>/g, "&gt;")     
            .replace(/"/g, "&quot;")   
            .replace(/'/g, "&#39;");   
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowContentIdx(-1);

        const sanitizedTitle = sanitizeInput(newPost.title);
        const sanitizedContent = sanitizeInput(newPost.content);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/posts/newPost`, {
                title: xssEnabled ? newPost.title : sanitizedTitle,
                content: xssEnabled ? newPost.content : sanitizedContent,
                user_id: user?.id,
            });

            setPosts((prevPosts) => [response.data, ...prevPosts]); 
            setNewPost({ title: "", content: "" }); 
        } catch (err) {
            console.error("Error creating post:", err);
            toast.error("Error creating post.");
        }
    };

    const toggleShowContent = async (idx: number, id: string) => {
        if (showContentIdx !== idx) await getPostById(id);
        setShowContentIdx((prev) => (prev === idx ? -1 : idx));
    };    

    const handleChange = (src: "title" | "content", e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
    
        setNewPost((prevPost) => ({
            ...prevPost,
            [src]: value
        }));
    };

    const handleCheck = () => {
        setXssEnabled((prev) => !prev);
    };

    return(
        <>
            <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center">
                <Header/>
                <div className="flex w-full">

                    <div className="bg-slate-300 w-1/5 min-h-screen px-5 flex flex-col items-center">
                        <div className="border-2 border-indigo-500 px-5 h-20 rounded-full mt-5">
                            <p className="font-bold text-2xl mt-5 text-indigo-950">{user?.username}</p>
                        </div>
                        <button className="px-5 py-2 text-indigo-700 border-indigo-500 border-2 font-semibold rounded mt-5 hover:bg-slate-200" onClick={() => navigate('/profile')}>Profile page -&gt;</button>

                        <button className="px-5 py-2 text-indigo-700 border-indigo-500 border-2 font-semibold rounded mt-5 hover:bg-slate-200" onClick={() => navigate('/users')}>User mgmt page -&gt;</button>
                    </div>
                    <div className="w-4/5 flex flex-col items-center pb-10">
                        <form className="flex flex-col mt-10" onSubmit={handleCreatePost}>
                            <input type="text" name="title" value={newPost.title} placeholder="Post title..." className="p-2 border-indigo-400 border-[1px] rounded mb-2" onChange={(e) => handleChange("title", e)} />
                            <textarea name="content" value={newPost.content} placeholder="Create new post..." rows={5} cols={100} className="p-2 border-indigo-400 border-[1px] rounded min-h-11" onChange={(e) => handleChange("content", e)}/>

                            <div className="flex gap-2 justify-center items-center mt-3">
                                <input type="checkbox" name="secure" checked={xssEnabled} onChange={handleCheck} className="h-5 w-5 accent-indigo-600"/>
                                <label>XSS vulnerability {xssEnabled ? "enabled" : "disabled"}</label>
                            </div>

                            <button type="submit" className="bg-indigo-700 px-5 py-2 w-1/5 self-center text-white font-semibold rounded mt-10">Post</button>
                        </form>

                        <div className="border-b-2 border-b-slate-400 h-10 w-3/5"></div>

                        {loading && (
                            <div className="flex justify-center mt-4">
                                <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
                            </div>
                        )}

                        <div className="flex flex-col gap-5 w-2/5 mt-10">
                            {posts.map((post: Post, idx: number) => (
                                <React.Fragment key={post.id}>
                                    <div className="flex flex-col bg-indigo-200 rounded">
                                        <div className="p-5">
                                            <div className="font-bold text-center" dangerouslySetInnerHTML={{ __html: post.title }}/>
                                            {showContentIdx === idx && 
                                                <div className="text-justify mt-5" dangerouslySetInnerHTML={{ __html: postContent }}/>
                                            }
                                        </div>

                                        <button className="bg-indigo-700 px-5 py-2 w-fit self-center text-white font-semibold rounded mt-2 mb-5" onClick={() => toggleShowContent(idx, post.id)}>{showContentIdx === idx ? "Close" : "Read"}</button>
                                    </div>                                
                                </React.Fragment>                            
                            ))}
                        </div>

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


export default Home;