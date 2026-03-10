import { Link } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";


const PurchaseOrderDetails = () =>{




    return (
        <div>
            {/* Steacky Header */}
            <div className="bg-white sticky top-2 shadow-md flex justify-between items-center p-5 rounded-lg">
                {/* Left side */}
                <div className="flex gap-4">
                    {/* button : back to list */}
                    <Link 
                        className="bg-white rounded-2xl border-gray-200 border p-4"
                        to={`/Purchase-orders-liste`}>
                        <IoIosArrowRoundBack/>
                    </Link>
                    {/* PO overview */}
                    <div>
                        <div className="flex justify-start gap-2 ">
                            {/* PO Number */}
                            <h3 className=" font-bold text-lg "> BC6778-1APO </h3>
                            {/* status */}
                            <span className="bg-green-100 text-green-700 font-bold rounded-full py-1 px-4 text-sm">Apprové</span>
                        </div>
                        <div
                            className="text-gray-400 text-sm "
                        >Bon de Commande ·  <span>07 mars 2025</span> </div>
                    </div>
                </div>
                {/* Right side */}
                <button
                    className="bg-blue-700 rounded-lg p-3"
                >
                    <FaFilePdf color="white" />
                </button>
            </div>
            {/* Informations of Purchase Orders */}
            <div className="mt-10">
                {/* title */}
                <div className="flex justify-start gap-2 items-center bg-[#f8fafc] border border-[#f1f5f9] px-8 py-6 rounded-tr-xl rounded-tl-xl">
                    <CiBoxList color="black" size={25} />
                    <span className="text-[#6474a8] text-md ">  Informations Commande</span>
                </div>
                {/* infos */}
                <div className="bg-white">
                    <div>
                        <h3 className="text-[#697c95] text-sm ">N° Bon de Commande</h3>
                        <span className=" font-medium">BC-2025-0089</span>
                    </div>
                </div>
            </div>

        </div>
    )


}

export default PurchaseOrderDetails