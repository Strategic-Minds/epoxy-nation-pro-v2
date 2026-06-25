"use client";
import { usePathname } from "next/navigation";

const NAV: Record<string, {label:string;href:string}[]> = {
  customer: [
    {label:"My Dashboard",  href:"/customer-portal/dashboard"},
    {label:"Project Status",href:"/customer-portal/dashboard#status"},
    {label:"Color Charts",  href:"/customer-portal/dashboard#colors"},
    {label:"Floor Design",  href:"/customer-portal/dashboard#design"},
    {label:"Documents",     href:"/customer-portal/dashboard#docs"},
    {label:"Messages",      href:"/customer-portal/dashboard#messages"},
    {label:"WhatsApp",      href:"https://wa.me/16025550100"},
  ],
  admin: [{label:"Overview",href:"/admin"},{label:"Lead Queue",href:"/admin#leads"},{label:"All Projects",href:"/admin#projects"},{label:"Crew",href:"/admin#crew"},{label:"Revenue",href:"/admin#revenue"}],
  owner: [{label:"Owner View",href:"/owner"},{label:"Revenue KPIs",href:"/owner#kpis"},{label:"Pipeline",href:"/owner#pipeline"},{label:"Team",href:"/owner#team"}],
  crew:  [{label:"My Jobs",href:"/crew"},{label:"Today",href:"/crew#today"},{label:"Change Orders",href:"/crew#changes"},{label:"Photos",href:"/crew#photos"}],
  installer:[{label:"Job Board",href:"/installer"},{label:"Active Job",href:"/installer#active"},{label:"Checklist",href:"/installer#check"},{label:"Sign-off",href:"/installer#signoff"}],
  ops:   [{label:"Command",href:"/ops"},{label:"Live Jobs",href:"/ops#live"},{label:"Schedule",href:"/ops#sched"},{label:"Materials",href:"/ops#mats"}],
};
const LABELS: Record<string,string> = {customer:"CUSTOMER",admin:"ADMIN",owner:"OWNER",crew:"CREW",installer:"INSTALLER",ops:"OPS"};

interface Props { children: React.ReactNode; role: keyof typeof NAV; title: string; subtitle?: string; }

export function DashShell({ children, role, title, subtitle }: Props) {
  const pathname = usePathname();
  return (
    <div className="dash">
      <aside className="dside">
        <div style={{padding:"16px",borderBottom:"1px solid #1a1a1a"}}>
          <div style={{fontSize:9,fontWeight:900,letterSpacing:"0.14em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:4}}>EPOXY NATION PRO</div>
          <div style={{fontSize:11,fontWeight:800,color:"#F6B800",letterSpacing:"0.1em",textTransform:"uppercase"}}>{LABELS[role]} PORTAL</div>
        </div>
        <p className="dsec">{LABELS[role]}</p>
        {(NAV[role]||[]).map(item => (
          <a key={item.href} href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={"dlink" + (pathname === item.href ? " active" : "")}
          >{item.label}</a>
        ))}
        <div style={{marginTop:"auto",padding:"16px",borderTop:"1px solid #1a1a1a"}}>
          <a href="/" style={{color:"rgba(255,255,255,0.4)",fontSize:12,fontWeight:600}}>← Back to Site</a>
        </div>
      </aside>
      <main className="dmain">
        <div className="dhd">
          <div><div className="dtitle">{title}</div>{subtitle && <div className="dsub">{subtitle}</div>}</div>
          <a href="/digital-bid" style={{background:"#F6B800",color:"#000",fontWeight:800,fontSize:12,padding:"8px 16px",borderRadius:6}}>+ New Bid</a>
        </div>
        {children}
      </main>
    </div>
  );
}