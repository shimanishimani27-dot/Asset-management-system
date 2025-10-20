import { Search, Bell, User, LogOut } from "lucide-react";
import { useState } from "react";

function Navbar({ onLogout }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 outline-none text-gray-700"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell size={20} className="text-gray-600" />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
          >
            <User size={20} className="text-gray-600" />
            <span className="text-gray-700">Admin</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2">
                <User size={16} />
                Profile
              </button>
              <button
                onClick={onLogout}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-red-600"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
