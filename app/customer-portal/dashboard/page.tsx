"use client";
import { useState, useRef } from "react";
import { DashShell } from "../../components/DashShell";

// ── Icons (inline SVG — no dependency needed) ──────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor" }: { d: string; size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const Icons = {
  camera:     "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  upload:     "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  star:       "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  message:    "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  file:       "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6",
  grid:       "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
  check:      "M20 6L9 17l-5-5",
  clock:      "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2",
  heart:      "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  palette:    "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z M14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z M20 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z M14 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
  wa:         "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  x:          "M18 6 6 18 M6 6l12 12",
  plus:       "M12 5v14 M5 12h14",
  eye:        "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
  map:        "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
  tool:       "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  trend:      "M22 12h-4l-3 9L9 3l-3 9H2",
};

// ── XPS Real Color Data ─────────────────────────────────────────────────────
const COLOR_SYSTEMS = [
  {
    id: "flake",
    name: "Full Broadcast Flake",
    sub: "Most popular • Garage, Basement",
    tag: "BESTSELLER",
    img: "https://cdn.shopify.com/s/files/1/0552/2584/3735/files/In-Stock_Collection_-_GFS24-009.jpg",
    swatches: ["#c8baa0","#a09070","#d4c8b0","#786050","#b0a898","#6a6258","#e0d4c4","#504840"],
    names: ["Sahara Tan","Classic Brown","Linen","Espresso","Stone Grey","Charcoal","Ivory","Onyx"],
  },
  {
    id: "metallic",
    name: "Metallic Epoxy",
    sub: "Showroom finish • High gloss",
    tag: "PREMIUM",
    img: "https://cdn.shopify.com/s/files/1/0552/2584/3735/files/Metallic_Epoxy_Pigments_Color_Chart.jpg",
    swatches: ["#8a7a6a","#c8b090","#4a5060","#303840","#706050","#a0906a","#2a3038","#d4c090"],
    names: ["Bronze","Gold","Slate Blue","Midnight","Mocha","Champagne","Charcoal","Wheat"],
  },
  {
    id: "solid",
    name: "Solid Color",
    sub: "Clean, classic • Commercial",
    tag: "CLASSIC",
    img: "https://cdn.shopify.com/s/files/1/0552/2584/3735/files/ColorCard_Solid_NR_White.jpg",
    swatches: ["#e8e0d8","#b0b8c0","#4a4840","#708090","#d0c8b8","#9098a8","#303030","#f0f0e8"],
    names: ["White","Silver","Slate","Storm","Sandstone","Pewter","Jet","Pearl"],
  },
  {
    id: "quartz",
    name: "Quartz / Polyaspartic",
    sub: "Heavy duty • UV stable",
    tag: "COMMERCIAL",
    img: "https://cdn.shopify.com/s/files/1/0552/2584/3735/files/ColorCard_STANDARD_Colors_305_MediumGray.jpg",
    swatches: ["#e0d8c8","#c8c0a8","#d8d0b8","#f0e8d8","#b8b0a0","#a8a090","#c0b8a8","#e8e0d0"],
    names: ["Linen Quartz","Wheat Quartz","Sand","Ivory","Taupe","Pewter Quartz","Cream","Alabaster"],
  },
];

// ── Timeline Steps ──────────────────────────────────────────────────────────
const TIMELINE = [
  { n: 1, label: "Bid Submitted",     sub: "Completed",    state: "done" },
  { n: 2, label: "Estimator Review",  sub: "In Progress",  state: "active" },
  { n: 3, label: "Proposal Sent",     sub: "Up Next",      state: "" },
  { n: 4, label: "Approve & Pay",     sub: "After Proposal", state: "" },
  { n: 5, label: "Install Scheduled", sub: "After Payment", state: "" },
  { n: 6, label: "Install Day",       sub: "After Schedule", state: "" },
  { n: 7, label: "Final Sign-Off",    sub: "After Install", state: "" },
];

// ── File preview type ────────────────────────────────────────────────────────
type UploadedFile = { file: File; preview: string; type: "floor" | "dream" };

export default function CustomerDash() {
  const [activeTab, setActiveTab]   = useState<"overview"|"status"|"colors"|"design"|"documents"|"messages">("overview");
  const [selectedColor, setSelectedColor] = useState<{ sys: string; name: string; hex: string } | null>(null);
  const [uploads, setUploads]       = useState<UploadedFile[]>([]);
  const [dreamUploads, setDreamUploads] = useState<UploadedFile[]>([]);
  const [messages, setMessages]     = useState([
    { from: "ops", name: "Epoxy Nation Pro", text: "Hey! We received your bid request. Our estimator will review within 24 hours. You get 15% OFF for using the digital bid system! 🎉", time: "2:14 PM" },
    { from: "ops", name: "Epoxy Nation Pro", text: "Quick question — is your garage floor currently sealed, or bare concrete? This helps us select the right primer.", time: "2:18 PM" },
  ]);
  const [newMsg, setNewMsg]         = useState("");
  const floorRef  = useRef<HTMLInputElement>(null);
  const dreamRef  = useRef<HTMLInputElement>(null);

  // ── File handlers ─────────────────────────────────────────────────────────
  const handleFloorUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles: UploadedFile[] = files.map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
      type: "floor",
    }));
    setUploads(prev => [...prev, ...newFiles]);
    if (e.target) e.target.value = "";
  };

  const handleDreamUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles: UploadedFile[] = files.map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
      type: "dream",
    }));
    setDreamUploads(prev => [...prev, ...newFiles]);
    if (e.target) e.target.value = "";
  };

  const removeUpload = (index: number, type: "floor" | "dream") => {
    if (type === "floor") setUploads(prev => prev.filter((_, i) => i !== index));
    else setDreamUploads(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent, type: "floor" | "dream") => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    const newFiles: UploadedFile[] = files.map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
      type,
    }));
    if (type === "floor") setUploads(prev => [...prev, ...newFiles]);
    else setDreamUploads(prev => [...prev, ...newFiles]);
  };

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMessages(prev => [...prev, { from: "customer", name: "You", text: newMsg.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setNewMsg("");
  };

  // ── Sidebar nav items for this role ───────────────────────────────────────
  const navTabs = [
    { id: "overview",   label: "My Dashboard",    icon: Icons.grid },
    { id: "status",     label: "Project Status",  icon: Icons.trend },
    { id: "colors",     label: "Color Charts",    icon: Icons.palette },
    { id: "design",     label: "Floor Design",    icon: Icons.eye },
    { id: "documents",  label: "Documents",       icon: Icons.file },
    { id: "messages",   label: "Messages",        icon: Icons.message },
  ];

  return (
    <DashShell
      role="customer"
      title="My Dashboard"
      subtitle="Your project is in estimator review — proposal arriving within 24 hours."
      activeTab={activeTab as string}
      onTabChange={(t) => setActiveTab(t as any)}
      navTabs={navTabs}
    >
      {/* ── STATUS BANNER ─────────────────────────────────── */}
      <div style={{ background: "#050505", borderRadius: 12, padding: "20px 24px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(246,184,0,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon d={Icons.clock} size={22} color="#F6B800" />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#F6B800", marginBottom: 4 }}>Current Status</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>Estimator Review</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,.5)", marginTop: 2 }}>Proposal + 15% coupon arriving within 24 hrs</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="https://wa.me/16025550100" target="_blank" rel="noopener noreferrer"
            style={{ background: "#25d366", color: "#fff", fontWeight: 800, fontSize: 14, padding: "11px 20px", borderRadius: 8, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon d={Icons.wa} size={18} color="#fff" /> WhatsApp Us
          </a>
          <button onClick={() => setActiveTab("messages")}
            style={{ background: "rgba(255,255,255,.08)", color: "#fff", fontWeight: 700, fontSize: 14, padding: "11px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,.12)", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
            <Icon d={Icons.message} size={18} color="#fff" /> Ask a Question
          </button>
        </div>
      </div>

      {/* ── STAT CARDS ────────────────────────────────────── */}
      <div className="stats" style={{ marginBottom: 24 }}>
        {[
          { icon: Icons.map,   label: "PROJECT ID",     value: "PXP-0587",       sub: "Keep for reference" },
          { icon: Icons.tool,  label: "SYSTEM",         value: "Full Broadcast",  sub: "Garage Floor" },
          { icon: Icons.star,  label: "DISCOUNT",       value: "15% OFF",         sub: "Digital bid coupon" },
          { icon: Icons.clock, label: "ESTIMATE ETA",   value: "24 hrs",          sub: "Proposal by email" },
        ].map(({ icon, label, value, sub }) => (
          <div className="card" key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon d={icon} size={20} color="#F6B800" />
            </div>
            <div>
              <div className="clbl">{label}</div>
              <div className="cval" style={{ fontSize: 22 }}>{value}</div>
              <div className="csub">{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════
          TAB: OVERVIEW
      ══════════════════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <>
          {/* Project Timeline */}
          <div className="card" style={{ marginBottom: 24, overflowX: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <Icon d={Icons.trend} size={20} color="#F6B800" />
              <div className="clbl" style={{ margin: 0, fontSize: 13 }}>Project Timeline</div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", minWidth: 560 }}>
              {TIMELINE.map((step, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center", position: "relative" }}>
                  {i < TIMELINE.length - 1 && (
                    <div style={{ position: "absolute", top: 18, left: "50%", width: "100%", height: 2, background: step.state === "done" ? "#F6B800" : "#e5e7eb", zIndex: 0 }} />
                  )}
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: step.state === "done" ? "#F6B800" : step.state === "active" ? "#111" : "#e5e7eb",
                    color: step.state === "done" ? "#000" : step.state === "active" ? "#fff" : "#999",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 800, position: "relative", zIndex: 1, flexShrink: 0,
                    boxShadow: step.state === "active" ? "0 0 0 4px rgba(246,184,0,.25)" : "none",
                  }}>
                    {step.state === "done" ? <Icon d={Icons.check} size={16} color="#000" /> : step.n}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#111", marginTop: 8, lineHeight: 1.3 }}>{step.label}</div>
                  <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>{step.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Floor Photos */}
          <div className="card" style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <Icon d={Icons.camera} size={20} color="#F6B800" />
              <div style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>Upload Your Floor Photos</div>
              {uploads.length > 0 && (
                <span style={{ background: "#F6B800", color: "#000", fontSize: 12, fontWeight: 900, padding: "2px 10px", borderRadius: 100 }}>
                  {uploads.length} photo{uploads.length !== 1 ? "s" : ""} attached
                </span>
              )}
            </div>
            <div style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
              Upload photos of your current floor — concrete condition, room dimensions, any cracks or stains. The more photos the better our estimate.
            </div>

            {/* Drop zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "floor")}
              onClick={() => floorRef.current?.click()}
              style={{
                border: "2px dashed #e5e7eb", borderRadius: 10, padding: "28px 20px", textAlign: "center",
                background: "#f9f9fa", cursor: "pointer", transition: "border-color .15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#F6B800")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <Icon d={Icons.upload} size={32} color="#F6B800" />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 4 }}>
                Click or drag photos here
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>JPG, PNG, WEBP — multiple files OK</div>
            </div>
            <input ref={floorRef} type="file" accept="image/*" multiple onChange={handleFloorUpload} style={{ display: "none" }} />

            {/* Previews */}
            {uploads.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 10, marginTop: 16 }}>
                {uploads.map((u, i) => (
                  <div key={i} style={{ position: "relative", aspectRatio: "1", borderRadius: 8, overflow: "hidden", border: "1px solid #e5e7eb" }}>
                    <img src={u.preview} alt={u.file.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button
                      onClick={() => removeUpload(i, "floor")}
                      style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,.7)", border: "none", borderRadius: "50%", width: 22, height: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon d={Icons.x} size={12} color="#fff" />
                    </button>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,.6)", fontSize: 9, color: "#fff", padding: "3px 6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {u.file.name}
                    </div>
                  </div>
                ))}
                <div
                  onClick={() => floorRef.current?.click()}
                  style={{ aspectRatio: "1", borderRadius: 8, border: "2px dashed #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "#fafafa" }}>
                  <Icon d={Icons.plus} size={24} color="#bbb" />
                </div>
              </div>
            )}
          </div>

          {/* Upload Dream Floor */}
          <div className="card" style={{ marginBottom: 24, border: "1px solid #F6B800" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <Icon d={Icons.heart} size={20} color="#F6B800" />
              <div style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>Upload Your Dream Floor</div>
              {dreamUploads.length > 0 && (
                <span style={{ background: "#050505", color: "#F6B800", fontSize: 12, fontWeight: 900, padding: "2px 10px", borderRadius: 100 }}>
                  {dreamUploads.length} inspiration photo{dreamUploads.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            <div style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
              Found a floor you love on our site, Instagram, or Pinterest? Upload it here. Your installer will use these photos to match your vision exactly — and our visualizer can render it on your actual floor.
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, "dream")}
              onClick={() => dreamRef.current?.click()}
              style={{
                border: "2px dashed #F6B800", borderRadius: 10, padding: "28px 20px", textAlign: "center",
                background: "rgba(246,184,0,.03)", cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <Icon d={Icons.heart} size={32} color="#F6B800" />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 4 }}>
                Show us your dream finish
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>Screenshots, saved photos, magazine images — anything goes</div>
            </div>
            <input ref={dreamRef} type="file" accept="image/*" multiple onChange={handleDreamUpload} style={{ display: "none" }} />

            {dreamUploads.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 10, marginTop: 16 }}>
                {dreamUploads.map((u, i) => (
                  <div key={i} style={{ position: "relative", aspectRatio: "1", borderRadius: 8, overflow: "hidden", border: "2px solid rgba(246,184,0,.4)" }}>
                    <img src={u.preview} alt={u.file.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button
                      onClick={() => removeUpload(i, "dream")}
                      style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,.7)", border: "none", borderRadius: "50%", width: 22, height: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon d={Icons.x} size={12} color="#fff" />
                    </button>
                  </div>
                ))}
                <div onClick={() => dreamRef.current?.click()}
                  style={{ aspectRatio: "1", borderRadius: 8, border: "2px dashed rgba(246,184,0,.4)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "rgba(246,184,0,.04)" }}>
                  <Icon d={Icons.plus} size={24} color="#F6B800" />
                </div>
              </div>
            )}
          </div>

          {/* Quick Finish Selector */}
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Icon d={Icons.palette} size={20} color="#F6B800" />
              <div style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>Choose Your Finish</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
              {COLOR_SYSTEMS.map((sys) => (
                <div key={sys.id}
                  onClick={() => setActiveTab("colors")}
                  style={{ border: `2px solid ${selectedColor?.sys === sys.id ? "#F6B800" : "#e5e7eb"}`, borderRadius: 10, padding: 14, cursor: "pointer", transition: "border-color .15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#F6B800")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = selectedColor?.sys === sys.id ? "#F6B800" : "#e5e7eb")}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
                    {sys.swatches.slice(0, 6).map((c, i) => (
                      <div key={i} style={{ width: 24, height: 24, borderRadius: 4, background: c, border: "1px solid rgba(0,0,0,.08)" }} />
                    ))}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#111" }}>{sys.name}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{sys.sub}</div>
                  {sys.tag && <span style={{ display: "inline-block", marginTop: 6, background: "#F6B800", color: "#000", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 4 }}>{sys.tag}</span>}
                </div>
              ))}
            </div>
            <button onClick={() => setActiveTab("colors")}
              style={{ marginTop: 16, background: "transparent", border: "none", color: "#F6B800", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              View Full Color System <Icon d={Icons.eye} size={16} color="#F6B800" />
            </button>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════
          TAB: PROJECT STATUS
      ══════════════════════════════════════════════════════ */}
      {activeTab === "status" && (
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <Icon d={Icons.trend} size={22} color="#F6B800" />
            <div style={{ fontSize: 18, fontWeight: 900, color: "#111" }}>Project Status — PXP-0587</div>
          </div>
          {TIMELINE.map((step, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 16, padding: "18px 0",
              borderBottom: i < TIMELINE.length - 1 ? "1px solid #f0f0f0" : "none",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                background: step.state === "done" ? "#F6B800" : step.state === "active" ? "#050505" : "#f0f0f0",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: step.state === "active" ? "0 0 0 4px rgba(246,184,0,.25)" : "none",
              }}>
                {step.state === "done"
                  ? <Icon d={Icons.check} size={20} color="#000" />
                  : <span style={{ fontSize: 15, fontWeight: 900, color: step.state === "active" ? "#fff" : "#bbb" }}>{step.n}</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: step.state === "" ? "#bbb" : "#111" }}>{step.label}</div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{step.sub}</div>
                {step.state === "active" && (
                  <div style={{ marginTop: 8, background: "rgba(246,184,0,.1)", border: "1px solid rgba(246,184,0,.3)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#7a5a00" }}>
                    Your project is currently here. Our estimator is reviewing your floor type and calculating your custom quote.
                  </div>
                )}
              </div>
              <div>
                {step.state === "done" && <span className="badge bg">Complete</span>}
                {step.state === "active" && <span className="badge ba">In Progress</span>}
                {step.state === "" && <span className="badge" style={{ background: "#f0f0f0", color: "#bbb" }}>Pending</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          TAB: COLOR CHARTS
      ══════════════════════════════════════════════════════ */}
      {activeTab === "colors" && (
        <>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#111", marginBottom: 4 }}>XPS Color Systems</div>
            <div style={{ fontSize: 14, color: "#666" }}>All finishes available through Xtreme Polishing Systems — America's #1 Epoxy Super Store. Click any swatch to select.</div>
          </div>

          {selectedColor && (
            <div style={{ background: "#050505", borderRadius: 12, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: selectedColor.hex, border: "2px solid rgba(255,255,255,.2)", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Selected Color</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{selectedColor.name}</div>
                <div style={{ fontSize: 13, color: "#F6B800" }}>{selectedColor.sys}</div>
              </div>
              <button style={{ marginLeft: "auto", background: "#F6B800", color: "#000", fontWeight: 900, fontSize: 13, padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer" }}>
                Confirm This Color →
              </button>
            </div>
          )}

          {COLOR_SYSTEMS.map((sys) => (
            <div key={sys.id} className="card" style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "#111" }}>{sys.name}</div>
                  <div style={{ fontSize: 13, color: "#888" }}>{sys.sub}</div>
                </div>
                {sys.tag && <span style={{ background: "#F6B800", color: "#000", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 100 }}>{sys.tag}</span>}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))", gap: 10 }}>
                {sys.swatches.map((hex, i) => (
                  <div key={i}
                    onClick={() => setSelectedColor({ sys: sys.name, name: sys.names[i], hex })}
                    style={{
                      cursor: "pointer", textAlign: "center",
                      outline: selectedColor?.hex === hex ? "3px solid #F6B800" : "none",
                      outlineOffset: 2, borderRadius: 8,
                    }}>
                    <div style={{ width: "100%", aspectRatio: "1", borderRadius: 8, background: hex, border: "1px solid rgba(0,0,0,.08)", marginBottom: 4, transition: "transform .15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#555", lineHeight: 1.2 }}>{sys.names[i]}</div>
                  </div>
                ))}
              </div>
              <a href="https://xtremepolishingsystems.com/pages/color-charts" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, fontSize: 13, fontWeight: 700, color: "#F6B800" }}>
                View Full XPS Color System <Icon d={Icons.eye} size={14} color="#F6B800" />
              </a>
            </div>
          ))}
        </>
      )}

      {/* ══════════════════════════════════════════════════════
          TAB: FLOOR DESIGN
      ══════════════════════════════════════════════════════ */}
      {activeTab === "design" && (
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <Icon d={Icons.eye} size={22} color="#F6B800" />
            <div style={{ fontSize: 18, fontWeight: 900, color: "#111" }}>Floor Design Center</div>
          </div>
          <div style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>
            Upload a photo of your floor and we'll render your selected finish on it in real time. You can also upload dream floors you've found online — our team uses these to match your vision.
          </div>

          {/* Photo upload zone */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 10 }}>Your Current Floor</div>
              <div
                onClick={() => floorRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "floor")}
                style={{ border: "2px dashed #e5e7eb", borderRadius: 10, padding: "32px 16px", textAlign: "center", cursor: "pointer", background: "#fafafa" }}>
                <Icon d={Icons.camera} size={28} color="#bbb" />
                <div style={{ fontSize: 14, fontWeight: 600, color: "#888", marginTop: 8 }}>Upload floor photos</div>
                <div style={{ fontSize: 12, color: "#bbb", marginTop: 4 }}>Multiple files supported</div>
              </div>
              {uploads.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
                  {uploads.map((u, i) => (
                    <div key={i} style={{ position: "relative", aspectRatio: "1", borderRadius: 8, overflow: "hidden" }}>
                      <img src={u.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button onClick={() => removeUpload(i, "floor")}
                        style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,.7)", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer", display: "grid", placeItems: "center" }}>
                        <Icon d={Icons.x} size={10} color="#fff" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 10 }}>Your Dream Floors</div>
              <div
                onClick={() => dreamRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, "dream")}
                style={{ border: "2px dashed #F6B800", borderRadius: 10, padding: "32px 16px", textAlign: "center", cursor: "pointer", background: "rgba(246,184,0,.03)" }}>
                <Icon d={Icons.heart} size={28} color="#F6B800" />
                <div style={{ fontSize: 14, fontWeight: 600, color: "#888", marginTop: 8 }}>Upload inspiration photos</div>
                <div style={{ fontSize: 12, color: "#bbb", marginTop: 4 }}>From our site, Instagram, Pinterest</div>
              </div>
              {dreamUploads.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
                  {dreamUploads.map((u, i) => (
                    <div key={i} style={{ position: "relative", aspectRatio: "1", borderRadius: 8, overflow: "hidden", border: "2px solid rgba(246,184,0,.4)" }}>
                      <img src={u.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button onClick={() => removeUpload(i, "dream")}
                        style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,.7)", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer", display: "grid", placeItems: "center" }}>
                        <Icon d={Icons.x} size={10} color="#fff" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={{ background: "#050505", borderRadius: 10, padding: "20px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 6 }}>3D Floor Visualizer</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 16 }}>Upload your floor photo above, then use our AI visualizer to see any XPS finish rendered on your actual floor.</div>
            <a href="https://xtremepolishingsystems.com/pages/flake-visualizer" target="_blank" rel="noopener noreferrer"
              style={{ background: "#F6B800", color: "#000", fontWeight: 900, fontSize: 14, padding: "12px 24px", borderRadius: 8, display: "inline-block" }}>
              Open XPS Flake Visualizer →
            </a>
          </div>
          <input ref={floorRef} type="file" accept="image/*" multiple onChange={handleFloorUpload} style={{ display: "none" }} />
          <input ref={dreamRef} type="file" accept="image/*" multiple onChange={handleDreamUpload} style={{ display: "none" }} />
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          TAB: DOCUMENTS
      ══════════════════════════════════════════════════════ */}
      {activeTab === "documents" && (
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <Icon d={Icons.file} size={22} color="#F6B800" />
            <div style={{ fontSize: 18, fontWeight: 900, color: "#111" }}>Your Documents</div>
          </div>
          {[
            { name: "Digital Bid — PXP-0587.pdf",       type: "Bid",           status: "Ready",    date: "Today", icon: Icons.file },
            { name: "Project Proposal — v1.pdf",         type: "Proposal",      status: "Pending",  date: "ETA 24hrs", icon: Icons.file },
            { name: "Warranty Certificate.pdf",          type: "Warranty",      status: "Pending",  date: "After install", icon: Icons.star },
            { name: "Color Approval Form.pdf",           type: "Approval",      status: "Pending",  date: "After proposal", icon: Icons.palette },
            { name: "Care & Maintenance Guide.pdf",      type: "Guide",         status: "Ready",    date: "Available now", icon: Icons.tool },
          ].map((doc, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "16px 0",
              borderBottom: i < 4 ? "1px solid #f0f0f0" : "none",
            }}>
              <div style={{ width: 42, height: 42, borderRadius: 8, background: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon d={doc.icon} size={20} color={doc.status === "Ready" ? "#F6B800" : "#bbb"} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: doc.status === "Ready" ? "#111" : "#bbb" }}>{doc.name}</div>
                <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{doc.type} · {doc.date}</div>
              </div>
              {doc.status === "Ready"
                ? <button style={{ background: "#050505", color: "#F6B800", border: "none", fontWeight: 800, fontSize: 13, padding: "8px 16px", borderRadius: 8, cursor: "pointer" }}>Download</button>
                : <span className="badge ba">{doc.status}</span>}
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          TAB: MESSAGES
      ══════════════════════════════════════════════════════ */}
      {activeTab === "messages" && (
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: 0, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 10 }}>
            <Icon d={Icons.message} size={20} color="#F6B800" />
            <div style={{ fontSize: 16, fontWeight: 900, color: "#111" }}>Project Messages</div>
            <span style={{ background: "#f0f0f0", color: "#666", fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 100 }}>{messages.length}</span>
          </div>

          {/* Message thread */}
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 14, minHeight: 300, maxHeight: 400, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.from === "customer" ? "flex-end" : "flex-start" }}>
                <div style={{ fontSize: 11, color: "#999", marginBottom: 4, fontWeight: 600 }}>{m.name} · {m.time}</div>
                <div style={{
                  maxWidth: "80%", padding: "12px 16px", borderRadius: 12,
                  background: m.from === "customer" ? "#050505" : "#f5f5f5",
                  color: m.from === "customer" ? "#fff" : "#111",
                  fontSize: 14, lineHeight: 1.5,
                  borderBottomRightRadius: m.from === "customer" ? 4 : 12,
                  borderBottomLeftRadius: m.from === "ops" ? 4 : 12,
                }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: "16px 20px", borderTop: "1px solid #f0f0f0", display: "flex", gap: 10 }}>
            <input
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message…"
              style={{ flex: 1, padding: "12px 16px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "inherit" }}
            />
            <button onClick={sendMessage}
              style={{ background: "#F6B800", color: "#000", fontWeight: 900, fontSize: 14, padding: "12px 20px", borderRadius: 8, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              Send <Icon d={Icons.wa} size={16} color="#000" />
            </button>
          </div>
          <div style={{ padding: "10px 20px", background: "#fafafa", borderTop: "1px solid #f0f0f0" }}>
            <a href="https://wa.me/16025550100" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "#25d366" }}>
              <Icon d={Icons.wa} size={16} color="#25d366" />
              Also available on WhatsApp — replies in minutes
            </a>
          </div>
        </div>
      )}
    </DashShell>
  );
}
