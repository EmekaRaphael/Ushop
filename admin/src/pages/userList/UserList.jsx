import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../redux/apiCalls";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userList.users);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => (
        <div className="userListUser">
          <img
            className="userListImg"
            src={params.row.avatar || "https://via.placeholder.com/40"}
            alt=""
          />
          {params.row.username}
        </div>
      ),
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "transaction", headerName: "Transaction Volume", width: 160 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <Link to={`/user/${params.row._id}`}>
            <button className="userListEdit">Edit</button>
          </Link>
          <DeleteOutline
            className="userListDelete"
            onClick={() => handleDelete(params.row._id)}
          />
        </>
      ),
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
        disableRowSelectionOnClick
        // autoHeight
      />
    </div>
  );
}