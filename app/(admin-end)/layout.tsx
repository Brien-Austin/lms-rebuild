import AdminNavBar from "../components/Admin-NavBar"

const AdminLayout = async(
    {
        children
    }:
    {
        children:React.ReactNode
    }

) =>{
    return (
        <>
        <AdminNavBar/>
       <div className="px-5">
       {children}
       </div>
        </>
    )
}

export default AdminLayout