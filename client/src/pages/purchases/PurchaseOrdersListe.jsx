import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiShoppingCart,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiMoreVertical,
  FiCalendar,
  FiPackage,
} from "react-icons/fi";
import Pagination from "../../components/Pagination";



// const statutConfig = {
//   Approuvé: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", icon: FiCheckCircle },
//   "En attente": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", icon: FiAlertCircle },
//   Livré: { bg: "bg-sky-50", text: "text-sky-700", dot: "bg-sky-500", icon: FiCheckCircle },
//   Annulé: { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500", icon: FiXCircle },
// };

const formatCurrency = (amount) =>
  new Intl.NumberFormat("fr-MA", { style: "currency", currency: "MAD", minimumFractionDigits: 2 }).format(amount);

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });

export default function PurchaseOrdersListe() {
  const [search, setSearch] = useState("");
  const [selectedStatut, setSelectedStatut] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState(null);
  const itemsPerPage = 5;

console.log(currentPage)

  const fetchPurchaseOrders = async() =>{
    const result = await fetch(`/api/purchaseOrders?page=${currentPage}&limit=${itemsPerPage}`)
    if(!result.ok){
        throw new Error ("something went wrong while feching PO's")
    }
    return result.json()
  }

  const {data  ,isLoading,error} = useQuery({
    queryKey : ["Purchase Orders",currentPage],
    queryFn : fetchPurchaseOrders
  })

  

//   useEffect(()=>{
    if(!isLoading){
        console.log(data.purchaseOrders)
        console.log(data.totalPO)
    }
//   },[])


  const statuts = ["Tous", "Approuvé", "En attente", "Livré", "Annulé"];

  
    if(isLoading) return null;

  const filtered = data.purchaseOrders.filter((po) => {
    const matchSearch =
      po.po_number.toLowerCase().includes(search.toLowerCase()) ||
      po.subject.toLowerCase().includes(search.toLowerCase()) 
    //   ||
    //   po.createur.toLowerCase().includes(search.toLowerCase());
    const matchStatut = selectedStatut === "Tous" || po.statut === selectedStatut;
    return matchSearch && matchStatut;
  });

  const totalPages = (data?.totalPO / itemsPerPage)
//   const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const totalMontant = filtered.reduce((sum, bc) => sum + bc.montant, 0);
//   const approuves = bonsDeCommande.filter((bc) => bc.statut === "Approuvé").length;
//   const enAttente = bonsDeCommande.filter((bc) => bc.statut === "En attente").length;
//   const livres = bonsDeCommande.filter((bc) => bc.statut === "Livré").length;

  return (
    <div
      className="min-h-screen bg-slate-50"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
      onClick={() => setActiveMenu(null)}
    >
      {/* Sidebar strip accent */}
      <div className="fixed left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-600 via-violet-600 to-indigo-800 z-50" />

      <div className="pl-3">
        {/* TOP HEADER */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center shadow">
              <FiShoppingCart className="text-white text-base" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-none">Bons de Commande</h1>
              <p className="text-xs text-slate-400 mt-0.5">Gestion des achats</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
              <FiDownload className="text-slate-500" />
              <span>Exporter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors shadow-sm shadow-indigo-200">
              <FiPlus />
              <span className="hidden sm:inline">Nouveau BC</span>
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* KPI CARDS */}
          {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total des commandes", value: bonsDeCommande.length, sub: "Ce mois", icon: FiPackage, color: "from-indigo-500 to-indigo-700", light: "bg-indigo-50 text-indigo-600" },
              { label: "Approuvées", value: approuves, sub: `${Math.round((approuves / bonsDeCommande.length) * 100)}% du total`, icon: FiCheckCircle, color: "from-emerald-500 to-emerald-700", light: "bg-emerald-50 text-emerald-600" },
              { label: "En attente", value: enAttente, sub: "À traiter", icon: FiClock, color: "from-amber-500 to-amber-600", light: "bg-amber-50 text-amber-600" },
              { label: "Montant total", value: formatCurrency(totalMontant), sub: "Toutes commandes", icon: FiTrendingUp, color: "from-violet-500 to-violet-700", light: "bg-violet-50 text-violet-600", small: true },
            ].map((kpi, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${kpi.light} flex items-center justify-center`}>
                    <kpi.icon className="text-lg" />
                  </div>
                </div>
                <p className={`font-bold text-slate-800 ${kpi.small ? "text-lg" : "text-2xl"}`}>{kpi.value}</p>
                <p className="text-xs text-slate-500 mt-1">{kpi.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{kpi.sub}</p>
              </div>
            ))}
          </div> */}

          {/* FILTERS BAR */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="text"
                  placeholder="Rechercher un bon, fournisseur..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                />
              </div>

              {/* Status tabs */}
              <div className="flex gap-1.5 flex-wrap">
                {statuts.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSelectedStatut(s); setCurrentPage(1); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedStatut === s
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Table header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiFilter className="text-slate-400 text-sm" />
                <span className="text-sm font-medium text-slate-700">
                  {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
                </span>
              </div>
              <span className="text-xs text-slate-400">
                {/* Page {currentPage} sur {totalPages || 1} */}
              </span>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {["N° Bon", "Fournisseur", "Date", "Livraison","Montant HT", "Montant TTC", ""].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {isLoading ? <span>Loading ...</span> : 
                    filtered.map((po,index) => {
                    // const sc = statutConfig[bc.statut];
                    return (
                      <tr key={index} className="hover:bg-slate-50/70 transition-colors group">
                        <td className="px-5 py-4">
                          <span className="font-mono text-sm font-semibold text-indigo-600">{po.po_number}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm font-medium text-slate-800">{po.contact_person}</span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-slate-500">
                            <FiCalendar className="text-slate-300 text-xs" />
                            {formatDate(po.order_date)}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm text-slate-500">{formatDate(po.order_date)}</span>
                        </td>
                        {/* <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center">
                              <FiPackage className="text-slate-500 text-xs" />
                            </div>
                            <span className="text-sm font-medium text-slate-700">{bc.articles}</span>
                          </div>
                        </td> */}
                        <td className="px-5 py-4">
                          <span className="text-sm font-bold text-slate-800">{formatCurrency(po.total_before_tax)}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-sm font-bold text-slate-800">{formatCurrency(po.total_with_tax)}</span>
                        </td>
                        {/* <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                            {bc.statut}
                          </span>
                        </td> */}
                        {/* <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                              {bc.createur.charAt(0)}
                            </div>
                            <span className="text-sm text-slate-600 hidden lg:inline">{bc.createur}</span>
                          </div>
                        </td> */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-8 h-8 rounded-lg hover:bg-indigo-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
                              <FiEye className="text-sm" />
                            </button>
                            <button className="w-8 h-8 rounded-lg hover:bg-amber-50 flex items-center justify-center text-slate-400 hover:text-amber-600 transition-colors">
                              <FiEdit2 className="text-sm" />
                            </button>
                            <button className="w-8 h-8 rounded-lg hover:bg-rose-50 flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors">
                              <FiTrash2 className="text-sm" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                    
                  
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            {/* <div className="md:hidden divide-y divide-slate-100">
              {paginated.map((bc) => {
                const sc = statutConfig[bc.statut];
                return (
                  <div key={bc.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-sm font-bold text-indigo-600">{bc.id}</span>
                        <p className="text-sm font-medium text-slate-800 mt-0.5">{bc.fournisseur}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {bc.statut}
                        </span>
                        <button
                          className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"
                          onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === bc.id ? null : bc.id); }}
                        >
                          <FiMoreVertical />
                        </button>
                        {activeMenu === bc.id && (
                          <div className="absolute right-4 mt-20 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-1 w-40" onClick={(e) => e.stopPropagation()}>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 w-full"><FiEye /> Voir</button>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 w-full"><FiEdit2 /> Modifier</button>
                            <button className="flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 w-full"><FiTrash2 /> Supprimer</button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-slate-400">Date</p>
                        <p className="font-medium text-slate-700 mt-0.5">{formatDate(bc.date)}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-slate-400">Articles</p>
                        <p className="font-medium text-slate-700 mt-0.5">{bc.articles}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <p className="text-slate-400">Montant</p>
                        <p className="font-bold text-slate-800 mt-0.5 text-xs">{formatCurrency(bc.montant)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                        {bc.createur.charAt(0)}
                      </div>
                      <span className="text-xs text-slate-500">{bc.createur}</span>
                    </div>
                  </div>
                );
              })}
            </div> */}

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="py-16 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                  <FiPackage className="text-2xl text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium">Aucun bon de commande trouvé</p>
                <p className="text-slate-400 text-sm mt-1">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}  />
            
            {/* PAGINATION */}
            {/* {filtered.length > 0 && (
              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Affichage de <span className="font-semibold text-slate-700">{(currentPage - 1) * itemsPerPage + 1}</span>–
                  <span className="font-semibold text-slate-700">{Math.min(currentPage * itemsPerPage, filtered.length)}</span>{" "}
                  sur <span className="font-semibold text-slate-700">{filtered.length}</span>
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <FiChevronLeft className="text-sm" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                        currentPage === p
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <FiChevronRight className="text-sm" />
                  </button>
                </div>
              </div>
            )} */}
          </div>
        </main>
      </div>
    </div>
  );
}