const API = "http://localhost:3000";

export async function fetchFromAPI<TBody>(
  endpointURL: string,
  opts?: {
    method?: string;
    body?: TBody;
  }
) {
  const { method, body } = { method: "POST", body: null, ...opts };

  const res = await fetch(`${API}/${endpointURL}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}
