import { Route, Routes } from "react-router-dom";

function Home() {
  return <h1 className="text-white text-3xl">Liste des projets</h1>;
}

function Ajouter() {
  return <h1 className="text-white text-3xl">Ajouter un projet</h1>;
}

function Detail() {
  return <h1 className="text-white text-3xl">Détail projet</h1>;
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 p-10">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ajouter" element={<Ajouter />} />
        <Route path="/projets/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}
