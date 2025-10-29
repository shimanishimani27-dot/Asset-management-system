import { useState, useEffect } from "react";
import Staff from "./pages/Staff";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Provinces from "./pages/Provinces";
import Departments from "./pages/Departments";
import Assets from "./pages/Assets";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState("login");
  const [currentPage, setCurrentPage] = useState("dashboard");

  useEffect(() => {
    document.title = "asset management system(AOG)";
  }, []);

  // Authentication handlers
  const handleLogin = () => setIsAuthenticated(true);
  const handleSignup = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("dashboard");
  };

  // Page rendering
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "departments":
        return <Departments />;
      case "provinces":
        return <Provinces />;
      case "assets":
        return <Assets />;
      case "staff":
        return <Staff />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings onLogout={handleLogout} />;
      default:
        return <Dashboard />;
    }
  };

  // Auth Views
  if (!isAuthenticated) {
    return authView === "login" ? (
      <Login
        onLogin={handleLogin}
        onSwitchToSignup={() => setAuthView("signup")}
      />
    ) : (
      <Signup
        onSignup={handleSignup}
        onSwitchToLogin={() => setAuthView("login")}
      />
    );
  }

  // Main App Layout
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
