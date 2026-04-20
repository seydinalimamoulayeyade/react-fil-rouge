const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3001"}/projets`;

async function handleResponse(response) {
  if (!response.ok) {
    let message = `Erreur ${response.status}`;
    try {
      const data = await response.json();
      if (data && data.message) message = data.message;
    } catch (e) {}
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function getAllProjects() {
  const response = await fetch(API_URL);
  return handleResponse(response);
}

export async function deleteProject(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  await handleResponse(response);
  return true;
}

export async function getProjectById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return handleResponse(response);
}

export async function addProject(project) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return handleResponse(response);
}

export async function updateProject(id, project) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return handleResponse(response);
}
