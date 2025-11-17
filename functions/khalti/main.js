import fetch from "node-fetch";

export default async function (req) {
  // 1️⃣ Parse payload correctly
  let body;
  try {
    if (!req.payload) throw new Error("No payload found");
    body = JSON.parse(req.payload);
  } catch (err) {
    return { status: 400, body: { error: "Invalid JSON in request body" } };
  }

  // 2️⃣ Validate Khalti key
  const KHALTI_KEY = String(process.env.VITE_KHALTI_PRIVATE_KEY || "").trim();
  if (!KHALTI_KEY) {
    return { status: 500, body: { error: "Khalti private key not set" } };
  }

  // 3️⃣ Call Khalti
  try {
    const res = await fetch("https://khalti.com/api/v2/epayment/initiate/", {
      method: "POST",
      headers: {
        Authorization: `Key ${KHALTI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    return { status: res.status, body: data };
  } catch (err) {
    return { status: 500, body: { error: "Failed to call Khalti API" } };
  }
}
