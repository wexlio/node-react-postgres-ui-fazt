import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Cookie() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const handleLogout = async () => {
    try {
      handleClose();
      localStorage.clear();
      const res = await fetch(`http://localhost:7000/logout`);
      const data = await res.json();
      
      setTasks(data);
      console.log('señoooooooooor')
      return navigate("/");
    } catch (error) {
      return console.error("Ocurrio algo desed get primcipañ");
    }
  };

  return (
    <>
      <div>Hello world</div>
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
