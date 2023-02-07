import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Cookie() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    navigate("/UserLogin");
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
