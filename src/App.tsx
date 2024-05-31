import { useState } from "react"
import ai from "./assets/ai.svg"

import Home from "./components/Home/Home";

function Ai() {
   return (
      <div className="min-h-full grid place-items-center">
         <h1 className="text-center text-white pb-10 text-[32px]">Let's get started!</h1>
         <div className="bg-[#BAB0B0] rounded-[20px] w-[524px] h-full inline-flex items-center justify-between p-[5px] gap-[10px]">
            <input type="text" placeholder="Quiz me about" className="rounded-l-[20px] px-3 w-full h-full" />
            <button className="bg-white px-3 rounded-r-[20px] w-[154px] inline-flex items-center justify-center">
               <img src={ai} alt="ai" />
            </button>
         </div>
      </div>
   )
}

function App() {


   const routes = {
      home: <Home />,
      ai: <Ai />,
   }

   return (
      <div className="min-h-screen bg-black relative">
         <div className="w-full mx-auto">
            <div className="bg-[#BAB0B0] rounded-[20px] mx-auto w-fit mx-auto h-full inline-flex items-center justify-between p-[5px] gap-[10px]">
               <button className="bg-white px-3 rounded-[20px] w-[154px] inline-flex items-center justify-center">
                  Regular
               </button>
               <button className="px-3 rounded-r-[20px] w-[154px] inline-flex items-center justify-center">
                  AI
               </button>
            </div>
         </div>
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {
               routes.ai
            }
         </div>
      </div>
   );
}

export default App;
