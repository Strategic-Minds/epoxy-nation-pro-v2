import{NextRequest,NextResponse}from"next/server";
export async function POST(req:NextRequest){
  try{
    const b=await req.json();
    console.log("[ENP Lead]",b.name,b.email,b.source);
    const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key=process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if(url&&key){
      await fetch(`${url}/rest/v1/leads`,{method:"POST",headers:{"Content-Type":"application/json","apikey":key,"Authorization":"Bearer "+key,"Prefer":"return=minimal"},body:JSON.stringify({name:b.name,email:b.email,phone:b.phone,source:b.source||"web",city:b.city||"Phoenix",sqft:b.sqft,floor_type:b.floorType,system:b.system,timeline:b.timeline,notes:b.notes,status:"new"})});
    }
    return NextResponse.json({success:true});
  }catch(e){return NextResponse.json({success:false},{status:500});}
}
export async function GET(){return NextResponse.json({status:"ENP Lead API active"});}