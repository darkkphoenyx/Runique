import fetch from "node-fetch";

export default async function (req, res) {
  const body = JSON.parse(req.payload);

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
  res.json(data);
}
