const express = require("express");
const app = express();
const port = 5000;
const hubspot = require("@hubspot/api-client");

app.get("/", async (req, res) => {
  const hubspotClient = new hubspot.Client({
    accessToken: "pat-na1-f4cb6a76-e92c-4200-854d-197cef6aaf98",
  });

  const properties = {
    company: "Biglytics2",
    email: "passwordtest@mail.net",
    firstname: "Bryan",
    lastname: "Cooper",
    phone: "(877) 929-0687",
    website: "biglytics.net",
    password:"jejejf493209445"
  };
  const SimplePublicObjectInput = { properties };

  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.create(
      SimplePublicObjectInput
    );
    console.log(JSON.stringify(apiResponse.body, null, 2));
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
