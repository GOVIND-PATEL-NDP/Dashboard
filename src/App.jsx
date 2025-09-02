import React, { useState } from "react"
// import Dashboard from "./component/Dashboard"; 
import Dashboard from "./component/Dashboard/Dashboard";
import Sidebar from "./component/Layout/Sidebar";
import Header from "./component/Header";
const App = ()=>{

  const[SidebarCollapsed,setSideBarCollaped] = useState(false);
  const[currentPage,setCurrentPage] = useState("dashboard");
  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 vie-blue-50 to-indigo-50 dark:from-slate-900  dark-via-slate-800 dar:to-slate-900 transition-all duration-500">
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
      collapsed={SidebarCollapsed}
      onToggle={()=>setSideBarCollaped(!SidebarCollapsed)}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      /> 
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarCollapsed ={ SidebarCollapsed }
        onToggleSidebar = {() => setSideBarCollaped(!SidebarCollapsed)}
        />

        <main className="flex-1 overflow-y-auto bg-transparent">
          <div className="p-6 space-y-6">
              {currentPage ==="dashboard" && <Dashboard/>}
          </div>

        </main>
      </div>

    </div>

   </div>
  )
}

export default App;