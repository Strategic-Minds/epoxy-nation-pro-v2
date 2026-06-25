"use client";
import { DashShell } from "../../components/DashShell";
const TL=[{n:1,l:"Bid Submitted",s:"Complete",t:"dn"},{n:2,l:"Estimator Review",s:"In Progress",t:"ac"},{n:3,l:"Proposal Sent",s:"Next",t:""},{n:4,l:"Approve and Pay",s:"After Proposal",t:""},{n:5,l:"Install Scheduled",s:"After Payment",t:""}];
const COLORS=[{name:"Full Broadcast Flake",colors:["#c8baa0","#a09070","#d4c8b0","#786050"]},{name:"Metallic Epoxy",colors:["#8a7a6a","#c8b090","#4a5060","#303840"]},{name:"Solid Color",colors:["#e8e0d8","#b0b8c0","#4a4840","#708090"]},{name:"Quartz System",colors:["#e0d8c8","#c8c0a8","#d8d0b8","#f0e8d8"]}];
export default function CustomerDash() {
  return (
    <DashShell role="customer" title="My Dashboard" subtitle="Welcome back! Your project is in estimator review.">
      <div style={{background:"#050505",borderRadius:10,padding:"20px 24px",marginBottom:20,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:10,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:"#F6B800",marginBottom:4}}>Current Status</div>
          <div style={{fontSize:18,fontWeight:900,color:"#fff"}}>Estimator Review</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.55)",marginTop:3}}>Watch email for your proposal and 15% coupon.</div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <a href="https://wa.me/16025550100" target="_blank" rel="noopener noreferrer" style={{background:"#25d366",color:"#fff",fontWeight:800,fontSize:13,padding:"10px 18px",borderRadius:7}}>💬 WhatsApp Us</a>
          <button style={{background:"rgba(0,0,0,0.06)",color:"#111",fontWeight:700,fontSize:13,padding:"10px 18px",borderRadius:7,border:"1px solid #e5e7eb",cursor:"pointer"}}>Ask a Question</button>
        </div>
      </div>
      <div className="stats">
        {[["PROJECT ID","PXP-0587","Keep for reference"],["SYSTEM","Full Broadcast","Garage Floor"],["DISCOUNT","15% OFF","Digital bid coupon"],["ESTIMATE ETA","24 hrs","Proposal by email"]].map(([l,v,s])=>(
          <div className="card" key={l}><div className="clbl">{l}</div><div className="cval" style={{fontSize:20}}>{v}</div><div className="csub">{s}</div></div>
        ))}
      </div>
      <div className="card" style={{marginBottom:20}}>
        <div className="clbl" style={{marginBottom:20}}>Project Timeline</div>
        <div className="tl">
          {TL.map((step,i)=>(
            <div className={"tls"+(step.t==="dn"?" dn":"")} key={i}>
              <div className={"tld"+(step.t==="dn"?" dn":step.t==="ac"?" ac":"")}>{step.t==="dn"?"✓":step.n}</div>
              <div className="tll">{step.l}</div><div className="tls2">{step.s}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{marginBottom:20}}>
        <div className="clbl" style={{marginBottom:16}}>Choose Your Finish</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
          {COLORS.map(c=>(
            <div key={c.name} style={{border:"1px solid #e5e7eb",borderRadius:8,padding:14,cursor:"pointer"}}>
              <div style={{display:"flex",gap:6,marginBottom:10}}>{c.colors.map((col,i)=><div key={i} style={{width:28,height:28,borderRadius:4,background:col,border:"1px solid #ddd"}} />)}</div>
              <div style={{fontSize:13,fontWeight:700,color:"#111"}}>{c.name}</div>
            </div>
          ))}
        </div>
        <a href="/design" style={{display:"inline-flex",marginTop:16,fontSize:13,fontWeight:700,color:"#F6B800"}}>Open Design Center →</a>
      </div>
      <div className="card">
        <div className="clbl" style={{marginBottom:12}}>Upload Floor Photos</div>
        <div style={{border:"2px dashed #e5e7eb",borderRadius:8,padding:"32px 24px",textAlign:"center",background:"#f9f9f9",cursor:"pointer"}}>
          <div style={{fontSize:28,marginBottom:8}}>📸</div>
          <div style={{fontWeight:700,fontSize:14,color:"#111",marginBottom:4}}>Drop photos here or tap to upload</div>
          <div style={{fontSize:12,color:"#888"}}>JPG, PNG, HEIC — max 25MB each</div>
        </div>
      </div>
    </DashShell>
  );
}