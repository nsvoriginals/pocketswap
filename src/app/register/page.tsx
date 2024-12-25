"use client";
import { Input } from "@components/ui/input"; 
import { Button } from "@components/ui/button"; 
import { useRouter } from "next/navigation"; 
import { useAtom } from 'jotai';
import axios from "axios";
import RegisterInfoAtom from "../../../store/register";

const BACKEND_URL="http://localhost:3000"
 const Register = () => {
  const [registrationInfo, setRegistrationInfo] = useAtom(RegisterInfoAtom);
  const router = useRouter();

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/api/auth/register`,
        registrationInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Registration successful:", response.data);

      router.push("/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="font-Nue flex justify-center items-center mt-36">
      <div className="h-80 flex justify-center items-center flex-col mt-10">
        <form
          className="flex flex-col mt-10 justify-center"
          onSubmit={handleSubmit}
        >
          <h1 className="text-8xl mb-10 text-center">Register</h1>
          <label className="text-2xl text-start" htmlFor="username">
            Username
          </label>
          <Input
            name="name"
            value={registrationInfo.name || ""}
            onChange={handleChange}
            placeholder="Enter Username"
            className="m-2 h-10 border-black rounded-lg"
            type="text"
          />
          <label className="text-2xl text-start" htmlFor="email">
            Email
          </label>
          <Input
            name="email"
            value={registrationInfo.email || ""}
            onChange={handleChange}
            placeholder="Enter Email"
            className="m-2 h-10 border-black rounded-lg"
            type="text"
          />
          <label className="text-2xl text-start mt-5" htmlFor="password">
            Password
          </label>
          <Input
            name="password"
            value={registrationInfo.password || ""}
            onChange={handleChange}
            placeholder="Enter password"
            className="m-2 h-10 border-black rounded-lg"
            type="password"
          />

          <Button type="submit" className="mt-10 justify-self-center">
            Register
          </Button>

          <div className="flex justify-around mt-7">
            <h5>I already have an account?</h5>
            <Button onClick={() => router.push("/login")}>Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register