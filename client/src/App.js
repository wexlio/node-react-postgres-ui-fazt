import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import TaskForm from "./componentes/TaskForm";
import TaskList from "./componentes/TaskList";
import { Container } from "@mui/material";

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          // Falta edit Route
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
