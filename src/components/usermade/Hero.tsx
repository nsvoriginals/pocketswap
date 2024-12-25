"use client"; 
import { Button } from "../ui/button";  
import { useRouter } from "next/navigation";  

export const Hero = () => {
  const router=useRouter()

  return (
<div className="flex justify-center items-center font-Nue  text-black">
        <div className="flex text-center mr-4 flex-col p-4 mt-10 justify-center items-center" >
            <h1 className="text-9xl leading-tight ">Extremely Fast & Secure payments with <span className="bg-black text-white">PocketSwap</span></h1>
           <p className="mt-5 w-2/3 text-center text-2xl">PocketSwap is a demo application build to avail transactions from one user to other securely.This application doesnot involve real money and just a demo of how the UPI works in real life</p>
         <Button className="mt-10" onClick={()=>router.push("register")} >Register</Button>
        </div>
        
    </div>
  );
};
