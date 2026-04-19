import { Route, Routes } from "react-router-dom";
import AjouterProjet from "./components/AjouterProjet";
import DetaillerProjet from "./components/DetaillerProjet";
import Dossier from "./components/Dossier";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dossier />} />
        <Route path="/ajouter" element={<AjouterProjet />} />
        <Route path="/modifier/:id" element={<AjouterProjet />} />
        <Route path="/projets/:id" element={<DetaillerProjet />} />
      </Route>
    </Routes>
  );
}
