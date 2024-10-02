import Link from "next/link";

export default function SighnUp(){
    return (
        <div className=" flex justify-center items-center">
        <h1 className="text-white font-mono text-center mt-40">No need to sign up as its a demo app u can play with it and see how it works  <span>
        <Link href='/' className=" w-32 h-14 mt-2 rounded-full border border-white hover:bg-black/10 cursor-pointer text-center">Redirect</Link></span></h1>
        
        </div>
        
    )
}