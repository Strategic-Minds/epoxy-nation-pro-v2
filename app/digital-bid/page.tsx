"use client";
import{useState}from"react";
import{useRouter}from"next/navigation";
export default function BidPage(){
  const router=useRouter();
  const[step,setStep]=useState(1);
  const[f,setF]=useState({name:"",email:"",phone:"",address:"",sqft:"",floor:"",system:"",timeline:"",notes:""});
  const[busy,setBusy]=useState(false);
  const up=(k:string,v:string)=>setF(p=>({...p,[k]:v}));
  const submit=async()=>{setBusy(true);try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...f,source:"digital-bid",city:"Phoenix"})});}catch{}setBusy(false);router.push("/customer-portal/dashboard");};
  return(
    <div style={{maxWidth:600,margin:"0 auto",padding:"60px 24px"}}>
      <div className="slbl">Step {step} of 3</div>
      <h1 className="stitle" style={{marginBottom:8}}>Start Your Digital Bid</h1>
      <p style={{fontSize:14,color:"#888",marginBottom:32}}>No sales call. Real pricing in 24 hours.</p>
      <div style={{display:"flex",gap:8,marginBottom:32}}>{[1,2,3].map(s=>(<div key={s} style={{flex:1,height:4,borderRadius:2,background:s<=step?"#F6B800":"#e5e7eb"}} />))}</div>
      <div className="card">
        {step===1&&(<>
          <h2 style={{fontSize:18,fontWeight:800,marginBottom:20}}>Your Contact Info</h2>
          <input className="f-in" placeholder="Full Name *" value={f.name} onChange={e=>up("name",e.target.value)} />
          <input className="f-in" type="email" placeholder="Email Address *" value={f.email} onChange={e=>up("email",e.target.value)} />
          <input className="f-in" type="tel" placeholder="Phone / WhatsApp *" value={f.phone} onChange={e=>up("phone",e.target.value)} />
          <input className="f-in" placeholder="Project Address (City, AZ)" value={f.address} onChange={e=>up("address",e.target.value)} />
          <button className="f-sub" onClick={()=>f.name&&f.email&&f.phone&&setStep(2)}>Next: Project Details →</button>
        </>)}
        {step===2&&(<>
          <h2 style={{fontSize:18,fontWeight:800,marginBottom:20}}>Project Details</h2>
          <input className="f-in" placeholder="Approximate Square Footage" value={f.sqft} onChange={e=>up("sqft",e.target.value)} />
          <select className="f-in" value={f.floor} onChange={e=>up("floor",e.target.value)}><option value="">Floor Type</option><option>Garage</option><option>Patio</option><option>Commercial</option><option>Pool Deck</option><option>Other</option></select>
          <select className="f-in" value={f.system} onChange={e=>up("system",e.target.value)}><option value="">Preferred System</option><option>Full Broadcast Flake</option><option>Metallic Epoxy</option><option>Solid Color</option><option>Quartz System</option><option>Polished Concrete</option><option>Not Sure</option></select>
          <select className="f-in" value={f.timeline} onChange={e=>up("timeline",e.target.value)}><option value="">Timeline</option><option>ASAP</option><option>1-2 Weeks</option><option>1 Month</option><option>Just Exploring</option></select>
          <div style={{display:"flex",gap:10}}><button style={{flex:1,padding:14,background:"#f5f5f5",border:"1px solid #e5e7eb",borderRadius:8,fontWeight:700,cursor:"pointer"}} onClick={()=>setStep(1)}>← Back</button><button className="f-sub" style={{flex:2}} onClick={()=>setStep(3)}>Next: Photos →</button></div>
        </>)}
        {step===3&&(<>
          <h2 style={{fontSize:18,fontWeight:800,marginBottom:20}}>Upload Floor Photos</h2>
          <div style={{border:"2px dashed #e5e7eb",borderRadius:8,padding:"40px 24px",textAlign:"center",background:"#f9f9f9",marginBottom:16,cursor:"pointer"}}><div style={{fontSize:32,marginBottom:8}}>📸</div><div style={{fontWeight:700,fontSize:14}}>Tap to upload photos</div><div style={{fontSize:12,color:"#888",marginTop:4}}>JPG, PNG, HEIC — max 25MB</div></div>
          <textarea className="f-in" placeholder="Notes or special requests..." value={f.notes} onChange={e=>up("notes",e.target.value)} style={{minHeight:80,resize:"vertical"}} />
          <div style={{display:"flex",gap:10}}><button style={{flex:1,padding:14,background:"#f5f5f5",border:"1px solid #e5e7eb",borderRadius:8,fontWeight:700,cursor:"pointer"}} onClick={()=>setStep(2)}>← Back</button><button className="f-sub" style={{flex:2}} onClick={submit} disabled={busy}>{busy?"Submitting...":"Submit Bid Request →"}</button></div>
        </>)}
      </div>
    </div>
  );
}