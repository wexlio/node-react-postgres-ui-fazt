import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import TaskForm from "./componentes/TaskForm";
import TaskList from "./componentes/TaskList";
import { Container } from "@mui/material";
import { UserLogin } from "./componentes/UserLogin";
import { UserSingup } from "./componentes/UserSingup";
import Profile from "./componentes/Profile";

export function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/tasks/new' element={<TaskForm />} />
          <Route path='/tasks/:id/edit' element={<TaskForm />} />
          <Route path='/login' element={<UserLogin />} />
          <Route path='/singup' element={<UserSingup />} />
          {/* <Route path='/profile' element={<Profile />} /> */}
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
