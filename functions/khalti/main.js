export default async function (req, res) {
  // Parse body safely
  let body;
  try {
    body = req.body ?? JSON.parse(await req.text());
  } catch (err) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Invalid JSON in request body" }));
  }

  const KHALTI_KEY = String(process.env.VITE_KHALTI_PRIVATE_KEY || "");
  if (!KHALTI_KEY) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Khalti private key not set" }));
  }

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
    res.statusCode = khaltiRes.status;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(data));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Failed to call Khalti API" }));
  }
}
