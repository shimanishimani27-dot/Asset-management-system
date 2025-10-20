import { Upload, Download, FileText } from "lucide-react";

function Settings() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Profile Settings
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Admin"
                    className="w-full px-4 py-2 border rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="User"
                    className="w-full px-4 py-2 border rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="admin@assetmanager.com"
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  defaultValue="+260 123 456 789"
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>

              <button className="px-6 py-2 bg-zGreen text-white rounded-lg hover:bg-green-700 transition">
                Save Changes
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Security Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>

              <button className="px-6 py-2 bg-zOrange text-white rounded-lg hover:bg-orange-600 transition">
                Update Password
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Notification Settings
            </h2>
            <div className="space-y-4">
              {[
                {
                  label: "Email Notifications",
                  description: "Receive email updates about your account",
                },
                {
                  label: "Order Alerts",
                  description: "Get notified when new orders are placed",
                },
                {
                  label: "Low Stock Alerts",
                  description: "Receive alerts when products are low in stock",
                },
                {
                  label: "Weekly Reports",
                  description: "Get weekly summary reports via email",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <label className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      defaultChecked={i < 3}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* System Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              System Info
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Version</span>
                <span className="font-semibold text-gray-800">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-semibold text-gray-800">
                  Oct 20, 2025
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Storage Used</span>
                <span className="font-semibold text-gray-800">2.4 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan</span>
                <span className="font-semibold text-gray-800">
                  Professional
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg">
                <span className="text-gray-800">Backup Data</span>
                <Upload size={18} className="text-gray-600" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg">
                <span className="text-gray-800">Export Data</span>
                <Download size={18} className="text-gray-600" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg">
                <span className="text-gray-800">View Logs</span>
                <FileText size={18} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-red-800 mb-2">Danger Zone</h2>
            <p className="text-sm text-red-600 mb-4">
              Irreversible actions that affect your account
            </p>
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
