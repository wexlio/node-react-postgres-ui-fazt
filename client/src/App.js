import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import TaskForm from "./componentes/TaskForm";
import TaskList from "./componentes/TaskList";
import { Container } from "@mui/material";
import { UserLogin } from "./componentes/UserLogin";

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
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
