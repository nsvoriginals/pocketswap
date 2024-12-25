"use client";

import { Label } from "@radix-ui/react-label";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import Madewith from "@/components/usermade/Footer";
import axios from "axios";
import LoginInfoAtom from "../../../store/login";


const BACKEND_URL="http://localhost:3000"
 const Login = () => {
    const [loginInfo, setLoginInfo] = useAtom(LoginInfoAtom);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`/api/auth/login`, loginInfo, {
                headers: {
                    "Content-Type": "application/json",
                   
                },
            });
            console.log("Login successful:", response.data);
           console.log(response)
           
            
            localStorage.setItem("token", response.data["auth token"]);

           
            router.push("/dashboard");
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="font-Nue flex justify-center items-center mt-36">
            <div className="h-80 flex justify-center items-center flex-col mt-10 mb-28px">
                <form className="flex flex-col mt-10 justify-center" onSubmit={handleSubmit}>
                    <h1 className="text-8xl mb-10 text-center">Login</h1>
                    <Label className="text-2xl text-start" htmlFor="email">
                        email
                    </Label>
                    <Input
                        onChange={handleChange}
                        value={loginInfo.email}
                        name="email"
                        placeholder="Enter Email"
                        className="m-2 h-10 border-black rounded-lg"
                        type="text"
                    />

                    <Label className="text-2xl text-start mt-5" htmlFor="password">
                        Password
                    </Label>
                    <Input
                        onChange={handleChange}
                        value={loginInfo.password}
                        name="password"
                        placeholder="Enter password"
                        className="m-2 h-10 border-black rounded-lg"
                        type="password"
                    />

                    <Button type="submit" className="mt-10 justify-self-center">
                        Login
                    </Button>

                    <div className="flex justify-around mt-7">
                        <h5>I don't have an account?</h5>
                        <Button onClick={() => router.push("/register")} className="ml-5">
                            Register
                        </Button>
                    </div>
                </form>
                <Madewith></Madewith>
            </div>
        
        </div>
    );
};
export default Login