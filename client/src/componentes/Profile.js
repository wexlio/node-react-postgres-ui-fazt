import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



function Cookie() {
  const [user, setUser] = useState({
    username: "",
    id: ""
  });
  const params = useParams();

  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:7000/profile/${id}`);
    const data = await res.json();
    console.log(data)
    setUser(
      {
      username: data[0].username,
      id: data[0].id
    }
    );
  };

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div>{user.username}</div>
      <Button
        onClick={handleLogout}
        variant="contained"
        color="primary"
        fullWidth={true}
        style={{
          margin: "20px 0",
        }}
        // disabled={task.title === "" || task.description === ""}
      >
        LogOut
        {/* {loading ? (
        <CircularProgress color="inherit" size={24} />
      ) : (
        "Save"
      )} */}
      </Button>
    </>
  );
}

export default Cookie;
