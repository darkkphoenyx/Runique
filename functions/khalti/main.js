import fetch from "node-fetch";

export default async function (req) {
  // 1. Parse JSON body safely
  let body;
  try {
    if (typeof req.json === "function") {
      body = await req.json();
    } else if (typeof req.text === "function") {
      const raw = await req.text();
      body = JSON.parse(raw);
    } else if ("body" in req) {
      body = req.body;
    } else {
      throw new Error("No body found");
    }
  } catch (err) {
    return { status: 400, body: { error: "Invalid JSON in request body" } };
  }

  // 2. Validate required fields (basic)
  const required = [
    "return_url",
    "website_url",
    "amount",
    "purchase_order_id",
    "purchase_order_name",
  ];
  for (const field of required) {
    if (!body[field]) {
      return { status: 400, body: { error: `${field} is required` } };
    }
  }

  // 3. Obtain key
  const KHALTI_KEY = String(process.env.VITE_KHALTI_PRIVATE_KEY || "").trim();
  if (!KHALTI_KEY) {
    return { status: 500, body: { error: "Khalti private key not set" } };
  }

  // 4. Call Khalti initiate API
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
