"use client"
import Head from "next/head";
import Image from 'next/image'
import Madewith from "@/components/usermade/Footer";
export default function About(){
    const twitterUrl="https://x.com/SheshiVardhan34"
    const githubUrl="https://github.com/nsvoriginals"
    const linkedInUrl="https://www.linkedin.com/in/sheshivardhan34/"
    return <div className="font-Nue flex flex-col justify-center items-center mt-20">
        <img src="/images/avatartion (1).png" alt="oops" />
        <h1 className="text-7xl text-center mt-10">Hi there , I'm @nsvoriginals <br />
        this is just a fun project build to understand fullstack Development using MERN / NextJS (technically Postgress)
       </h1>
       <h4 className="mt-10 text-5xl mt-10 ">join me</h4>
       <div className=" flex flex-row gap-5 w-10 h-10  mt-10 rounded-3xl justify-center items-center">
        <img className="rounded-3xl" onClick={() => window.open(twitterUrl, '_blank')}  src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1728086400&semt=ais_hybrid" alt="" />
        <img  className="rounded-3xl" onClick={() => window.open(githubUrl, '_blank')} src="https://th.bing.com/th/id/OIP.msJ5-X_TC957GXCRltCiPAHaHa?w=172&h=180&c=7&r=0&o=5&pid=1.7" alt="" />
       <img  className="rounded-3xl"  onClick={() => window.open(linkedInUrl, '_blank')} src="data:image/png;base64,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" alt="" />
       </div>
       <Madewith/>
    </div>
}