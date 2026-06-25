"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CHARTS = [
  {name:"Full Broadcast Flake",colors:["#c8baa0","#a09070","#d4c8b0","#786050"],desc:"Most popular. Hides imperfections. Heavy foot traffic."},
  {name:"Metallic Epoxy",colors:["#8a7a6a","#c8b090","#4a5060","#303840"],desc:"High-gloss 3D effect. Unique to every pour."},
  {name:"Solid Color",colors:["#e8e0d8","#b0b8c0","#4a4840","#708090"],desc:"Clean, modern. Commercial grade durability."},
  {name:"Quartz System",colors:["#e0d8c8","#c8c0a8","#d8d0b8","#f0e8d8"],desc:"Maximum slip resistance. Ideal for outdoor and pool decks."},
  {name:"Polished Concrete",colors:["#c0c8d0","#b0b8c0","#a0a8b0","#d0d8e0"],desc:"Natural stone look. Zero maintenance. Built to last 25+ years."},
];

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({name:"",email:"",phone:""});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!form.name||!form.email||!form.phone) return;
    setBusy(true);
    try { await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,source:"homepage",city:"Phoenix"})}); } catch{}
    setDone(true); setBusy(false);
    setTimeout(()=>router.push("/customer-portal/dashboard"),1400);
  };

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-left">
          <div className="hero-badge"><span style={{width:6,height:6,borderRadius:"50%",background:"#F6B800",display:"inline-block"}} />Powered by Xtreme Polishing Systems — Americas #1 Epoxy Super Store</div>
          <h1 className="hero-h1">Phoenix Most Advanced<em>Epoxy Floor</em>Coating System</h1>
          <p className="hero-sub">Garage floors, commercial spaces, patios and polished concrete. Digital bid in 10 minutes. Real-time project tracking. Backed by XPS-certified materials.</p>
          <div className="hero-actions">
            <a href="/digital-bid" className="btn-g">Start Digital Bid →</a>
            <a href="https://wa.me/16025550100" target="_blank" rel="noopener noreferrer" className="btn-o">💬 WhatsApp Us</a>
          </div>
          <div className="hero-stats">
            {[["4.9★","Google Rating"],["200+","Phoenix Jobs"],["24hr","Bid Turnaround"],["Lifetime","Warranty"]].map(([n,l])=>(
              <div key={l}><div className="hero-stat-num">{n}</div><div className="hero-stat-label">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="hero-right">
          <div className="form-card">
            <div className="form-tag">Get Your Free Digital Bid</div>
            <div className="form-title">See Your Floor Transformed</div>
            <div className="form-sub">Upload a photo. See your finish in real time. Bid ready in 10 minutes.</div>
            {done ? (
              <div style={{textAlign:"center",padding:"24px 0"}}>
                <div style={{fontSize:32,marginBottom:12}}>✅</div>
                <div style={{fontWeight:800,fontSize:16,color:"#111"}}>Got it! Taking you to your dashboard...</div>
              </div>
            ) : (
              <form onSubmit={submit}>
                <input className="f-in" placeholder="Your Full Name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
                <input className="f-in" type="email" placeholder="Email Address" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required />
                <input className="f-in" type="tel" placeholder="Phone / WhatsApp" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} required />
                <button className="f-sub" type="submit" disabled={busy}>{busy?"Submitting...":"Start My Digital Bid →"}</button>
                <div className="f-note">No spam. No sales calls. Just your digital bid.</div>
              </form>
            )}
            <div className="f-power">POWERED BY<br /><strong>Xtreme Polishing Systems</strong><br />Americas #1 All-American Epoxy Super Store</div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust">
        {["✓ XPS-Certified Materials","✓ Licensed and Insured","✓ Free Digital Bid","✓ Lifetime Warranty","✓ WhatsApp Updates"].map(t=>(
          <div className="trust-i" key={t}>{t}</div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <div className="sec">
        <div className="slbl">Simple Process</div>
        <h2 className="stitle">How It Works</h2>
        <p className="ssub">From first photo to finished floor. Every step tracked in your dashboard.</p>
        <div className="g5">
          {[["1","Submit Photos","Upload floor photos and square footage. Takes 2 minutes."],["2","Finish Guidance","Compare flake, metallic, quartz, and more side by side."],["3","Project Setup","Your project moves into our portal with full tracking."],["4","Get Your Bid","Detailed digital proposal in 24 hours via email and WhatsApp."],["5","Schedule and Install","Approve, pay deposit, we handle the rest with real-time tracking."]].map(([n,t,d])=>(
            <div className="pcard" key={n}><div className="pnum">{n}</div><div style={{fontWeight:800,fontSize:15,color:"#111",marginBottom:8}}>{t}</div><div style={{fontSize:13,color:"#666",lineHeight:1.5}}>{d}</div></div>
          ))}
        </div>
      </div>

      {/* COLOR CHARTS */}
      <div className="sec-dk" id="colors">
        <div className="inn">
          <div className="slbl">Finish Systems</div>
          <h2 className="stitle lt">Choose Your System</h2>
          <p className="ssub lt">Every system is XPS-certified and installed by factory-trained applicators.</p>
          <div className="g3">
            {CHARTS.map(c=>(
              <div className="dcard" key={c.name}>
                <div style={{display:"flex",gap:8,marginBottom:16}}>
                  {c.colors.map((col,i)=><div key={i} style={{width:32,height:32,borderRadius:6,background:col,border:"1px solid #333"}} />)}
                </div>
                <div style={{fontWeight:800,fontSize:16,color:"#fff",marginBottom:8}}>{c.name}</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,0.55)",lineHeight:1.6}}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="sec">
        <div className="slbl">What We Do</div>
        <h2 className="stitle">Every Surface. Every System.</h2>
        <p className="ssub">XPS-trained applicators. Factory-certified materials. Lifetime warranty.</p>
        <div className="g3">
          {[["🏠","Garage Floors","Full broadcast flake, metallic, solid color. 1-day installs. Lifetime warranty."],["🏢","Commercial","High-traffic formulas. Chemical-resistant. Restaurant, retail, warehouse."],["🌿","Patios and Outdoor","UV-stable, slip-resistant. Pool decks, driveways, walkways."],["✨","Polished Concrete","Grind-and-seal to high-polish. Zero maintenance. 25+ year lifespan."],["🎨","Custom Designs","Logos, patterns, color blends. Unique to your space."],["🔧","Repairs","Crack fill, delamination repair, surface prep."]].map(([icon,title,desc])=>(
            <div key={title} style={{background:"#f8f9fa",border:"1px solid #e5e7eb",borderRadius:12,padding:24}}>
              <div style={{fontSize:28,marginBottom:12}}>{icon}</div>
              <div style={{fontWeight:800,fontSize:16,color:"#111",marginBottom:8}}>{title}</div>
              <div style={{fontSize:13,color:"#666",lineHeight:1.6}}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{background:"#050505",padding:"80px 24px",textAlign:"center"}}>
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <div className="slbl" style={{justifyContent:"center",display:"flex"}}>Ready?</div>
          <h2 className="stitle lt" style={{marginBottom:16}}>Get Your Free Digital Bid Today</h2>
          <p className="ssub lt" style={{margin:"0 auto 32px"}}>No obligation. Real pricing delivered to your phone in 10 minutes.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <a href="/digital-bid" className="btn-g">Start My Digital Bid →</a>
            <a href="https://wa.me/16025550100" target="_blank" rel="noopener noreferrer" className="btn-o">💬 WhatsApp Now</a>
          </div>
        </div>
      </div>
    </>
  );
}