import { useMemo, useState, useEffect } from "react";
import { Search, Filter, Plus, LayoutGrid, Rows, Eye, Edit, Trash2, ArrowLeftRight, X, ImageIcon, ChevronDown, Download, Upload, CheckSquare, Square, SlidersHorizontal } from "lucide-react";

function Assets() {
  const [assets, setAssets] = useState([
    { tag: "LAP-001", name: "Dell Latitude 7420", category: "Laptop", assignedTo: "John Doe", department: "IT", condition: "Good", province: "Lusaka", office: "HQ", acquired: "2024-02-10", value: 1800 },
    { tag: "DESK-010", name: "HP ProDesk 600", category: "Desktop", assignedTo: "—", department: "Operations", condition: "Repair", province: "Copperbelt", office: "Ndola", acquired: "2023-09-20", value: 950 },
    { tag: "PRN-203", name: "Canon LBP226dw", category: "Printer", assignedTo: "—", department: "Finance", condition: "Good", province: "Central", office: "Kabwe", acquired: "2022-05-12", value: 420 },
    { tag: "KBD-517", name: "Logitech K120", category: "Keyboard", assignedTo: "—", department: "IT", condition: "Bad", province: "Southern", office: "Choma", acquired: "2021-11-05", value: 20 },
    { tag: "LAP-014", name: "Lenovo ThinkPad T14", category: "Laptop", assignedTo: "Grace Phiri", department: "IT", condition: "Good", province: "Lusaka", office: "HQ", acquired: "2024-06-01", value: 1650 },
  ]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [department, setDepartment] = useState("All");
  const [condition, setCondition] = useState("All");
  const [province, setProvince] = useState("All");
  const [office, setOffice] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [view, setView] = useState("table");
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ tag: "", name: "", category: "Laptop", assignedTo: "", department: "", province: "", office: "", acquired: "", value: "", condition: "Good", photo: null });
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(() => new Set());
  const [showColumns, setShowColumns] = useState(false);
  const [visibleCols, setVisibleCols] = useState({
    tag: true,
    name: true,
    category: true,
    assignedTo: true,
    department: true,
    condition: true,
    location: true,
    actions: true,
  });
  const pageSize = 8;

  // Load assets from backend (read-only for now)
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/assets');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setAssets(data.map(a => ({
            // Map API fields to UI fields; keep compatibility with existing table
            tag: a.tag || a._id || 'N/A',
            name: a.name || 'Unnamed',
            category: a.category || 'Unknown',
            assignedTo: a.assignedTo || '—',
            department: a.department || 'Unknown',
            condition: a.condition || 'Good',
            province: a.province || 'Lusaka',
            office: a.office || 'HQ',
            acquired: a.acquired || new Date(a.createdAt || Date.now()).toISOString().slice(0,10),
            value: a.value ?? '',
            _id: a._id,
          })));
        }
      } catch (e) {
        // Silently keep local sample data if API fails
        console.warn('Failed to load /api/assets:', e.message);
      }
    };
    load();
  }, []);

  // Restore saved UI state
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("assets_ui") || "null");
      if (saved) {
        if (typeof saved.query === 'string') setQuery(saved.query);
        if (saved.category) setCategory(saved.category);
        if (saved.department) setDepartment(saved.department);
        if (saved.condition) setCondition(saved.condition);
        if (saved.province) setProvince(saved.province);
        if (saved.office) setOffice(saved.office);
        if (saved.sortBy) setSortBy(saved.sortBy);
        if (saved.view) setView(saved.view);
        if (saved.visibleCols) setVisibleCols(v => ({...v, ...saved.visibleCols}));
      }
    } catch {}
  }, []);

  // Persist UI state
  useEffect(() => {
    const payload = { query, category, department, condition, province, office, sortBy, view, visibleCols };
    try { localStorage.setItem("assets_ui", JSON.stringify(payload)); } catch {}
  }, [query, category, department, condition, province, office, sortBy, view, visibleCols]);

  const categories = useMemo(() => ["All", ...Array.from(new Set(assets.map(a => a.category)))], [assets]);
  const departments = useMemo(() => ["All", ...Array.from(new Set(assets.map(a => a.department)))], [assets]);
  const provinces = useMemo(() => ["All", ...Array.from(new Set(assets.map(a => a.province)))], [assets]);
  const offices = useMemo(() => ["All", ...Array.from(new Set(assets.map(a => a.office)))], [assets]);
  const conditions = ["All", "Good", "Repair", "Bad"];

  const counts = useMemo(() => {
    const base = { Good: 0, Repair: 0, Bad: 0 };
    for (const a of assets) base[a.condition] = (base[a.condition] || 0) + 1;
    return base;
  }, [assets]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = assets.filter(a => {
      const matchesQ = !q || a.name.toLowerCase().includes(q) || a.tag.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
      const f1 = category === "All" || a.category === category;
      const f2 = department === "All" || a.department === department;
      const f3 = condition === "All" || a.condition === condition;
      const f4 = province === "All" || a.province === province;
      const f5 = office === "All" || a.office === office;
      return matchesQ && f1 && f2 && f3 && f4 && f5;
    });
    arr = arr.sort((a,b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "value-desc") return (b.value||0) - (a.value||0);
      if (sortBy === "value-asc") return (a.value||0) - (b.value||0);
      if (sortBy === "date-desc") return new Date(b.acquired) - new Date(a.acquired);
      if (sortBy === "date-asc") return new Date(a.acquired) - new Date(b.acquired);
      return 0;
    });
    return arr;
  }, [assets, query, category, department, condition, province, office, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = useMemo(() => filtered.slice((page-1)*pageSize, page*pageSize), [filtered, page]);

  const openAdd = () => { setEditIndex(null); setForm({ tag: "", name: "", category: categories[1] || "Laptop", assignedTo: "", department: departments[1] || "", province: provinces[1] || "", office: offices[1] || "", acquired: "", value: "", condition: "Good", photo: null }); setErrors({}); setShowModal(true); };
  const openEdit = (idx) => { setEditIndex(idx); const a = filtered[idx]; setForm({ ...a, value: a.value?.toString() || "", photo: null }); setErrors({}); setShowModal(true); };
  const statusChip = (cond) => cond === "Good" ? "bg-green-100 text-green-700" : cond === "Repair" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700";
  const toggleSelectOnPage = (checked) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (checked) {
        for (const a of pageItems) next.add(a.tag);
      } else {
        for (const a of pageItems) next.delete(a.tag);
      }
      return next;
    });
  };
  const toggleOne = (tag) => {
    setSelected(prev => { const next = new Set(prev); if (next.has(tag)) next.delete(tag); else next.add(tag); return next; });
  };
  const clearSelection = () => setSelected(new Set());
  const anySelected = selected.size > 0;
  const allSelectedOnPage = pageItems.every(a => selected.has(a.tag)) && pageItems.length > 0;
  const exportCSV = () => {
    const rows = (anySelected ? filtered.filter(a => selected.has(a.tag)) : filtered);
    const cols = ["tag","name","category","assignedTo","department","condition","province","office","acquired","value"];
    const header = cols.join(",");
    const body = rows.map(a => cols.map(c => {
      const v = (a[c] ?? "").toString();
      const escaped = '"' + v.replace(/"/g,'""') + '"';
      return v.includes(',') || v.includes('"') || v.includes('\n') ? escaped : v;
    }).join(",")).join("\n");
    const csv = header + "\n" + body;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'assets.csv'; a.click();
    URL.revokeObjectURL(url);
  };
  const importCSV = async (file) => {
    if (!file) return;
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return;
    const headers = lines[0].split(',').map(h=>h.trim());
    const idx = (k) => headers.indexOf(k);
    const next = [...assets];
    for (let i=1;i<lines.length;i++) {
      const raw = lines[i];
      const cols = raw.match(/\"([^\"]|\"\")*\"|[^,]+/g)?.map(x => x.replace(/^\"|\"$/g,'').replace(/\"\"/g,'\"')) || raw.split(',');
      const item = {
        tag: cols[idx('tag')] || `TMP-${Date.now()}-${i}`,
        name: cols[idx('name')] || 'Unnamed',
        category: cols[idx('category')] || 'Unknown',
        assignedTo: cols[idx('assignedTo')] || '—',
        department: cols[idx('department')] || 'Unknown',
        condition: cols[idx('condition')] || 'Good',
        province: cols[idx('province')] || 'Lusaka',
        office: cols[idx('office')] || 'HQ',
        acquired: cols[idx('acquired')] || new Date().toISOString().slice(0,10),
        value: Number(cols[idx('value')] || 0) || 0,
      };
      next.unshift(item);
    }
    setAssets(next);
    setPage(1);
    alert('Import completed');
  };
  const bulkDelete = async () => {
    if (!anySelected) return;
    if (!confirm(`Delete ${selected.size} selected asset(s)?`)) return;
    const ids = Array.from(selected);
    try {
      await Promise.all(ids.map(async (tag) => {
        const target = assets.find(a => a.tag === tag);
        const id = target?._id || tag;
        try { await fetch(`/api/assets/${id}`, { method: 'DELETE' }); } catch {}
      }));
    } finally {
      setAssets(prev => prev.filter(a => !selected.has(a.tag)));
      clearSelection();
    }
  };
  const validate = () => {
    const e = {};
    if (!form.tag.trim()) e.tag = "Required";
    if (!form.name.trim()) e.name = "Required";
    if (!form.category) e.category = "Required";
    if (!form.department) e.department = "Required";
    if (!form.province) e.province = "Required";
    if (!form.office) e.office = "Required";
    if (form.value && isNaN(Number(form.value))) e.value = "Must be a number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const saveForm = () => {
    if (!validate()) return;
    const payload = { ...form, value: form.value ? Number(form.value) : undefined };
    const run = async () => {
      try {
        if (editIndex === null) {
          const res = await fetch('/api/assets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: payload.name,
              category: payload.category,
              department: payload.department,
              status: 'active',
              metadata: { assignedTo: payload.assignedTo, province: payload.province, office: payload.office, acquired: payload.acquired, value: payload.value, condition: payload.condition, tag: payload.tag }
            })
          });
          const created = res.ok ? await res.json() : null;
          const mapped = created ? {
            tag: created.metadata?.tag || created._id || payload.tag || 'N/A',
            name: created.name || payload.name,
            category: created.category || payload.category,
            assignedTo: created.metadata?.assignedTo || payload.assignedTo || '—',
            department: created.department || payload.department,
            condition: created.metadata?.condition || payload.condition || 'Good',
            province: created.metadata?.province || payload.province || 'Lusaka',
            office: created.metadata?.office || payload.office || 'HQ',
            acquired: created.metadata?.acquired || payload.acquired || new Date(created.createdAt || Date.now()).toISOString().slice(0,10),
            value: created.metadata?.value ?? payload.value ?? '',
            _id: created._id,
          } : { ...payload };
          setAssets(prev => [mapped, ...prev]);
          alert('Asset added');
        } else {
          const target = filtered[editIndex];
          const id = target?._id || target?.tag; // tag may hold _id for API-loaded items
          await fetch(`/api/assets/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: payload.name,
              category: payload.category,
              department: payload.department,
              metadata: { assignedTo: payload.assignedTo, province: payload.province, office: payload.office, acquired: payload.acquired, value: payload.value, condition: payload.condition, tag: payload.tag }
            })
          });
          const globalIndex = assets.findIndex(x => x.tag === target.tag);
          if (globalIndex >= 0) {
            const next = [...assets];
            next[globalIndex] = { ...next[globalIndex], ...payload };
            setAssets(next);
          }
          alert('Asset updated');
        }
      } catch (e) {
        alert(`Operation failed: ${e.message}`);
      } finally {
        setShowModal(false);
      }
    };
    run();
  };
  const removeItem = async (tag) => {
    if (!confirm('Delete this asset?')) return;
    try {
      const target = assets.find(a => a.tag === tag);
      const id = target?._id || tag;
      await fetch(`/api/assets/${id}`, { method: 'DELETE' });
    } catch {}
    setAssets(prev => prev.filter(a => a.tag !== tag));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Assets Management</h1>
          <p className="text-gray-600">Search, filter, and manage all ICT assets.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setView("table")} className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border ${view==='table' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200'}`}><Rows size={16}/> Table</button>
          <button onClick={() => setView("grid")} className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border ${view==='grid' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200'}`}><LayoutGrid size={16}/> Grid</button>
          <div className="hidden sm:flex h-6 w-px bg-gray-200 mx-1"/>
          <button onClick={exportCSV} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white text-gray-700 border-gray-200"><Download size={16}/> Export</button>
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white text-gray-700 border-gray-200 cursor-pointer">
            <Upload size={16}/> Import
            <input type="file" accept=".csv" className="hidden" onChange={(e)=> importCSV(e.target.files?.[0])}/>
          </label>
          <div className="relative">
            <button onClick={()=> setShowColumns(v=>!v)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white text-gray-700 border-gray-200"><SlidersHorizontal size={16}/> Columns</button>
            {showColumns && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow z-10 p-2">
                {[
                  {key:'tag',label:'Asset Tag'},
                  {key:'name',label:'Name'},
                  {key:'category',label:'Category'},
                  {key:'assignedTo',label:'Assigned To'},
                  {key:'department',label:'Department'},
                  {key:'condition',label:'Condition'},
                  {key:'location',label:'Location'},
                  {key:'actions',label:'Actions'},
                ].map(c => (
                  <button key={c.key} onClick={()=> setVisibleCols(v=>({...v, [c.key]: !v[c.key]}))} className="w-full flex items-center justify-between px-2 py-1.5 text-sm rounded hover:bg-gray-50">
                    <span>{c.label}</span>
                    {visibleCols[c.key] ? <CheckSquare size={16} className="text-green-600"/> : <Square size={16} className="text-gray-400"/>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button disabled={!anySelected} onClick={bulkDelete} className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${anySelected ? 'bg-white text-red-600 border-red-200' : 'bg-gray-50 text-gray-300 border-gray-200'}`}><Trash2 size={16}/> Delete Selected</button>
          <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white shadow hover:opacity-90 transition" style={{backgroundColor: "var(--color-zGreen)"}}>
            <Plus size={16}/> Add Asset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition">
          <p className="text-sm text-gray-500">Total Assets</p>
          <p className="text-2xl font-bold text-gray-800">{assets.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition">
          <p className="text-sm text-gray-500">Good</p>
          <p className="text-2xl font-bold text-green-700">{counts.Good || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition">
          <p className="text-sm text-gray-500">Under Repair</p>
          <p className="text-2xl font-bold text-orange-700">{counts.Repair || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition">
          <p className="text-sm text-gray-500">Bad</p>
          <p className="text-2xl font-bold text-red-700">{counts.Bad || 0}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
        <div className="flex flex-col lg:flex-row items-stretch gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Search assets by name, tag, or category..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="relative">
              <Filter className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <select className="pl-9 pr-8 py-2 border rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-200" value={category} onChange={(e)=>{setCategory(e.target.value); setPage(1);}}>
                {categories.map(c=> <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <select className="pl-9 pr-8 py-2 border rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-200" value={department} onChange={(e)=>{setDepartment(e.target.value); setPage(1);}}>
                {departments.map(d=> <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <select className="pl-9 pr-8 py-2 border rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-200" value={condition} onChange={(e)=>{setCondition(e.target.value); setPage(1);}}>
                {conditions.map(c=> <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <select className="pl-9 pr-8 py-2 border rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-200" value={province} onChange={(e)=>{setProvince(e.target.value); setPage(1);}}>
                {provinces.map(p=> <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <select className="pl-9 pr-8 py-2 border rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-200" value={office} onChange={(e)=>{setOffice(e.target.value); setPage(1);}}>
                {offices.map(o=> <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="relative">
              <ChevronDown className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <select className="pl-9 pr-8 py-2 border rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-green-200" value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
                <option value="name-asc">Sort: Name A→Z</option>
                <option value="name-desc">Sort: Name Z→A</option>
                <option value="value-desc">Sort: Value High→Low</option>
                <option value="value-asc">Sort: Value Low→High</option>
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
                  <th className="py-3 px-2 w-8">
                    <input type="checkbox" checked={allSelectedOnPage} onChange={e=> toggleSelectOnPage(e.target.checked)} />
                  </th>
                  {visibleCols.tag && <th className="py-3 px-2">Asset Tag</th>}
                  {visibleCols.name && <th className="py-3 px-2">Name</th>}
                  {visibleCols.category && <th className="py-3 px-2">Category</th>}
                  {visibleCols.assignedTo && <th className="py-3 px-2">Assigned To</th>}
                  {visibleCols.department && <th className="py-3 px-2">Department</th>}
                  {visibleCols.condition && <th className="py-3 px-2">Condition</th>}
                  {visibleCols.location && <th className="py-3 px-2">Location</th>}
                  {visibleCols.actions && <th className="py-3 px-2">Actions</th>}
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {pageItems.map((a, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2">
                      <input type="checkbox" checked={selected.has(a.tag)} onChange={()=> toggleOne(a.tag)} />
                    </td>
                    {visibleCols.tag && <td className="py-2 px-2">{a.tag}</td>}
                    {visibleCols.name && <td className="py-2 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded bg-gray-100 text-gray-500 flex items-center justify-center"><ImageIcon size={16}/></div>
                        <div>
                          <div className="font-medium">{a.name}</div>
                          <div className="text-xs text-gray-500">Acquired {a.acquired} • ${a.value}</div>
                        </div>
                      </div>
                    </td>}
                    {visibleCols.category && <td className="py-2 px-2">{a.category}</td>}
                    {visibleCols.assignedTo && <td className="py-2 px-2">{a.assignedTo}</td>}
                    {visibleCols.department && <td className="py-2 px-2">{a.department}</td>}
                    {visibleCols.condition && <td className="py-2 px-2"><span className={`px-2 py-1 rounded-full text-xs ${statusChip(a.condition)}`}>{a.condition}</span></td>}
                    {visibleCols.location && <td className="py-2 px-2">{a.province} • {a.office}</td>}
                    {visibleCols.actions && <td className="py-2 px-2 whitespace-nowrap">
                      <button className="inline-flex items-center gap-1 text-blue-600 mr-3"><Eye size={16}/> View</button>
                      <button onClick={() => openEdit(i + (page-1)*pageSize)} className="inline-flex items-center gap-1 text-green-600 mr-3"><Edit size={16}/> Edit</button>
                      <button onClick={() => alert('Transfer flow TBD')} className="inline-flex items-center gap-1 text-orange-600 mr-3"><ArrowLeftRight size={16}/> Transfer</button>
                      <button onClick={() => removeItem(a.tag)} className="inline-flex items-center gap-1 text-red-600"><Trash2 size={16}/> Delete</button>
                    </td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pageItems.map((a, i) => (
              <div key={i} className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-gray-100 text-gray-500 flex items-center justify-center"><ImageIcon/></div>
                  <div>
                    <div className="font-semibold text-gray-800">{a.name}</div>
                    <div className="text-xs text-gray-500">{a.tag} • {a.category}</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <div>{a.department} • {a.province} • {a.office}</div>
                  <div className="text-xs">Acq: {a.acquired} • ${a.value}</div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusChip(a.condition)}`}>{a.condition}</span>
                  <div className="flex items-center gap-2">
                    <button className="text-blue-600 text-sm">View</button>
                    <button onClick={() => openEdit(i + (page-1)*pageSize)} className="text-green-600 text-sm">Edit</button>
                    <button onClick={() => removeItem(a.tag)} className="text-red-600 text-sm">Delete</button>
                  </div>
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white w-full max-w-3xl rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{editIndex===null? 'Add Asset' : 'Edit Asset'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700"><X size={18}/></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="text-sm text-gray-600">Asset Tag / Serial</label>
                <input value={form.tag} onChange={e=>setForm({...form,tag:e.target.value})} className={`mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 ${errors.tag? 'border-red-400 focus:ring-red-100' : 'focus:ring-green-100'}`}/>
                {errors.tag && <div className="text-xs text-red-600 mt-1">{errors.tag}</div>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600">Asset Name</label>
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className={`mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 ${errors.name? 'border-red-400 focus:ring-red-100' : 'focus:ring-green-100'}`}/>
                {errors.name && <div className="text-xs text-red-600 mt-1">{errors.name}</div>}
              </div>
              <div>
                <label className="text-sm text-gray-600">Category</label>
                <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className={`mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 ${errors.category? 'border-red-400 focus:ring-red-100' : 'focus:ring-green-100'}`}>
                  {categories.filter(c=>c!=="All").map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">Assigned Staff</label>
                <input value={form.assignedTo} onChange={e=>setForm({...form,assignedTo:e.target.value})} className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-100"/>
              </div>
              <div>
                <label className="text-sm text-gray-600">Department</label>
                <select value={form.department} onChange={e=>setForm({...form,department:e.target.value})} className={`mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 ${errors.department? 'border-red-400 focus:ring-red-100' : 'focus:ring-green-100'}`}>
                  {departments.filter(d=>d!=="All").map(d=> <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.department && <div className="text-xs text-red-600 mt-1">{errors.department}</div>}
              </div>
              <div>
                <label className="text-sm text-gray-600">Province</label>
                <select value={form.province} onChange={e=>setForm({...form,province:e.target.value})} className={`mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 ${errors.province? 'border-red-400 focus:ring-red-100' : 'focus:ring-green-100'}`}>
                  {provinces.filter(p=>p!=="All").map(p=> <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.province && <div className="text-xs text-red-600 mt-1">{errors.province}</div>}
              </div>
              <div>
                <label className="text-sm text-gray-600">Office</label>
                <select value={form.office} onChange={e=>setForm({...form,office:e.target.value})} className={`mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 ${errors.office? 'border-red-400 focus:ring-red-100' : 'focus:ring-green-100'}`}>
                  {offices.filter(o=>o!=="All").map(o=> <option key={o} value={o}>{o}</option>)}
                </select>
                {errors.office && <div className="text-xs text-red-600 mt-1">{errors.office}</div>}
              </div>
              <div>
                <label className="text-sm text-gray-600">Date Acquired</label>
                <input type="date" value={form.acquired} onChange={e=>setForm({...form,acquired:e.target.value})} className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-100"/>
              </div>
              <div>
                <label className="text-sm text-gray-600">Value / Cost (USD)</label>
                <input value={form.value} onChange={e=>setForm({...form,value:e.target.value})} className={`mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 ${errors.value? 'border-red-400 focus:ring-red-100' : 'focus:ring-green-100'}`}/>
                {errors.value && <div className="text-xs text-red-600 mt-1">{errors.value}</div>}
              </div>
              <div>
                <label className="text-sm text-gray-600">Condition</label>
                <select value={form.condition} onChange={e=>setForm({...form,condition:e.target.value})} className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-100">
                  <option>Good</option>
                  <option>Repair</option>
                  <option>Bad</option>
                </select>
              </div>
              <div className="sm:col-span-3">
                <label className="text-sm text-gray-600">Upload Photo</label>
                <input type="file" accept="image/*" onChange={(e)=> setForm({...form, photo: e.target.files?.[0] || null})} className="mt-1 w-full border rounded-lg px-3 py-2"/>
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
}

export default Assets;
