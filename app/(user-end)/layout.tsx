import { currentUser } from "@clerk/nextjs";
import NavBar from "../components/Mobile-NavBar";
import TopNavBar from "../components/TopNavBar";
import { db } from "@/lib/db";
import AdminNavBar from "../components/Admin-NavBar";
import { redirect } from "next/navigation";

const AuthLayout = async(
    {
        children
    }:
    {
        children:React.ReactNode
    }

) =>{

    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress
    const account = await db.users.findUnique({
        where : {
            email
        }
    })

    const isAdmin = account?.isAdmin
    if(isAdmin){
        return redirect("/admin")
    }

    return (
        !isAdmin && (
            <>
            <div>
       
       <NavBar/>
      <div className="p-5">
      <TopNavBar/>
       <div className="lg:ml-24 sm:ml-0">
       {children}
       </div>
      </div>
    </div>
           </>
            
        ) 
   
    )

}

export default AuthLayout;