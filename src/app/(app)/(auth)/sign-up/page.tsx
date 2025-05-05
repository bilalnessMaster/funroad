import SignUpView from "@/modules/auth/ui/views/sign-up-view";
import { caller } from "@/trpc/server";
const Page = () => {
 const session = await caller.auth.session();
 if(session?.user){
   redirect('/')
 }
  return (
    <div>
    <SignUpView />
    </div>
  )
}



export default Page;
