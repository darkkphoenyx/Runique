import fetch from "node-fetch";

export default async function (req, res) {
  let body;
  try {
    body = req.bodyJson; // ✅ Appwrite automatically parses JSON
    if (!body) throw new Error("No JSON body");
  } catch (err) {
    return res.json({ error: "Invalid JSON in request body" }, 400);
  }

  const KHALTI_KEY = process.env.VITE_KHALTI_PRIVATE_KEY;
  if (!KHALTI_KEY) return res.json({ error: "Khalti key not set" }, 500);

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
    return res.json(data, khaltiRes.status);
  } catch (err) {
    return res.json({ error: "Failed to call Khalti API" }, 500);
  }
}
