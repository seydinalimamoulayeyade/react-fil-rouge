import { Route, Routes } from "react-router-dom";
import AjouterProjet from "./components/AjouterProjet";
import Dossier from "./components/Dossier";

function Detail() {
  return <h1 className="text-white text-3xl">Détail projet</h1>;
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 p-10">
      <Routes>
        <Route path="/" element={<Dossier />} />
        <Route path="/ajouter" element={<AjouterProjet />} />
        <Route path="/projets/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}
