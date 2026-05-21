import { useState, useRef } from "react";

const PAGES = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "venue", label: "Venue", icon: "🏛️" },
  { id: "event-planner", label: "Event Planner", icon: "📋" },
  { id: "photography", label: "Photography", icon: "📷" },
  { id: "makeup", label: "Makeup Artist", icon: "💄" },
  { id: "budget", label: "Budget", icon: "💰" },
  { id: "other-plans", label: "Other Plans", icon: "📝" },
  { id: "moodboard", label: "Moodboard", icon: "🎨" },
  { id: "bride-cloth", label: "Bride Outfits", icon: "👗" },
  { id: "men-cloth", label: "Groom Outfits", icon: "🤵" },
];

const CATEGORY_COLORS = {
  venue: "#e8d5f5",
  "event-planner": "#fde8d8",
  photography: "#d8edf5",
  makeup: "#fde8f0",
  budget: "#d8f5e8",
  "other-plans": "#f5f0d8",
  moodboard: "#f5d8e8",
  "bride-cloth": "#f5d8d8",
  "men-cloth": "#d8d8f5",
};

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function EntryCard({ entry, onDelete, onEdit }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e8dff5",
      borderRadius: 16,
      padding: "1rem 1.25rem",
      marginBottom: 12,
      boxShadow: "0 2px 12px rgba(180,140,210,0.07)",
      transition: "box-shadow 0.2s"
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        {entry.photo && (
          <img src={entry.photo} alt={entry.name}
            style={{ width: 64, height: 64, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: "#3a1f5c" }}>
              {entry.name}
            </span>
            {entry.cost && (
              <span style={{
                background: "#e8f5e8", color: "#2a6e3a", fontSize: 13, fontWeight: 600,
                padding: "2px 10px", borderRadius: 20
              }}>৳{Number(entry.cost).toLocaleString()}</span>
            )}
            {entry.selected && (
              <span style={{
                background: "#e8d5f5", color: "#6a2fb0", fontSize: 12,
                padding: "2px 10px", borderRadius: 20
              }}>✓ Selected</span>
            )}
          </div>
          {entry.notes && (
            <p style={{ margin: "4px 0 0", fontSize: 14, color: "#7a6a8a" }}>{entry.notes}</p>
          )}
          {entry.link && (
            <a href={entry.link} target="_blank" rel="noreferrer"
              style={{ fontSize: 13, color: "#9a5fd4", marginTop: 4, display: "inline-block", wordBreak: "break-all" }}>
              🔗 {entry.link}
            </a>
          )}
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <button onClick={() => onEdit(entry)} style={{
            background: "#f0e8f9", border: "none", borderRadius: 8, padding: "6px 10px",
            cursor: "pointer", fontSize: 14, color: "#7a3fb8"
          }}>✏️</button>
          <button onClick={() => onDelete(entry.id)} style={{
            background: "#fde8e8", border: "none", borderRadius: 8, padding: "6px 10px",
            cursor: "pointer", fontSize: 14, color: "#c0392b"
          }}>🗑️</button>
        </div>
      </div>
    </div>
  );
}

function EntryForm({ onSave, onCancel, initial = {} }) {
  const [form, setForm] = useState({
    name: initial.name || "",
    cost: initial.cost || "",
    notes: initial.notes || "",
    link: initial.link || "",
    photo: initial.photo || "",
    selected: initial.selected || false,
  });
  const fileRef = useRef();

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm(f => ({ ...f, photo: ev.target.result }));
    reader.readAsDataURL(file);
  }

  return (
    <div style={{
      background: "#faf7fd", border: "1.5px solid #d4b8f0", borderRadius: 16,
      padding: "1.25rem", marginBottom: 16
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div>
          <label style={labelStyle}>Name / Title *</label>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="e.g. Royal Garden Hall" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Cost (৳)</label>
          <input type="number" value={form.cost} onChange={e => setForm(f => ({ ...f, cost: e.target.value }))}
            placeholder="e.g. 150000" style={inputStyle} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>Notes / Description</label>
          <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            placeholder="Add details..." rows={2}
            style={{ ...inputStyle, resize: "vertical" }} />
        </div>
        <div>
          <label style={labelStyle}>Website / Link</label>
          <input value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
            placeholder="https://..." style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Photo</label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={() => fileRef.current.click()} style={uploadBtnStyle}>
              📷 {form.photo ? "Change" : "Upload"}
            </button>
            {form.photo && <img src={form.photo} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} />}
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <input type="checkbox" id="selected-chk" checked={form.selected}
          onChange={e => setForm(f => ({ ...f, selected: e.target.checked }))} style={{ width: 16, height: 16 }} />
        <label htmlFor="selected-chk" style={{ fontSize: 14, color: "#5a3a7a", cursor: "pointer" }}>
          Mark as Selected / Chosen
        </label>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => form.name && onSave(form)} style={primaryBtnStyle}>
          💾 Save Entry
        </button>
        <button onClick={onCancel} style={cancelBtnStyle}>Cancel</button>
      </div>
    </div>
  );
}

function CompareView({ entries, onClose }) {
  const candidates = entries.filter(e => e.cost);
  if (candidates.length < 2) return (
    <div style={{ textAlign: "center", padding: "2rem", color: "#9a7ab8" }}>
      <p style={{ fontSize: 18 }}>Add at least 2 entries with costs to compare.</p>
      <button onClick={onClose} style={cancelBtnStyle}>Close</button>
    </div>
  );
  const sorted = [...candidates].sort((a, b) => Number(a.cost) - Number(b.cost));
  const cheapest = sorted[0];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={sectionTitle}>Comparison Table</h3>
        <button onClick={onClose} style={cancelBtnStyle}>Close</button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f0e8fa" }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Cost (৳)</th>
              <th style={thStyle}>Notes</th>
              <th style={thStyle}>Link</th>
              <th style={thStyle}>Photo</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((e, i) => (
              <tr key={e.id} style={{
                background: e.selected ? "#e8f5e8" : i % 2 === 0 ? "#faf7fd" : "#fff",
                borderBottom: "1px solid #e8dff5"
              }}>
                <td style={tdStyle}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {e.photo && <img src={e.photo} alt="" style={{ width: 32, height: 32, borderRadius: 6, objectFit: "cover" }} />}
                    <span style={{ fontWeight: e.selected ? 700 : 400 }}>{e.name}</span>
                  </div>
                </td>
                <td style={tdStyle}>
                  <span style={{ fontWeight: 600, color: e.id === cheapest.id ? "#2a6e3a" : "#3a1f5c" }}>
                    ৳{Number(e.cost).toLocaleString()}
                    {e.id === cheapest.id && <span style={{ marginLeft: 4, fontSize: 11, background: "#d8f5e8", color: "#2a6e3a", padding: "1px 6px", borderRadius: 10 }}>Lowest</span>}
                  </span>
                </td>
                <td style={{ ...tdStyle, maxWidth: 180, color: "#7a6a8a" }}>{e.notes || "—"}</td>
                <td style={tdStyle}>{e.link ? <a href={e.link} target="_blank" rel="noreferrer" style={{ color: "#9a5fd4" }}>Visit</a> : "—"}</td>
                <td style={tdStyle}>{e.photo ? "✅" : "—"}</td>
                <td style={tdStyle}>
                  {e.selected
                    ? <span style={{ background: "#e8d5f5", color: "#6a2fb0", padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>Selected</span>
                    : <span style={{ color: "#aaa" }}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 16, padding: "12px 16px", background: "#f0e8fa", borderRadius: 12 }}>
        <strong style={{ color: "#5a3a7a" }}>Total if all selected: </strong>
        <span style={{ color: "#3a1f5c", fontWeight: 700 }}>
          ৳{entries.filter(e => e.selected && e.cost).reduce((s, e) => s + Number(e.cost), 0).toLocaleString()}
        </span>
        <span style={{ marginLeft: 16, color: "#7a6a8a", fontSize: 13 }}>
          ({entries.filter(e => e.selected).length} item(s) selected)
        </span>
      </div>
    </div>
  );
}

function CategoryPage({ pageId, label, icon }) {
  const storageKey = `wplanner_${pageId}`;
  const saved = (() => { try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch { return []; } })();
  const [entries, setEntries] = useState(saved);
  const [showForm, setShowForm] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [showCompare, setShowCompare] = useState(false);

  function save(list) {
    setEntries(list);
    try { localStorage.setItem(storageKey, JSON.stringify(list)); } catch {}
  }

  function handleSave(form) {
    if (editEntry) {
      save(entries.map(e => e.id === editEntry.id ? { ...form, id: e.id } : e));
      setEditEntry(null);
    } else {
      save([...entries, { ...form, id: generateId() }]);
      setShowForm(false);
    }
  }

  function handleDelete(id) {
    save(entries.filter(e => e.id !== id));
  }

  const totalCost = entries.filter(e => e.selected && e.cost).reduce((s, e) => s + Number(e.cost), 0);
  const color = CATEGORY_COLORS[pageId] || "#f0e8fa";

  return (
    <div>
      <div style={{
        background: `linear-gradient(135deg, ${color} 0%, #fff 100%)`,
        borderRadius: 20, padding: "1.5rem", marginBottom: 20,
        border: "1px solid rgba(180,130,220,0.15)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#3a1f5c", margin: 0 }}>
              {icon} {label}
            </h2>
            <p style={{ margin: "4px 0 0", color: "#9a7ab8", fontSize: 14 }}>
              {entries.length} entries · {entries.filter(e => e.selected).length} selected
              {totalCost > 0 && ` · ৳${totalCost.toLocaleString()} committed`}
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {entries.length >= 2 && (
              <button onClick={() => setShowCompare(!showCompare)} style={secondaryBtnStyle}>
                ⚖️ Compare
              </button>
            )}
            <button onClick={() => { setShowForm(true); setEditEntry(null); }} style={primaryBtnStyle}>
              + Add Entry
            </button>
          </div>
        </div>
      </div>

      {showCompare && (
        <div style={{ background: "#faf7fd", border: "1px solid #d4b8f0", borderRadius: 16, padding: "1.25rem", marginBottom: 20 }}>
          <CompareView entries={entries} onClose={() => setShowCompare(false)} />
        </div>
      )}

      {(showForm && !editEntry) && (
        <EntryForm onSave={handleSave} onCancel={() => setShowForm(false)} />
      )}

      {entries.length === 0 && !showForm && (
        <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#b8a8c8" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{icon}</div>
          <p style={{ fontSize: 16 }}>No entries yet. Click "+ Add Entry" to get started!</p>
        </div>
      )}

      {entries.map(entry => (
        editEntry?.id === entry.id
          ? <EntryForm key={entry.id} initial={editEntry} onSave={handleSave} onCancel={() => setEditEntry(null)} />
          : <EntryCard key={entry.id} entry={entry} onDelete={handleDelete} onEdit={setEditEntry} />
      ))}
    </div>
  );
}

function BudgetPage() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wplanner_budget_items") || "[]"); } catch { return []; }
  });
  const [form, setForm] = useState({ category: "", budgeted: "", spent: "", note: "" });
  const [showForm, setShowForm] = useState(false);

  function save(list) {
    setItems(list);
    try { localStorage.setItem("wplanner_budget_items", JSON.stringify(list)); } catch {}
  }

  function addItem() {
    if (!form.category) return;
    save([...items, { ...form, id: generateId() }]);
    setForm({ category: "", budgeted: "", spent: "", note: "" });
    setShowForm(false);
  }

  const totalBudget = items.reduce((s, i) => s + (Number(i.budgeted) || 0), 0);
  const totalSpent = items.reduce((s, i) => s + (Number(i.spent) || 0), 0);
  const remaining = totalBudget - totalSpent;

  return (
    <div>
      <div style={{
        background: "linear-gradient(135deg, #d8f5e8 0%, #fff 100%)",
        borderRadius: 20, padding: "1.5rem", marginBottom: 20
      }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#3a1f5c", margin: 0 }}>
          💰 Budget Tracker
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 14 }}>
          {[
            { label: "Total Budget", val: totalBudget, color: "#3a6e8a" },
            { label: "Total Spent", val: totalSpent, color: "#c0392b" },
            { label: "Remaining", val: remaining, color: remaining >= 0 ? "#2a6e3a" : "#c0392b" },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ background: "#fff", borderRadius: 12, padding: "12px 16px", border: "1px solid #e0d5f0" }}>
              <div style={{ fontSize: 12, color: "#9a7ab8", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color }}>৳{val.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {totalBudget > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#9a7ab8", marginBottom: 6 }}>
            <span>Budget used</span>
            <span>{Math.round((totalSpent / totalBudget) * 100)}%</span>
          </div>
          <div style={{ height: 10, background: "#f0e8fa", borderRadius: 10, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 10, transition: "width 0.5s",
              background: totalSpent > totalBudget ? "#e74c3c" : "#9a5fd4",
              width: `${Math.min(100, (totalSpent / totalBudget) * 100)}%`
            }} />
          </div>
        </div>
      )}

      <button onClick={() => setShowForm(!showForm)} style={{ ...primaryBtnStyle, marginBottom: 16 }}>
        + Add Budget Item
      </button>

      {showForm && (
        <div style={{ background: "#faf7fd", border: "1.5px solid #d4b8f0", borderRadius: 16, padding: "1.25rem", marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
            <div>
              <label style={labelStyle}>Category</label>
              <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                placeholder="e.g. Venue" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Budgeted (৳)</label>
              <input type="number" value={form.budgeted} onChange={e => setForm(f => ({ ...f, budgeted: e.target.value }))}
                placeholder="0" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Spent (৳)</label>
              <input type="number" value={form.spent} onChange={e => setForm(f => ({ ...f, spent: e.target.value }))}
                placeholder="0" style={inputStyle} />
            </div>
          </div>
          <input value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
            placeholder="Note (optional)" style={{ ...inputStyle, marginBottom: 10 }} />
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={addItem} style={primaryBtnStyle}>💾 Save</button>
            <button onClick={() => setShowForm(false)} style={cancelBtnStyle}>Cancel</button>
          </div>
        </div>
      )}

      {items.map(item => {
        const over = Number(item.spent) > Number(item.budgeted) && item.budgeted;
        return (
          <div key={item.id} style={{
            background: "#fff", border: `1px solid ${over ? "#f5c6c6" : "#e8dff5"}`,
            borderRadius: 14, padding: "12px 16px", marginBottom: 10,
            display: "flex", alignItems: "center", gap: 12
          }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 600, color: "#3a1f5c" }}>{item.category}</span>
              {item.note && <span style={{ marginLeft: 8, fontSize: 13, color: "#9a7ab8" }}>{item.note}</span>}
            </div>
            <div style={{ fontSize: 14, color: "#7a6a8a" }}>Budget: <b>৳{Number(item.budgeted || 0).toLocaleString()}</b></div>
            <div style={{ fontSize: 14, color: over ? "#c0392b" : "#2a6e3a" }}>Spent: <b>৳{Number(item.spent || 0).toLocaleString()}</b></div>
            {over && <span style={{ fontSize: 12, background: "#fde8e8", color: "#c0392b", padding: "2px 8px", borderRadius: 10 }}>Over budget</span>}
            <button onClick={() => save(items.filter(i => i.id !== item.id))}
              style={{ background: "#fde8e8", border: "none", borderRadius: 8, padding: "4px 8px", cursor: "pointer" }}>🗑️</button>
          </div>
        );
      })}
    </div>
  );
}

function MoodboardPage() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wplanner_moodboard") || "[]"); } catch { return []; }
  });
  const fileRef = useRef();

  function save(list) {
    setItems(list);
    try { localStorage.setItem("wplanner_moodboard", JSON.stringify(list)); } catch {}
  }

  function handlePhoto(e) {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        save([...items, { id: generateId(), photo: ev.target.result, label: file.name.split(".")[0], note: "" }]);
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <div>
      <div style={{
        background: "linear-gradient(135deg, #f5d8e8 0%, #fff 100%)",
        borderRadius: 20, padding: "1.5rem", marginBottom: 20
      }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#3a1f5c", margin: 0 }}>
          🎨 Moodboard
        </h2>
        <p style={{ margin: "4px 0 0", color: "#9a7ab8", fontSize: 14 }}>{items.length} images</p>
      </div>
      <button onClick={() => fileRef.current.click()} style={{ ...primaryBtnStyle, marginBottom: 16 }}>
        📷 Add Images
      </button>
      <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handlePhoto} />

      {items.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "#b8a8c8" }}>
          <div style={{ fontSize: 48 }}>🎨</div>
          <p>Upload your inspiration photos!</p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
        {items.map(item => (
          <div key={item.id} style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid #e8dff5" }}>
            <img src={item.photo} alt={item.label}
              style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
            <div style={{ padding: "8px 10px", background: "#fff" }}>
              <input value={item.label}
                onChange={e => save(items.map(i => i.id === item.id ? { ...i, label: e.target.value } : i))}
                style={{ border: "none", background: "none", width: "100%", fontSize: 13, color: "#5a3a7a", fontWeight: 600 }} />
            </div>
            <button onClick={() => save(items.filter(i => i.id !== item.id))}
              style={{
                position: "absolute", top: 6, right: 6,
                background: "rgba(255,255,255,0.85)", border: "none", borderRadius: 8,
                padding: "4px 6px", cursor: "pointer", fontSize: 13
              }}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomePage({ setPage }) {
  const allKeys = PAGES.filter(p => !["home", "budget", "moodboard"].includes(p.id));
  const totalSelected = allKeys.reduce((sum, p) => {
    try {
      const entries = JSON.parse(localStorage.getItem(`wplanner_${p.id}`) || "[]");
      return sum + entries.filter(e => e.selected && e.cost).reduce((s, e) => s + Number(e.cost), 0);
    } catch { return sum; }
  }, 0);

  return (
    <div>
      <div style={{
        textAlign: "center",
        background: "linear-gradient(160deg, #f5e8fd 0%, #fce8f0 50%, #fdf5e8 100%)",
        borderRadius: 24, padding: "2.5rem 2rem", marginBottom: 28
      }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>💍</div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 34,
          color: "#3a1f5c", margin: "0 0 8px"
        }}>Our Wedding Planner</h1>
        <p style={{ color: "#9a7ab8", fontSize: 16, margin: 0 }}>
          A private space to plan every beautiful detail
        </p>
        {totalSelected > 0 && (
          <div style={{ marginTop: 16, display: "inline-block", background: "#fff", borderRadius: 20, padding: "8px 20px", border: "1px solid #d4b8f0" }}>
            <span style={{ color: "#7a3fb8", fontWeight: 600 }}>💰 Committed so far: ৳{totalSelected.toLocaleString()}</span>
          </div>
        )}
      </div>

      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#5a3a7a", marginBottom: 14 }}>
        Planning Sections
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14 }}>
        {PAGES.filter(p => p.id !== "home").map(page => {
          const color = CATEGORY_COLORS[page.id] || "#f0e8fa";
          let count = 0;
          try { count = JSON.parse(localStorage.getItem(`wplanner_${page.id}`) || "[]").length; } catch {}
          return (
            <button key={page.id} onClick={() => setPage(page.id)}
              style={{
                background: `linear-gradient(135deg, ${color} 0%, #fff 100%)`,
                border: "1px solid rgba(180,130,220,0.2)", borderRadius: 18,
                padding: "1.2rem 1rem", cursor: "pointer", textAlign: "left",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(140,80,200,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{page.icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: "#3a1f5c" }}>
                {page.label}
              </div>
              {count > 0 && <div style={{ fontSize: 12, color: "#9a7ab8", marginTop: 4 }}>{count} entries</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: 13, color: "#7a5a9a", fontWeight: 500, marginBottom: 4 };
const inputStyle = {
  width: "100%", padding: "8px 12px", border: "1px solid #d4b8f0", borderRadius: 10,
  fontSize: 14, background: "#fff", color: "#3a1f5c", boxSizing: "border-box", outline: "none"
};
const primaryBtnStyle = {
  background: "linear-gradient(135deg, #9a5fd4, #c47be0)", color: "#fff",
  border: "none", borderRadius: 12, padding: "9px 20px", cursor: "pointer",
  fontSize: 14, fontWeight: 600
};
const secondaryBtnStyle = {
  background: "#f0e8fa", color: "#7a3fb8",
  border: "1px solid #d4b8f0", borderRadius: 12, padding: "9px 20px", cursor: "pointer",
  fontSize: 14, fontWeight: 600
};
const cancelBtnStyle = {
  background: "#f5f0f8", color: "#9a7ab8",
  border: "1px solid #e0d5f0", borderRadius: 12, padding: "9px 16px", cursor: "pointer", fontSize: 14
};
const uploadBtnStyle = {
  background: "#f0e8fa", color: "#7a3fb8", border: "1px solid #d4b8f0",
  borderRadius: 10, padding: "7px 14px", cursor: "pointer", fontSize: 13
};
const thStyle = { padding: "10px 12px", textAlign: "left", fontSize: 13, color: "#5a3a7a", fontWeight: 600 };
const tdStyle = { padding: "10px 12px", fontSize: 14, color: "#3a1f5c", verticalAlign: "middle" };
const sectionTitle = { fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#3a1f5c", margin: 0 };

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPage = PAGES.find(p => p.id === page);

  function renderPage() {
    if (page === "home") return <HomePage setPage={setPage} />;
    if (page === "budget") return <BudgetPage />;
    if (page === "moodboard") return <MoodboardPage />;
    return <CategoryPage pageId={page} label={currentPage?.label} icon={currentPage?.icon} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#faf7fd", fontFamily: "Georgia, serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />

      <div style={{
        background: "#fff", borderBottom: "1px solid #e8dff5",
        padding: "0 20px", position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", gap: 0 }}>
          <button onClick={() => setPage("home")} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#3a1f5c",
            padding: "14px 0", marginRight: 20, flexShrink: 0
          }}>
            💍 Wedding Planner
          </button>
          <div style={{ display: "flex", gap: 0, overflowX: "auto", flex: 1 }}>
            {PAGES.filter(p => p.id !== "home").map(p => (
              <button key={p.id} onClick={() => setPage(p.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "14px 12px", fontSize: 13, color: page === p.id ? "#9a5fd4" : "#7a6a8a",
                borderBottom: page === p.id ? "2px solid #9a5fd4" : "2px solid transparent",
                whiteSpace: "nowrap", fontWeight: page === p.id ? 600 : 400,
                transition: "color 0.2s"
              }}>
                {p.icon} {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px" }}>
        {renderPage()}
      </div>
    </div>
  );
}
