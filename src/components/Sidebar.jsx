import {
  Home,
  Users,
  MapPin,
  Package,
  FileText,
  BarChart3,
  Settings,
  Briefcase,
} from "lucide-react";

function Sidebar({ currentPage, setCurrentPage }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "departments", label: "Departments", icon: Briefcase },
    { id: "provinces", label: "Provinces", icon: MapPin },
    { id: "assets", label: "Assets", icon: Package },
    { id: "staff", label: "Staff", icon: Users },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-green-800 text-white flex flex-col p-4 shadow-lg overflow-x-hidden">
      {/* Logo / Header */}
      <div className="mb-10 flex items-center gap-2">
        <div className="bg-orange-500 w-10 h-10 flex items-center justify-center rounded-lg text-xl font-bold">
          AM
        </div>
        <h1 className="text-2xl font-bold tracking-wide">(AOG)</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-orange-500 text-white shadow-md scale-[1.02]"
                      : "hover:bg-white/10 hover:scale-[1.01]"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer / App Version */}
      <div className="mt-6 text-xs text-white/60 text-center">
        © 2025 Asset Manager
      </div>
    </aside>
  );
}

export default Sidebar;
