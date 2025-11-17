export default async function (req) {
  // Safely parse request body
  let body;
  try {
    body = req.body ?? JSON.parse(await req.text());
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON in request body" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const KHALTI_KEY = String(process.env.VITE_KHALTI_PRIVATE_KEY || "");

  // Make request to Khalti
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

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: khaltiRes.status,
  });
}
