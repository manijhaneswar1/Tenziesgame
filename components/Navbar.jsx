import React from "react";
export default function Navbar(){

    return(
        <div className="flex items-center justify-between bg-black text-white m-0 py-4 px-2.5 w-[100%] lg:px-14" >
            <a className="font-bold tracking-wider cursor-pointer lg:text-4xl">Tenzies</a>
            <div className="font-bold text-md flex gap-1">
               <a className="cursor-pointer font-medium font-serif relative top-4">- Jhaneswar</a>
            </div>
        </div>
    )
}
