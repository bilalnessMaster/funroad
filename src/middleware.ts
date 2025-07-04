import { NextRequest, NextResponse } from "next/server";




export default async function middleware(req: NextRequest) {

  console.log("middlware request 😄 ", req.headers.get("host"));
  const url = req.nextUrl // master.bilalroad.com 


  const hostname = req.headers.get("host") || "";

  const dn = "admin.funroad-rho.vercel.app" 
  const tenantSlugs = dn.split(".")[0]
  console.log(tenantSlugs)
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || '';
  if (hostname.includes(`.${domain}`)) {
    const tenantSlug = hostname.replace(`.${domain}`, '')
    return NextResponse.rewrite(new URL(`/tenant/${tenantSlug}${url.pathname}`, req.url))
    // master.bilalroad.com/id <= this is the pathname since we reformat the url with a new one 
  }
  return NextResponse.next()

}


export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|media/|[\w-]+\.\w+).*)"
  ]

}


