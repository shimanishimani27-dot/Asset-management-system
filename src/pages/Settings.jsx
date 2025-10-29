import React from "react";
import { Upload, Download, FileText, Shield, Bell, User } from "lucide-react";

function Settings({ onLogout }) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Shield size={28} className="text-green-600" />
          asset management system(AOG)
        </h1>
        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
        >
          Logout
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
              <User size={20} className="text-green-600" /> Profile Settings
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
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="User"
                    className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  defaultValue="+260 123 456 789"
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Update Profile
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
              <Shield size={20} className="text-orange-500" /> Security Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                Change Password
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
              <Bell size={20} className="text-purple-500" /> Notification Settings
            </h2>
            <div className="space-y-4">
              {[
                {
                  label: "Email Notifications",
                  description: "Receive updates about system activity",
                },
                {
                  label: "Asset Alerts",
                  description: "Get notified when assets need attention",
                },
                {
                  label: "System Warnings",
                  description: "Receive critical system alerts",
                },
                {
                  label: "Weekly Reports",
                  description: "Receive performance summaries via email",
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
                      defaultChecked={i < 2}
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
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">System Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Version</span>
                <span className="font-semibold">v1.0.0</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Last Updated</span>
                <span className="font-semibold">Oct 20, 2025</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Storage Used</span>
                <span className="font-semibold">2.4 GB</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Plan</span>
                <span className="font-semibold text-green-600">Professional</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: "Backup Data", icon: Upload },
                { label: "Export Data", icon: Download },
                { label: "View Logs", icon: FileText },
              ].map(({ label, icon }, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                >
                  <span className="text-gray-800">{label}</span>
                  {React.createElement(icon, { size: 18, className: "text-gray-600" })}
                </button>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border border-red-200 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold text-red-700 mb-2">Danger Zone</h2>
            <p className="text-sm text-red-600 mb-4">
              These actions are irreversible and affect your account.
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
