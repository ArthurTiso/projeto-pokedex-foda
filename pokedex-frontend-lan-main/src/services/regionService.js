// src/services/regionService.js
const API_URL = "http://localhost:3000/regions";

export async function getRegions() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar regiões");
  return await res.json();
}

export async function getRegion(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar região");
  return await res.json();
}

export async function createRegion(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Erro ao criar região");
  }
  return await res.json();
}

export async function updateRegion(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Erro ao atualizar região");
  }
  return await res.json();
}

export async function deleteRegion(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Erro ao deletar região");
  }
  return await res.json();
}
