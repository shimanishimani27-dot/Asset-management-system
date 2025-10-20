import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";

function Signup({ onSignup, onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Here you would normally create the account
    // For now, we'll just call onSignup
    onSignup();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="max-w-md w-full px-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div
              className="inline-block p-3 rounded-full mb-4"
              style={{ backgroundColor: "var(--color-zGreen)" }}
            >
              <User size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-600 mt-2">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

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
                  placeholder="john@example.com"
                  required
                />
                <Mail
                  size={20}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 pl-10 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="+260 123 456 789"
                  required
                />
                <Phone
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-2" required />
              <label className="text-sm text-gray-600">
                I agree to the{" "}
                <a
                  href="#"
                  className="hover:underline"
                  style={{ color: "var(--color-zGreen)" }}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="hover:underline"
                  style={{ color: "var(--color-zGreen)" }}
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "var(--color-zGreen)" }}
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={onSwitchToLogin}
                className="font-semibold hover:underline"
                style={{ color: "var(--color-zGreen)" }}
              >
                Sign in
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

export default Signup;
