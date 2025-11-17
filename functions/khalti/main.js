import fetch from "node-fetch";

export default async function (req) {
  // 1️⃣ Parse request body safely
  let body;
  try {
    if ("body" in req && req.body) {
      body = req.body;
    } else if (typeof req.json === "function") {
      body = await req.json();
    } else if (typeof req.text === "function") {
      const raw = await req.text();
      body = JSON.parse(raw);
    } else {
      throw new Error("No request body found");
    }
  } catch (err) {
    return { status: 400, body: { error: "Invalid JSON in request body" } };
  }

  // 2️⃣ Get Khalti key from environment
  const KHALTI_KEY = String(process.env.VITE_KHALTI_PRIVATE_KEY || "").trim();
  if (!KHALTI_KEY) {
    return { status: 500, body: { error: "Khalti private key not set" } };
  }

  // 3️⃣ Call Khalti API
  try {
    const khaltiRes = await fetch(
      "https://khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${KHALTI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await khaltiRes.json();

    return { status: khaltiRes.status, body: data };
  } catch (err) {
    return { status: 500, body: { error: "Failed to call Khalti API" } };
  }
}
