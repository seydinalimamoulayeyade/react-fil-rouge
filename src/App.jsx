import { Route, Routes } from "react-router-dom";
import AjouterProjet from "./components/AjouterProjet";
import DetaillerProjet from "./components/DetaillerProjet";
import Dossier from "./components/Dossier";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projets" element={<Dossier />} />
        <Route path="/ajouter" element={<AjouterProjet />} />
        <Route path="/modifier/:id" element={<AjouterProjet />} />
        <Route path="/projets/:id" element={<DetaillerProjet />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
