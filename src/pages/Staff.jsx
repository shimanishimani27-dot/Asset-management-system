// Staff.jsx — Dated: 26 Oct 2025
import { useMemo, useState } from "react";
import { Search, Filter, Plus, Edit, Trash2, Eye, LayoutGrid, Rows, X, ChevronDown } from "lucide-react";

const Staff = () => {
  const [staffList, setStaffList] = useState([
    { name: "John Doe", id: "STF001", department: "IT", province: "Lusaka", role: "Technician", email: "john.doe@example.com", status: "Active", office: "HQ" },
    { name: "Jane Smith", id: "STF002", department: "Finance", province: "Copperbelt", role: "Accountant", email: "jane.smith@example.com", status: "On Leave", office: "Ndola" },
    { name: "Mike Johnson", id: "STF003", department: "HR", province: "Central", role: "HR Officer", email: "mike.j@example.com", status: "Active", office: "Kabwe" },
    { name: "Anna Brown", id: "STF004", department: "Procurement", province: "Southern", role: "Procurement Lead", email: "anna.b@example.com", status: "Inactive", office: "Choma" },
    { name: "Grace Phiri", id: "STF005", department: "IT", province: "Lusaka", role: "Support", email: "grace.p@example.com", status: "Active", office: "HQ" },
    { name: "Peter Banda", id: "STF006", department: "Operations", province: "Eastern", role: "Ops Supervisor", email: "peter.b@example.com", status: "Active", office: "Chipata" },
  ]);
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [provFilter, setProvFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [view, setView] = useState("table");
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ name: "", id: "", email: "", phone: "", department: "", role: "", office: "", province: "", status: "Active" });
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const departments = useMemo(() => ["All", ...Array.from(new Set(staffList.map(s => s.department)))], [staffList]);
  const provinces = useMemo(() => ["All", ...Array.from(new Set(staffList.map(s => s.province)))], [staffList]);
  const statuses = ["All", "Active", "On Leave", "Inactive"];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = staffList.filter(s => {
      const matchesQ = !q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || (s.role || "").toLowerCase().includes(q) || (s.email || "").toLowerCase().includes(q);
      const matchesDept = deptFilter === "All" || s.department === deptFilter;
      const matchesProv = provFilter === "All" || s.province === provFilter;
      const matchesStatus = statusFilter === "All" || s.status === statusFilter;
      return matchesQ && matchesDept && matchesProv && matchesStatus;
    });
    arr = arr.sort((a,b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "date-desc") return (b._createdAt || 0) - (a._createdAt || 0);
      if (sortBy === "date-asc") return (a._createdAt || 0) - (b._createdAt || 0);
      return 0;
    });
    return arr;
  }, [staffList, query, deptFilter, provFilter, statusFilter, sortBy]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = useMemo(() => filtered.slice((page-1)*pageSize, page*pageSize), [filtered, page]);

  const openAdd = () => { setEditIndex(null); setForm({ name: "", id: "", email: "", phone: "", department: departments[1] || "", role: "", office: "", province: provinces[1] || "", status: "Active" }); setErrors({}); setShowModal(true); };
  const openEdit = (idx) => { setEditIndex(idx); const s = filtered[idx]; setForm({ name: s.name, id: s.id, email: s.email || "", phone: s.phone || "", department: s.department || "", role: s.role || "", office: s.office || "", province: s.province || "", status: s.status || "Active" }); setErrors({}); setShowModal(true); };
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.id.trim()) e.id = "Required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid";
    if (!form.department) e.department = "Required";
    if (!form.province) e.province = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const saveForm = () => {
    if (!validate()) return;
    const payload = { ...form };
    if (editIndex === null) {
      payload._createdAt = Date.now();
      setStaffList(prev => [payload, ...prev]);
    } else {
      const globalIndex = staffList.findIndex(s => s.id === filtered[editIndex].id);
      if (globalIndex >= 0) {
        const next = [...staffList];
        next[globalIndex] = { ...next[globalIndex], ...payload };
        setStaffList(next);
      }
    }
    setShowModal(false);
  };
  const removeItem = (id) => {
    setStaffList(prev => prev.filter(s => s.id !== id));
  };
  const statusChip = (status) => {
    if (status === "Active") return "text-green-700 bg-green-100";
    if (status === "On Leave") return "text-orange-700 bg-orange-100";
    return "text-red-700 bg-red-100";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Staff</h1>
            <p className="text-gray-600">Manage personnel across departments and provinces</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setView("table")} className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border ${view==='table' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200'}`}><Rows size={16}/> Table</button>
            <button onClick={() => setView("card")} className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border ${view==='card' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200'}`}><LayoutGrid size={16}/> Cards</button>
            <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white shadow hover:opacity-90 transition" style={{backgroundColor: "var(--color-zGreen)"}}>
              <Plus size={16} /> Add Staff
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <p className="text-sm text-gray-500">Total Staff</p>
            <p className="text-2xl font-bold text-gray-800">{staffList.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <p className="text-sm text-gray-500">Filtered</p>
            <p className="text-2xl font-bold text-gray-800">{filtered.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-bold text-gray-800">{staffList.filter(s=>s.status==='Active').length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <p className="text-sm text-gray-500">Departments</p>
            <p className="text-2xl font-bold text-gray-800">{departments.length - 1}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div className="flex flex-col lg:flex-row items-stretch gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-200"
                placeholder="Search name, ID, role, or email..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <div className="relative">
                <Filter className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <select
                  className="pl-9 pr-8 py-2 border rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-200"
                  value={deptFilter}
                  onChange={(e) => { setDeptFilter(e.target.value); setPage(1); }}
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <select
                  className="pl-9 pr-8 py-2 border rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-200"
                  value={provFilter}
                  onChange={(e) => { setProvFilter(e.target.value); setPage(1); }}
                >
                  {provinces.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <select
                  className="pl-9 pr-8 py-2 border rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-200"
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <ChevronDown className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <select
                  className="pl-9 pr-8 py-2 border rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-200"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name-asc">Sort: Name A→Z</option>
                  <option value="name-desc">Sort: Name Z→A</option>
                  <option value="date-desc">Sort: Newest</option>
                  <option value="date-asc">Sort: Oldest</option>
                </select>
              </div>
            </div>
          </div>

          {view === 'table' ? (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-gray-500">
                    <th className="py-3 px-2">Staff</th>
                    <th className="py-3 px-2">Staff ID</th>
                    <th className="py-3 px-2">Role</th>
                    <th className="py-3 px-2">Department</th>
                    <th className="py-3 px-2">Email</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {pageItems.map((staff, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold">
                            {staff.name.split(" ").map(n=>n[0]).slice(0,2).join("")}
                          </div>
                          <div>
                            <div className="font-medium">{staff.name}</div>
                            <div className="text-xs text-gray-500">{staff.province} • {staff.office}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-2">{staff.id}</td>
                      <td className="py-2 px-2">{staff.role}</td>
                      <td className="py-2 px-2">
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">{staff.department}</span>
                      </td>
                      <td className="py-2 px-2">{staff.email}</td>
                      <td className="py-2 px-2"><span className={`px-2 py-1 rounded-full text-xs ${statusChip(staff.status)}`}>{staff.status}</span></td>
                      <td className="py-2 px-2 whitespace-nowrap">
                        <button className="inline-flex items-center gap-1 text-blue-600 mr-3"><Eye size={16}/> View</button>
                        <button onClick={() => openEdit(i + (page-1)*pageSize)} className="inline-flex items-center gap-1 text-green-600 mr-3"><Edit size={16}/> Edit</button>
                        <button onClick={() => removeItem(staff.id)} className="inline-flex items-center gap-1 text-red-600"><Trash2 size={16}/> Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pageItems.map((s, i) => (
                <div key={i} className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-semibold">
                        {s.name.split(" ").map(n=>n[0]).slice(0,2).join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{s.name}</div>
                        <div className="text-xs text-gray-500">{s.role} • {s.department}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${statusChip(s.status)}`}>{s.status}</span>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <div>{s.email}</div>
                    <div className="text-xs">{s.province} • {s.office} • ID: {s.id}</div>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <button className="inline-flex items-center gap-1 text-blue-600"><Eye size={16}/> View</button>
                    <button onClick={() => openEdit(i + (page-1)*pageSize)} className="inline-flex items-center gap-1 text-green-600"><Edit size={16}/> Edit</button>
                    <button onClick={() => removeItem(s.id)} className="inline-flex items-center gap-1 text-red-600"><Trash2 size={16}/> Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">Page {page} of {totalPages}</div>
            <div className="flex items-center gap-2">
              <button disabled={page===1} onClick={() => setPage(p=>Math.max(1,p-1))} className={`px-3 py-1 rounded border ${page===1? 'text-gray-300 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}>Prev</button>
              <button disabled={page===totalPages} onClick={() => setPage(p=>Math.min(totalPages,p+1))} className={`px-3 py-1 rounded border ${page===totalPages? 'text-gray-300 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{editIndex===null? 'Add Staff' : 'Edit Staff'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700"><X size={18}/></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className={`mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 ${errors.name? 'border-red-400 focus:ring-red-100' : 'focus:ring-green-100'}`}/>
                {errors.name && <div className="text-xs text-red-600 mt-1">{errors.name}</div>}
              </div>
              <div>
                <label className="text-sm text-gray-600">Staff ID</label>
                <input value={form.id} onChange={e=>setForm({...form,id:e.target.value})} className={`mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 ${errors.id? 'border-red-400 focus:ring-red-100' : 'focus:ring-green-100'}`}/>
                {errors.id && <div className="text-xs text-red-600 mt-1">{errors.id}</div>}
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className={`mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 ${errors.email? 'border-red-400 focus:ring-red-100' : 'focus:ring-green-100'}`}/>
                {errors.email && <div className="text-xs text-red-600 mt-1">{errors.email}</div>}
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-100"/>
              </div>
              <div>
                <label className="text-sm text-gray-600">Department</label>
                <select value={form.department} onChange={e=>setForm({...form,department:e.target.value})} className={`mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 ${errors.department? 'border-red-400 focus:ring-red-100' : 'focus:ring-green-100'}`}>
                  {departments.filter(d=>d!=="All").map(d=> <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.department && <div className="text-xs text-red-600 mt-1">{errors.department}</div>}
              </div>
              <div>
                <label className="text-sm text-gray-600">Role</label>
                <input value={form.role} onChange={e=>setForm({...form,role:e.target.value})} className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-100"/>
              </div>
              <div>
                <label className="text-sm text-gray-600">Office</label>
                <input value={form.office} onChange={e=>setForm({...form,office:e.target.value})} className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-100"/>
              </div>
              <div>
                <label className="text-sm text-gray-600">Province</label>
                <select value={form.province} onChange={e=>setForm({...form,province:e.target.value})} className={`mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 ${errors.province? 'border-red-400 focus:ring-red-100' : 'focus:ring-green-100'}`}>
                  {provinces.filter(p=>p!=="All").map(p=> <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.province && <div className="text-xs text-red-600 mt-1">{errors.province}</div>}
              </div>
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})} className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-100">
                  <option>Active</option>
                  <option>On Leave</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700">Cancel</button>
              <button onClick={saveForm} className="px-4 py-2 rounded-lg text-white" style={{backgroundColor: "var(--color-zGreen)"}}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
