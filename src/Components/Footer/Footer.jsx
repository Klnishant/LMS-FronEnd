import { BsFacebook,BsInstagram,BsLinkedin,BsTwitter,BsTelegram,BsWhatsapp } from "react-icons/bs";

function Footer(){
    return(
        <>
            <section className="height:[100px] bgc:grey-800 color-white width:[100vw] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-10">

                <section className="text-lg">
                    Copyright | All rights reserved 2023
                </section>

                <section className="flex items-center justify-center gap-5 text-2xl text-white">
                    <a href="" className="hover:text-yellow-500 transition-all ease-in duration-300">
                        <BsFacebook />
                    </a>
                    <a href="" className="hover:text-yellow-500 transition-all ease-in duration-300">
                        <BsInstagram />
                    </a>
                    <a href="" className="hover:text-yellow-500 transition-all ease-in duration-300">
                        <BsLinkedin />
                    </a>
                    <a href="" className="hover:text-yellow-500 transition-all ease-in duration-300">
                        <BsTwitter />
                    </a>
                    <a href="" className="hover:text-yellow-500 transition-all ease-in duration-300">
                        <BsTelegram />
                    </a>
                    <a href="" className="hover:text-yellow-500 transition-all ease-in duration-300">
                        <BsWhatsapp />
                    </a>
                </section>
            </section>
        </>
    )
};

export default Footer;