// Departments.jsx — Dated: 26 Oct 2025
import { useMemo, useState } from "react";
import { Search, Filter, Plus, Edit, Trash2, Users, Package, MapPin, Eye, X, Sun, Moon, Grid3X3, Rows } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Chart from "../components/Chart";

const Departments = () => {
  const [departments, setDepartments] = useState([
    { name: "IT", assets: 50, staff: 10, office: "HQ", province: "Lusaka", head: "Mr. Banda", description: "ICT and Support", status: "Active", value: 450000 },
    { name: "Finance", assets: 40, staff: 8, office: "Ndola", province: "Copperbelt", head: "Mrs. Zulu", description: "Accounts and Budget", status: "Active", value: 260000 },
    { name: "HR", assets: 20, staff: 5, office: "Kabwe", province: "Central", head: "Ms. Mwale", description: "Human Resources", status: "Active", value: 80000 },
    { name: "Procurement", assets: 30, staff: 7, office: "Choma", province: "Southern", head: "Mr. Phiri", description: "Supplies and Contracts", status: "Inactive", value: 140000 },
    { name: "Operations", assets: 25, staff: 6, office: "Chipata", province: "Eastern", head: "Ms. Tembo", description: "Field Operations", status: "Active", value: 170000 },
  ]);
  const [query, setQuery] = useState("");
  const [sizeFilter, setSizeFilter] = useState("All"); // All, Small, Medium, Large by assets
  const [provinceFilter, setProvinceFilter] = useState("All");
  const [officeFilter, setOfficeFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ name: "", head: "", office: "", province: "", description: "", assets: 0, staff: 0 });
  const [errors, setErrors] = useState({});
  const [themeDark, setThemeDark] = useState(false);
  const [view, setView] = useState("grid"); // grid | table
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDept, setActiveDept] = useState(null);

  const provinces = useMemo(() => ["All", ...Array.from(new Set(departments.map(d => d.province)))], [departments]);
  const offices = useMemo(() => ["All", ...Array.from(new Set(departments.map(d => d.office)))], [departments]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return departments.filter(d => {
      const matchesQ = !q || d.name.toLowerCase().includes(q) || (d.office||"").toLowerCase().includes(q) || (d.head||"").toLowerCase().includes(q);
      const band = d.assets >= 40 ? "Large" : d.assets >= 25 ? "Medium" : "Small";
      const matchesSize = sizeFilter === "All" || band === sizeFilter;
      const matchesProv = provinceFilter === "All" || d.province === provinceFilter;
      const matchesOffice = officeFilter === "All" || d.office === officeFilter;
      return matchesQ && matchesSize && matchesProv && matchesOffice;
    });
  }, [departments, query, sizeFilter, provinceFilter, officeFilter]);

  const totals = useMemo(() => ({
    depts: departments.length,
    assets: departments.reduce((s,d)=>s+d.assets,0),
    staff: departments.reduce((s,d)=>s+d.staff,0),
    offices: new Set(departments.map(d=>d.office)).size,
    value: departments.reduce((s,d)=>s+(d.value||0),0),
  }), [departments]);

  const openAdd = () => { setEditIndex(null); setForm({ name: "", head: "", office: offices[1] || "", province: provinces[1] || "", description: "", assets: 0, staff: 0 }); setErrors({}); setShowModal(true); };
  const openEdit = (idx) => { setEditIndex(idx); const d = filtered[idx]; setForm({ name: d.name, head: d.head||"", office: d.office||"", province: d.province||"", description: d.description||"", assets: d.assets||0, staff: d.staff||0 }); setErrors({}); setShowModal(true); };
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.office) e.office = "Required";
    if (!form.province) e.province = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const saveForm = () => {
    if (!validate()) return;
    if (editIndex === null) {
      setDepartments(prev => [{ ...form }, ...prev]);
      alert('Department added successfully!');
    } else {
      const globalIndex = departments.findIndex(x => x.name === filtered[editIndex].name && x.office === filtered[editIndex].office);
      if (globalIndex >= 0) {
        const next = [...departments];
        next[globalIndex] = { ...next[globalIndex], ...form };
        setDepartments(next);
      }
      alert('Department updated successfully!');
    }
    setShowModal(false);
  };
  const removeItem = (idx) => {
    if (!confirm('Delete this department?')) return;
    const target = filtered[idx];
    setDepartments(prev => prev.filter(d => !(d.name===target.name && d.office===target.office)));
  };
  const openDrawer = (dept) => { setActiveDept(dept); setDrawerOpen(true); };

  return (
    <div className={`${themeDark ? 'bg-slate-900 text-slate-100' : 'bg-gray-50'} min-h-screen` }>
      <div>
        <div className="px-6 pt-6">
          <div className="rounded-2xl px-6 py-5 shadow-lg border bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/60" style={{backgroundImage: 'linear-gradient(135deg,#f9fafb, #eef2ff)'}}>
            <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
              <div>
                <div className="text-sm text-slate-500">Dashboard / Departments</div>
                <h1 className="text-2xl md:text-3xl font-bold">Departments Overview</h1>
                <p className="text-slate-600">Manage all organizational units and their assigned assets and staff.</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={()=> setThemeDark(v=>!v)} className="px-3 py-2 rounded-lg border border-slate-200 bg-white shadow-sm text-slate-700 hover:bg-slate-50">
                  {themeDark ? <Sun size={16}/> : <Moon size={16}/>}
                </button>
                <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white shadow hover:opacity-90 transition" style={{backgroundColor: "var(--color-zGreen)"}}>
                  <Plus size={16}/> Add Department
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-col lg:flex-row items-stretch gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Search departments, offices, or heads..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                <div className="relative">
                  <Filter className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <select className="pl-9 pr-8 py-2 border rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-200" value={sizeFilter} onChange={(e)=> setSizeFilter(e.target.value)}>
                    {['All','Small','Medium','Large'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <select className="pl-9 pr-8 py-2 border rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-200" value={provinceFilter} onChange={(e)=> setProvinceFilter(e.target.value)}>
                    {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <select className="pl-9 pr-8 py-2 border rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-200" value={officeFilter} onChange={(e)=> setOfficeFilter(e.target.value)}>
                    {offices.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <button onClick={()=> setView('grid')} className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border ${view==='grid' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200'}`}><Grid3X3 size={16}/> Grid</button>
                  <button onClick={()=> setView('table')} className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border ${view==='table' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200'}`}><Rows size={16}/> Table</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex items-center gap-3 hover:shadow-md transition">
          <div className="w-10 h-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center"><Users size={20}/></div>
          <div>
            <p className="text-sm text-gray-500">Total Departments</p>
            <p className="text-2xl font-bold text-gray-800">{totals.depts}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex items-center gap-3 hover:shadow-md transition">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center"><Package size={20}/></div>
          <div>
            <p className="text-sm text-gray-500">Total Assets</p>
            <p className="text-2xl font-bold text-gray-800">{totals.assets}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex items-center gap-3 hover:shadow-md transition">
          <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center"><Users size={20}/></div>
          <div>
            <p className="text-sm text-gray-500">Total Staff</p>
            <p className="text-2xl font-bold text-gray-800">{totals.staff}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex items-center gap-3 hover:shadow-md transition">
          <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center"><MapPin size={20}/></div>
          <div>
            <p className="text-sm text-gray-500">Active Offices</p>
            <p className="text-2xl font-bold text-gray-800">{totals.offices}</p>
          </div>
        </div>
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow border border-gray-100">
          <p className="text-sm text-gray-500 mb-2">Asset Value</p>
          <div className="text-3xl font-bold text-gray-800">K{totals.value.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Combined value of all department assets</div>
        </div>
        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow border border-gray-100">
          <p className="text-sm text-gray-500 mb-2">Monthly Trend</p>
          <Chart />
        </div>
      </div>

      <div className="px-6">
        {view === 'table' ? (
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-gray-500">
                    <th className="py-3 px-2">Department Name</th>
                    <th className="py-3 px-2">Office / Province</th>
                    <th className="py-3 px-2">Staff</th>
                    <th className="py-3 px-2">Assets</th>
                    <th className="py-3 px-2">Head</th>
                    <th className="py-3 px-2">Status</th>
                    <th className="py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {filtered.map((dept, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2 font-medium">{dept.name}</td>
                      <td className="py-2 px-2 text-sm text-gray-600">{dept.office} • {dept.province}</td>
                      <td className="py-2 px-2">{dept.staff}</td>
                      <td className="py-2 px-2">{dept.assets}</td>
                      <td className="py-2 px-2">{dept.head}</td>
                      <td className="py-2 px-2"><span className={`px-2 py-1 rounded-full text-xs ${dept.status==='Active'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-700'}`}>{dept.status}</span></td>
                      <td className="py-2 px-2 whitespace-nowrap">
                        <button onClick={()=> openDrawer(dept)} className="inline-flex items-center gap-1 text-blue-600 mr-3"><Eye size={16}/> View</button>
                        <button onClick={() => openEdit(i)} className="inline-flex items-center gap-1 text-green-600 mr-3"><Edit size={16}/> Edit</button>
                        <button onClick={() => removeItem(i)} className="inline-flex items-center gap-1 text-red-600"><Trash2 size={16}/> Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((dept, i) => (
              <div key={i} className="border rounded-2xl p-4 bg-white shadow hover:shadow-lg transition hover:-translate-y-0.5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-gray-500">{dept.office} • {dept.province}</div>
                    <div className="mt-1 text-lg font-semibold text-gray-800">{dept.name}</div>
                    <div className="text-sm text-gray-500">{dept.description}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${dept.status==='Active'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-700'}`}>{dept.status}</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500">Staff</div>
                    <div className="font-semibold">{dept.staff}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500">Assets</div>
                    <div className="font-semibold">{dept.assets}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500">Value</div>
                    <div className="font-semibold">K{(dept.value||0).toLocaleString()}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs">{(dept.head||'?').split(' ').map(x=>x[0]).join('').slice(0,2)}</div>
                    <div className="text-sm text-gray-700">{dept.head}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={()=> openDrawer(dept)} className="text-blue-600 text-sm">View</button>
                    <button onClick={() => openEdit(i)} className="text-green-600 text-sm">Edit</button>
                    <button onClick={() => removeItem(i)} className="text-red-600 text-sm">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {drawerOpen && activeDept && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={()=> setDrawerOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full sm:w-[460px] bg-white shadow-xl p-6 overflow-auto">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Department</div>
                <div className="text-xl font-semibold text-gray-800">{activeDept.name}</div>
                <div className="text-sm text-gray-500">{activeDept.office} • {activeDept.province}</div>
              </div>
              <button onClick={()=> setDrawerOpen(false)} className="text-gray-500 hover:text-gray-700"><X size={18}/></button>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm">{(activeDept.head||'?').split(' ').map(x=>x[0]).join('').slice(0,2)}</div>
                <div>
                  <div className="font-medium text-gray-800">{activeDept.head}</div>
                  <div className="text-xs text-gray-500">Head of Department</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">{activeDept.description}</p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500">Staff</div>
                <div className="text-lg font-semibold">{activeDept.staff}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500">Assets</div>
                <div className="text-lg font-semibold">{activeDept.assets}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                <div className="text-xs text-gray-500">Asset Value</div>
                <div className="text-lg font-semibold">K{(activeDept.value||0).toLocaleString()}</div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4">
              <div className="bg-white rounded-lg border p-3">
                <div className="text-sm text-gray-600 mb-2">Asset Condition Distribution</div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie dataKey="value" data={[{name:'Good',value:Math.round(activeDept.assets*0.7)},{name:'Repair',value:Math.round(activeDept.assets*0.2)},{name:'Bad',value:Math.round(activeDept.assets*0.1)}]} cx="50%" cy="50%" outerRadius={70} fill="#8884d8" label>
                        <Cell fill="#22c55e" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#ef4444" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white rounded-lg border p-3">
                <div className="text-sm text-gray-600 mb-2">Monthly Asset Changes</div>
                <Chart />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button className="px-3 py-2 rounded-lg border text-gray-700">View all Assets</button>
              <button className="px-3 py-2 rounded-lg border text-gray-700">View all Staff</button>
              <button onClick={()=> setDrawerOpen(false)} className="ml-auto px-3 py-2 rounded-lg text-white" style={{backgroundColor: "var(--color-zGreen)"}}>Close</button>
            </div>
          </div>
        </div>
      )}

      <button onClick={openAdd} className="fixed bottom-6 right-6 z-30 rounded-full shadow-lg px-4 py-3 text-white" style={{backgroundColor: "var(--color-zGreen)"}}>+ Action</button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{editIndex===null? 'Add Department' : 'Edit Department'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700"><X size={18}/></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Department Name</label>
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className={`mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 ${errors.name? 'border-red-400 focus:ring-red-100' : 'focus:ring-green-100'}`}/>
                {errors.name && <div className="text-xs text-red-600 mt-1">{errors.name}</div>}
              </div>
              <div>
                <label className="text-sm text-gray-600">Department Head</label>
                <input value={form.head} onChange={e=>setForm({...form,head:e.target.value})} className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-100"/>
              </div>
              <div>
                <label className="text-sm text-gray-600">Office</label>
                <select value={form.office} onChange={e=>setForm({...form,office:e.target.value})} className={`mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 ${errors.office? 'border-red-400 focus:ring-red-100' : 'focus:ring-green-100'}`}>
                  {offices.filter(o=>o!=="All").map(o=> <option key={o} value={o}>{o}</option>)}
                </select>
                {errors.office && <div className="text-xs text-red-600 mt-1">{errors.office}</div>}
              </div>
              <div>
                <label className="text-sm text-gray-600">Province</label>
                <select value={form.province} onChange={e=>setForm({...form,province:e.target.value})} className={`mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 ${errors.province? 'border-red-400 focus:ring-red-100' : 'focus:ring-green-100'}`}>
                  {provinces.filter(p=>p!=="All").map(p=> <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.province && <div className="text-xs text-red-600 mt-1">{errors.province}</div>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600">Description</label>
                <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={3} className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-100"/>
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

export default Departments;
