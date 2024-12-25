"use client"
import { Card } from "./Cards"

export const Feature=()=>{
  return <div>
    <h1 className="text-7xl font-Nue text-center mt-10 mb-24">Features</h1>
     <div className="flex justify-center items-center gap-2 m-8">
     <Card title="Authentication" Description="Built basic Authentication with jwt"  ImgSource="https://static.vecteezy.com/system/resources/previews/046/863/227/non_2x/a-linear-mini-illustration-of-user-authentication-vector.jpg"></Card>
      <Card  title="Database Integration" Description="Connected with fully functional Database for real-time data access" ImgSource="https://t3.ftcdn.net/jpg/02/37/47/76/360_F_237477664_WgTOCcCRq6HIlsaftOxawUZ7BEAAKt3h.jpg"></Card>
      <Card title="Dynamic Frontend " Description="Using React to create smooth and dynamic frontends" ImgSource="https://www.shutterstock.com/image-vector/react-native-icon-260nw-1141502429.jpg"></Card>
     </div>
  </div>
}