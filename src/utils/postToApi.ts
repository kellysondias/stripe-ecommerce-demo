const API = "http://localhost:3000/api/v1";

export async function postToAPI<TBody>(endpointURL: string, body: object) {
  const res = await fetch(`${API}/${endpointURL}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
