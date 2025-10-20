import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";

function Login({ onLogin, onSwitchToSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally validate credentials
    // For now, we'll just call onLogin
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div
              className="inline-block p-3 rounded-full mb-4"
              style={{ backgroundColor: "var(--color-zGreen)" }}
            >
              <User size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 pl-10 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="admin@assetmanager.com"
                  required
                />
                <User
                  size={20}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 pl-10 pr-10 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                  required
                />
                <Lock
                  size={20}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm hover:underline"
                style={{ color: "var(--color-zGreen)" }}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "var(--color-zGreen)" }}
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={onSwitchToSignup}
                className="font-semibold hover:underline"
                style={{ color: "var(--color-zGreen)" }}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© 2025 Asset Manager. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
