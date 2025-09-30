import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
export const columns =[
    {
        name:"Sr No",
        selector: (row)=>row.sno
    },
    {
        sortable:true,
        name:"Department Name",
        selector: (row)=>row.dep_name
    },
    {
        name:"Action",
        selector: (row)=>row.action
    },

];

export const DepartmentButtons = ({_id ,onDeleteDepartment})=>{
    const navigate = useNavigate();

    const handleDelete = async (id)=>{
        const confirm = window.confirm("Do you want to Delete ?")
        if(confirm){
             try {
          const response = await axios.delete(`department/${id}` ,{
           headers:{
            "Authorization":`Bearer ${localStorage
                .getItem("token")}`
           }
          })
          console.log(response.data)
          if(response.data.success){
           onDeleteDepartment()

          }
      } catch (error) {
          if(error.response && !error.response.success){
            alert(error.response.data.error)
          }
      }
        }

    }
    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 rounded:md text-white bg-teal-600"
                onClick={()=>navigate(`/admin-dashboard/department/${_id}`)}
            >
                Edit</button>
            <button className="px-3 py-1 rounded:md text-white bg-red-600"
            onClick={()=>handleDelete(_id)}
            >Delete</button>
        </div>
    )
}