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
    if (data !== 'no estas logeado') {
      setUser(
        {
        username: data[0].username,
        id: data[0].id
      }
      );
    } else {
      setUser('hola')
    }
  };

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const handleLogout = async () => {
    try {
      // handleClose();
      // localStorage.clear();
      // const res = await fetch(`http://localhost:7000/logout`);
      // const data = await res.json();
      
      
      await fetch("http://localhost:7000/logout", {
        method: "POST",
        body: JSON.stringify(''),
        headers: { "Content-type": "application/json" },
      })

      // const data = await response.json();
      // setTasks(data);
      // console.log(data)
      // return navigate("/");
    } catch (error) {
      return console.error("Ocurrio algo desed get primcipañ");
    }
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
