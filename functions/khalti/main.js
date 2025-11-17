export default async function (req) {
  // Parse body safely
  let body;
  try {
    body = req.body ?? JSON.parse(await req.text());
  } catch (err) {
    return { status: 400, body: { error: "Invalid JSON in request body" } };
  }

  const KHALTI_KEY = String(process.env.VITE_KHALTI_PRIVATE_KEY || "");
  if (!KHALTI_KEY) {
    return { status: 500, body: { error: "Khalti private key not set" } };
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

    return { status: khaltiRes.status, body: data };
  } catch (err) {
    return { status: 500, body: { error: "Failed to call Khalti API" } };
  }
}
