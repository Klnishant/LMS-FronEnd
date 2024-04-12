import { useNavigate } from "react-router-dom";

function Denied() {
    const naigate = useNavigate();
  return (
    <>
        <main className='h-screen w-full flex flex-col bg-slate-800 justify-center items-center'>
            <h1 className='text-9xl font-extrabold text-white tracking-widest'>
                403
            </h1>
            <div className='bg-black rounded text-sm text-white absolute rotate-12 px-5'>
                Access Denied
            </div>
            <button onClick={naigate(-1)} className="mt-5">
                <span className="relative block px-8 py-3 border border-current bg-[#1A2238]">
                    Go Back
                </span>
            </button>
        </main>
    </>
  )
}

export default Denied