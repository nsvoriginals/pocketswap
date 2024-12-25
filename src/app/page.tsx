"use client"
import { Hero } from "@/components/usermade/Hero"

import { Feature } from "@/components/usermade/Features"
import { Built } from "@/components/usermade/Builtwith"
import Madewith from "@/components/usermade/Footer"

 const Home=()=>{
    return <div>
         <Hero></Hero>
            <Feature></Feature>
            <Built></Built>
            <Madewith></Madewith>
    </div>
}

export default Home