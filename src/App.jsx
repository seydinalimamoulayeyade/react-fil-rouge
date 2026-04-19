import { Route, Routes } from "react-router-dom";
import AjouterProjet from "./components/AjouterProjet";
import DetaillerProjet from "./components/DetaillerProjet";
import Dossier from "./components/Dossier";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 p-10">
      <Routes>
        <Route path="/" element={<Dossier />} />
        <Route path="/ajouter" element={<AjouterProjet />} />
        <Route path="/modifier/:id" element={<AjouterProjet />} />
        <Route path="/projets/:id" element={<DetaillerProjet />} />
      </Routes>
    </div>
  );
}
