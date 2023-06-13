import Link from "next/link";
import Image from "next/image";


export default function Sidebar() {
    return (
        <div className="fixed w-20 lg:w-56 h-screen p-4 flex flex-col overflow-y-auto scrollbar-hidden scrollbar-thin scrollbar-thumb-violet-100">
            <div className="flex flex-col items-center h-full">
                <div className="flex flex-col w-44 h-5/6">
                    <Link href="/">
                        <Image src="/images/cs-soyMomoLogo.svg" width={120} height={120} alt='SoyMomo Logo' className="px-2 lg:px-0" />
                    </Link>
                    <p className="text-sm font-semibold hidden lg:flex text-white">Gustavo Lopez</p>
                    <p className="font-semibold mt-10 mb-4 hidden lg:flex text-white">Categorías</p>

                    <Link href="/dashboard">
                        <div className="flex flex-row items-center justify-center lg:justify-start my-10 lg:my-4 hover:bg-white hover:text-[#603BB0] text-white hover:rounded-xl p-2">
                            <Image src="/images/cs-personIcon.svg" width={25} height={25} alt='SoyMomo Logo' />
                            <p className="text-sm ml-4 hidden lg:flex">Postulantes</p>
                        </div>
                    </Link>

                    <Link href="/dashboard">
                        <div className="flex flex-row items-center justify-center lg:justify-start my-4 hover:bg-white hover:text-[#603BB0] text-white hover:rounded-xl p-2">
                            <Image src="/images/cs-dashboardIcon.svg" width={25} height={25} alt='SoyMomo Logo' />
                            <p className="text-sm ml-4 hidden lg:flex">Uso Apps</p>
                        </div>
                    </Link>

                    <Link href="/dashboard">
                        <div className="flex flex-row items-center justify-center lg:justify-start my-4 hover:bg-white hover:text-[#603BB0] text-white hover:rounded-xl p-2">
                            <Image src="/images/cs-watchIcon.svg" width={25} height={25} alt='SoyMomo Logo' />
                            <p className="text-sm ml-4 hidden lg:flex">Relojes</p>
                        </div>
                    </Link>

                    <Link href="/dashboard">
                        <div className="flex flex-row items-center justify-center lg:justify-start my-4 hover:bg-white hover:text-[#603BB0] text-white hover:rounded-xl p-2">
                            <Image src="/images/cs-tabletIcon.svg" width={25} height={25} alt='SoyMomo Logo' />
                            <p className="text-sm ml-4 hidden lg:flex">Tablets</p>
                        </div>
                    </Link>

                    <Link href="/dashboard">
                        <div className="flex flex-row items-center justify-center lg:justify-start my-4 hover:bg-white hover:text-[#603BB0] text-white hover:rounded-xl p-2">
                            <Image src="/images/cs-simIcon.svg" width={25} height={25} alt='SoyMomo Logo' />
                            <p className="text-sm ml-4 hidden lg:flex">SoyMomo SIM</p>
                        </div>
                    </Link>

                    <Link href="/dashboard">
                        <div className="flex flex-row items-center justify-center lg:justify-start my-4 hover:bg-white hover:text-[#603BB0] text-white hover:rounded-xl p-2">
                            <Image src="/images/cs-dispatchIcon.svg" width={25} height={25} alt='SoyMomo Logo' />
                            <p className="text-sm ml-4 hidden lg:flex">Despachos</p>
                        </div>
                    </Link>

                    <Link href="/dashboard">
                        <div className="flex flex-row items-center justify-center lg:justify-start my-4 hover:bg-white hover:text-[#603BB0] text-white hover:rounded-xl p-2">
                            <Image src="/images/cs-logoutIcon.svg" width={25} height={25} alt='SoyMomo Logo' />
                            <p className="text-sm ml-4 hidden lg:flex">Cerrar sesión</p>
                        </div>
                    </Link>
                    <div className="bg-[#8A66DA] text-white rounded-xl w-20 lg:w-44 mt-3 ">
                        <div className="flex flex-col p-4">
                            <div className="flex justify-between">
                                <Image src="/images/cs-questionIcon.svg" width={25} height={25} alt='SoyMomo Logo' />
                                <Image src="/images/cs-momoTicketIcon.svg" width={50} height={50} alt='SoyMomo Logo' className="mt-[-3.5vh]" />
                            </div>
                            
                            <p className="text-xs my-4">Informar problemas en el siguiente botón</p>
                            <button className="bg-[#FF5F95] text-white rounded-xl flex justify-center p-1 text-sm font-semibold">Agregar ticket</button>
                        </div>
                </div>
                </div>

            </div>
        </div>
    )
}