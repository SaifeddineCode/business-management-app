import { Link } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { FaRegBuilding } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";



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
                    <CiBoxList color="black" size={20} />
                    <span className="text-[#6474a8] text-md ">  Informations Commande</span>
                </div>
                {/* infos */}
                <div className="bg-white px-8 py-6 flex flex-col gap-5  rounded-br-xl rounded-bl-xl">
                    <div className="flex justify-between items-center">
                        <div className="w-1/2">
                            <h3 className="text-[#697c95] text-sm ">N° Bon de Commande</h3>
                            <span className=" font-medium">BC-2025-0089</span>
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-[#697c95] text-sm ">Date</h3>
                            <span className=" font-medium">07 mars 2025</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="w-1/2">
                            <h3 className="text-[#697c95] text-sm ">Devise</h3>
                            <span className=" font-medium">MAD</span>
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-[#697c95] text-sm ">Type de code</h3>
                            <span className=" font-medium">Sociéte</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="w-1/2">
                            <h3 className="text-[#697c95] text-sm ">Incoterm</h3>
                            <span className=" font-medium">DDP</span>
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-[#697c95] text-sm ">Lieu de livraison</h3>
                            <span className=" font-medium">Casablanca, Zone Industrielle Oukacha</span>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h3 className="text-[#697c95] text-sm ">Objet</h3>
                        <span className=" font-medium">Fourniture de matériel informatique et périphériques</span>
                    </div>
                
                </div>
            </div>

            {/* Informations about supplier */}

            <div className="mt-10">
                {/* title */}
                <div className="flex justify-start gap-2 items-center bg-[#f8fafc] border border-[#f1f5f9] px-8 py-6 rounded-tr-xl rounded-tl-xl">
                    <FaRegBuilding color="black" size={20} />
                    <span className="text-[#6474a8] text-md ">  Fournisseur</span>
                </div>
                {/* infos supplier */}
                <div className="bg-white px-8 py-6 flex justify-start gap-5 rounded-br-xl rounded-bl-xl">
                    <div >
                            <span className="bg-purple-900 rounded-2xl py-3 px-5 text-white text-xl font-medium">A</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h3 className="text-[#697c95] text-sm ">Nom</h3>
                            <span className=" font-medium">Atlas Informatique SARL </span>
                        </div>
                        <div>
                            <h3 className="text-[#697c95] text-sm ">Adresse</h3>
                            <span className=" font-medium">123 Bd Mohammed V, Casablanca 20000, Maroc </span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="text-[#697c95] text-sm ">Contact</h3>
                                <span className=" font-medium">contact@atlas-info.ma </span>
                            </div>
                            <div>
                                <h3 className="text-[#697c95] text-sm ">Téléphone</h3>
                                <span className=" font-medium">+212 522 456 789 </span>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            {/* Details about purchase order  */}
            <div className="mt-10">
                {/* title */}
                <div className="flex justify-start gap-2 items-center bg-[#f8fafc] border border-[#f1f5f9] px-8 py-6 rounded-tr-xl rounded-tl-xl">
                    <BsBoxSeam color="black" size={20} />
                    <span className="text-[#6474a8] text-md ">  Détails Bon de Commande</span>
                </div>
                {/* infos supplier */}
                <div className="bg-white px-8 py-6   rounded-br-xl rounded-bl-xl">
                    <table className="w-full ">
                        <thead className="border-b-2 border-[#DDD] ">
                            <tr >
                                <th className="text-start">
                                    <span className="text-gray-400 font-normal text-sm ">Réf.</span>    
                                </th>  
                                <th className="text-start">
                                    <span className="text-gray-400 font-normal text-sm ">Produit</span>
                                </th>
                                <th>
                                    <span className="text-gray-400 font-normal text-sm">Unité</span>
                                </th>
                                <th>
                                    <span className="text-gray-400 font-normal text-sm">Qté</span>
                                </th>
                                <th>
                                    <span className="text-gray-400 font-normal text-sm">Tarif U.HT</span>
                                </th>
                                <th>
                                    <span className="text-gray-400 font-normal text-sm">Remise %</span>
                                </th>
                                <th>
                                    <span className="text-gray-400 font-normal text-sm">Montant HT</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            <tr>
                                <td className="p-1"> 
                                    <span className=" bg-blue-100  font-medium text-sm  rounded-xl text-center px-3 py-1 text-blue-800">Lap-001</span>
                                </td>
                                <td className="p-1">
                                    <span className="font-bold text-sm">LAPTOP DELL latitude</span>
                                </td>
                                <td className="p-1">
                                    <span className="text-sm text-gray-400">PCE</span>
                                </td>
                                <td className="p-1">
                                    <span>5</span>
                                </td>
                                <td className="p-1">
                                    <span>12.500,00 MAD</span>
                                </td>
                                <td className="p-1">
                                    <span className="text-sm bg-pink-100 text-pink-600 py-1 px-3 rounded-lg text-center">5%</span>
                                </td>
                                <td className="p-1">
                                    <span className="font-bold">59.375,00 MAD</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )


}

export default PurchaseOrderDetails