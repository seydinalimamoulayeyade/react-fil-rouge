import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProject } from "../services/projetService";

const initialState = {
  libelle: "",
  description: "",
  image: "",
};

export default function AjouterProjet() {
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      setSaving(true);
      await addProject(form);
      navigate("/");
    } catch {
      setError("Impossible d'ajouter le projet");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Ajouter un projet</h1>
        <p className="text-slate-400 mt-2">
          Remplissez le formulaire pour créer un nouveau projet.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6"
      >
        <div>
          <label className="mb-2 block text-sm text-slate-300">Libellé</label>
          <input
            type="text"
            name="libelle"
            value={form.libelle}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-rose-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-rose-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Image (URL)
          </label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="/images/projet3.jpg"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-rose-400"
          />
        </div>

        {error ? <p className="text-sm text-rose-400">{error}</p> : null}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex rounded-xl bg-rose-500 px-5 py-3 text-sm font-medium text-white hover:bg-rose-600 disabled:opacity-50"
        >
          {saving ? "Enregistrement..." : "Ajouter le projet"}
        </button>
      </form>
    </section>
  );
}
