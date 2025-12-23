// import fetch from "node-fetch";

// export default async function ({ req, res, log, error }) {
//   let body;

//   // 1️⃣ Handle body correctly
//   try {
//     if (typeof req === "string") {
//       body = JSON.parse(req); // raw string → object
//     } else {
//       body = req; // already an object
//     }
//   } catch (err) {
//     return res.json({ error: "Invalid JSON in request body" }, 400);
//   }

//   // 2️⃣ Validate Khalti key
//   const KHALTI_KEY = String(process.env.VITE_KHALTI_PRIVATE_KEY || "").trim();
//   if (!KHALTI_KEY) {
//     return res.json({ error: "Khalti private key not set" }, 500);
//   }

//   // 3️⃣ Call Khalti API
//   try {
//     const khaltiRes = await fetch(
//       "https://khalti.com/api/v2/epayment/initiate/",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Key ${KHALTI_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body), // always send a proper JSON string
//       }
//     );

//     const data = await khaltiRes.json();

//     return res.json(data, khaltiRes.status);
//   } catch (err) {
//     error(err);
//     return res.json({ error: "Failed to call Khalti API" }, 500);
//   }
// }

// functions/khalti/main.js
import fetch from "node-fetch";

export default async function ({ req, res, log, error }) {
  let body;

  try {
    body = typeof req === "string" ? JSON.parse(req) : req;
  } catch (err) {
    return res.json({ error: "Invalid JSON in request body" }, 400);
  }

  const KHALTI_KEY = process.env.KHALTI_SECRET_KEY?.trim();
  console.log("khalti key", KHALTI_KEY);

  if (!KHALTI_KEY)
    return res.json({ error: "Khalti private key not set" }, 500);

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
    error(err);
    return res.json({ error: "Failed to call Khalti API" }, 500);
  }
}

// import fetch from "node-fetch";

// export default async function ({ req, res, log, error }) {
//   let body;

//   try {
//     body = typeof req === "string" ? JSON.parse(req) : req;
//   } catch (err) {
//     return res.json({ error: "Invalid JSON in request body" }, 400);
//   }

//   const KHALTI_KEY = process.env.KHALTI_SECRET_KEY?.trim();
//   if (!KHALTI_KEY)
//     return res.json({ error: "Khalti private key not set" }, 500);

//   try {
//     const khaltiRes = await fetch(
//       "https://dev.khalti.com/api/v2/epayment/initiate/",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Key ${KHALTI_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       }
//     );

//     const data = await khaltiRes.json();
//     return res.json(data, khaltiRes.status);
//   } catch (err) {
//     error(err);
//     return res.json({ error: "Failed to call Khalti API" }, 500);
//   }
// }
