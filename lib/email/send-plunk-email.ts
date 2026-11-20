interface PlunkEmail {
  to: string;
  subject: string;
  body: string;
  reply?: string;
}

export async function sendPlunkEmail(apiKey: string, payload: PlunkEmail) {
  const response = await fetch("https://next-api.useplunk.com/v1/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      ...payload,
      from: "contact@ricospanishacademy.com",
    }),
  });

  return response.ok;
}
