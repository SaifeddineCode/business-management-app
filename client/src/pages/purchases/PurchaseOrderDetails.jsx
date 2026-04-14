import { Link, useParams } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { FaRegBuilding } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";



const PurchaseOrderDetails = () =>{


    const [selectedPo,setSelectedPo] = useState({})
    const [purchaseDetails,setPurchaseDetails] = useState([])

    const params = useParams()

    

    const fetchSinglePurchaseOrder = async () =>{
         const {id} = params;
        try{
            const result = await fetch(`/api/purchaseOrders/${id}`)
            const data = await result.json()
            // console.log(data.purchaseOrder[0])
            console.log(data.purchaseOrderItems)
            

            if(result.ok){
                // setSelectedPo(data[0])
                setSelectedPo(data.purchaseOrder[0])
                setPurchaseDetails(data.purchaseOrderItems)
            }
            // console.log(data[0])
            
        }catch(err){
            return console.log(err)
        }
    }

    // const {data,isloading,err} = useQuery({
    //     queryKey:["SinglePurchaseOrder"],
    //     queryFn:fetchSinglePurchaseOrder
    // })

    useEffect(()=>{
        fetchSinglePurchaseOrder()
    },[])



    if(!selectedPo.po_number) return (<>Loading...</>)
    

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
                            <h3 className=" font-bold text-lg "> {selectedPo.po_number} </h3>
                            {/* status */}
                            <span className="bg-green-100 text-green-700 font-bold rounded-full py-1 px-4 text-sm">Apprové</span>
                        </div>
                        <div
                            className="text-gray-400 text-sm "
                        >Bon de Commande ·  <span> {selectedPo.order_date.split("T")[0]} </span> </div>
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
                            <span className=" font-medium"> {selectedPo.po_number} </span>
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-[#697c95] text-sm ">Date</h3>
                            <span className=" font-medium"> {selectedPo.order_date.split("T")[0]} </span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="w-1/2">
                            <h3 className="text-[#697c95] text-sm ">Devise</h3>
                            <span className=" font-medium"> {selectedPo.currency} </span>
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-[#697c95] text-sm ">Type de code</h3>
                            <span className=" font-medium">Sociéte</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="w-1/2">
                            <h3 className="text-[#697c95] text-sm ">Incoterm</h3>
                            <span className=" font-medium"> {selectedPo.incoterm} </span>
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-[#697c95] text-sm ">Lieu de livraison</h3>
                            <span className=" font-medium"> {selectedPo.delivery_location} </span>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h3 className="text-[#697c95] text-sm ">Objet</h3>
                        <span className=" font-medium"> {selectedPo.subject} </span>
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
                            <span className=" font-medium"> {selectedPo.supplier_name}  </span>
                        </div>
                        <div>
                            <h3 className="text-[#697c95] text-sm ">Adresse</h3>
                            <span className=" font-medium">{selectedPo.supplier_address} </span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="text-[#697c95] text-sm ">Contact</h3>
                                <span className=" font-medium"> {selectedPo.supplier_email} </span>
                            </div>
                            <div>
                                <h3 className="text-[#697c95] text-sm ">Téléphone</h3>
                                <span className=" font-medium"> {selectedPo.supplier_phone} </span>
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
                    {purchaseDetails.length > 0 
                    ?
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
                            {purchaseDetails.length > 0 ? 
                            purchaseDetails.map((po_item,index)=>{

                                return (
                                    <tr key={index}>
                                <td className="p-1"> 
                                    <span className=" bg-blue-100  font-medium text-sm  rounded-xl text-center px-3 py-1 text-blue-800"> {po_item.reference} </span>
                                </td>
                                <td className="p-1">
                                    <span className="font-bold text-sm">{po_item.product_name}</span>
                                </td>
                                <td className="p-1">
                                    <span className="text-sm text-gray-400">{po_item.unit}</span>
                                </td>
                                <td className="p-1">
                                    <span> {po_item.quantity} </span>
                                </td>
                                <td className="p-1">
                                    <span> {po_item.unit_price} </span>
                                </td>
                                <td className="p-1">
                                    <span className="text-sm bg-pink-100 text-pink-600 py-1 px-3 rounded-lg text-center">{po_item.discount_percent}%</span>
                                </td>
                                <td className="p-1">
                                    <span className="font-bold">{po_item.unit_price}MAD</span>
                                </td>
                            </tr>
                                )

                            })
                            :
                            <p> Ce bon de commande n'a pas encore des produits </p>
                            }
                        </tbody>
                    </table>
                    :
                    <p> Ce bon de commande n'a pas encore des produits </p>
                    }
                </div>
            </div>
        </div>
    )


}

export default PurchaseOrderDetails