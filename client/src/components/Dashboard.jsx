import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MainContent from "./MainContent";
import Footer from "./Footer";


export default function Dashboard() {
  return (
    <div className="flex  bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6">
          <MainContent />
        </main>
        <Footer />
      </div>
    </div>
  );
}
