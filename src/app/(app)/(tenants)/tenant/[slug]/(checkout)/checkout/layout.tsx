
import Navbar from "@/modules/checkout/ui/components/navbar";
import Footer from "@/modules/tenants/ui/components/footer";
interface Props {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}


const layout = async ({ children, params }: Props) => {
  const { slug } = await params;
  return (
    <div className="min-h-screen bg-[#f4f4f0] flex flex-col ">
      <Navbar slug={slug} />
      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">
          {children}
        </div>
      </div>
      <Footer />
    </div>


  )
}


export default layout;
