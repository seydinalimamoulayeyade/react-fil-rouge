import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProject,
  getProjectById,
  updateProject,
} from "../services/projetService";

const initialState = {
  libelle: "",
  description: "",
  image: "",
  details: "",
};

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Impossible de lire l'image."));
    reader.readAsDataURL(file);
  });
}

function loadImageFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Impossible de charger l'image."));
    image.src = dataUrl;
  });
}

async function compressImage(file, options = {}) {
  const { maxWidth = 1200, maxHeight = 800, quality = 0.75 } = options;
  const dataUrl = await fileToDataUrl(file);
  const image = await loadImageFromDataUrl(dataUrl);

  let { width, height } = image;
  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Impossible de préparer l'image.");
  }

  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", quality);
}

export default function AjouterProjet() {
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  useEffect(() => {
    async function loadProject() {
      if (!isEditing) return;

      try {
        setLoading(true);
        setError("");

        const data = await getProjectById(id);
        const projectData = {
          libelle: data.libelle || "",
          description: data.description || "",
          image: data.image || "",
          details: data.details || "",
        };

        setForm(projectData);
        setPreviewImage(projectData.image || "");
      } catch (err) {
        console.error(err);
        setError("Impossible de charger le projet à modifier.");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id, isEditing]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner un fichier image valide.");
      return;
    }

    try {
      setError("");
      const compressedImage = await compressImage(file, {
        maxWidth: 1200,
        maxHeight: 800,
        quality: 0.75,
      });

      setForm((prev) => ({ ...prev, image: compressedImage }));
      setPreviewImage(compressedImage);
    } catch (err) {
      console.error(err);
      setError("Impossible de traiter l'image sélectionnée.");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      setSaving(true);

      if (isEditing) {
        await updateProject(id, form);
      } else {
        await addProject(form);
      }

      navigate("/projets");
    } catch (err) {
      console.error(err);
      setError(
        isEditing
          ? "Impossible de modifier le projet."
          : "Impossible d'ajouter le projet.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">
          Chargement du projet...
        </h1>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          {isEditing ? "Modifier un projet" : "Ajouter un projet"}
        </h1>
        <p className="text-slate-400 mt-2">
          {isEditing
            ? "Mettez à jour les informations du projet."
            : "Remplissez le formulaire pour créer un nouveau projet."}
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
            Image du projet
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-rose-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-rose-600"
          />
          <p className="mt-2 text-xs text-slate-500">
            Sélectionnez une image. Elle sera redimensionnée et enregistrée automatiquement.
          </p>

          {previewImage ? (
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
              <img
                src={previewImage}
                alt="Aperçu du projet"
                className="h-56 w-full object-cover"
              />
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Détails</label>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            rows="5"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-rose-400"
          />
        </div>

        {error ? <p className="text-sm text-rose-400">{error}</p> : null}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex rounded-xl bg-rose-500 px-5 py-3 text-sm font-medium text-white hover:bg-rose-600 disabled:opacity-50"
          >
            {saving
              ? "Enregistrement..."
              : isEditing
                ? "Enregistrer les modifications"
                : "Ajouter le projet"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/projets")}
            className="inline-flex rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 hover:border-slate-500"
          >
            Annuler
          </button>
        </div>
      </form>
    </section>
  );
}
