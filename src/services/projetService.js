const API_URL = "http://localhost:3001/projets";

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error("Erreur API");
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
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  return handleResponse(response);
}
