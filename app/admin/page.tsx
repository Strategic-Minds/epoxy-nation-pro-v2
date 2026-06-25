"use client";
import { DashShell } from "../components/DashShell";
export default function AdminPage() {
  return (
    <DashShell role="admin" title="Admin Command Center" subtitle="All projects, leads, crew, and revenue.">
      <div className="stats">
        {[["ACTIVE JOBS","12","3 installs today"],["LEADS TODAY","7","4 new, 3 follow-up"],["REVENUE MTD","$48,200","22% vs last month"],["CREW ON-SITE","4","2 teams active"]].map(([l,v,s])=>(
          <div className="card" key={l}><div className="clbl">{l}</div><div className="cval">{v}</div><div className="csub">{s}</div></div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:8}}>
        <div className="card">
          <div className="clbl" style={{marginBottom:14}}>Lead Queue</div>
          {[["Josh M.","Garage 600sqft","bb"],["Sarah K.","Patio follow-up","ba"],["Mike T.","Proposal Sent","bg"]].map(([n,d,c])=>(
            <div key={n} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #f0f0f0"}}>
              <div><div style={{fontWeight:700,fontSize:14}}>{n}</div><div style={{fontSize:12,color:"#888"}}>{d}</div></div>
              <span className={"badge "+c}>{c==="bb"?"New":c==="ba"?"Follow-up":"Proposal"}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="clbl" style={{marginBottom:14}}>Active Jobs</div>
          {[["PXP-0587","Garage Flake","In Progress","bb"],["PXP-0586","Metallic Patio","Scheduled","ba"],["PXP-0585","Commercial","Complete","bg"]].map(([id,t,s,c])=>(
            <div key={id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #f0f0f0"}}>
              <div><div style={{fontWeight:700,fontSize:14}}>{id}</div><div style={{fontSize:12,color:"#888"}}>{t}</div></div>
              <span className={"badge "+c}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </DashShell>
  );
}