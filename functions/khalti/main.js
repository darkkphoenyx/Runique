export default async function (req) {
  const body = req.body; // or parse text if needed

  const khaltiRes = await fetch(
    "https://khalti.com/api/v2/epayment/initiate/",
    {
      method: "POST",
      headers: {
        Authorization: `Key ${process.env.VITE_KHALTI_PRIVATE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await khaltiRes.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
