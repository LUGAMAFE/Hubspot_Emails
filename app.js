const express = require("express");
const app = express();
const port = 5000;
const hubspot = require("@hubspot/api-client");
var request = require("request");
const ACCESS_TOKEN =  "pat-na1-f4cb6a76-e92c-4200-854d-197cef6aaf98"
const axios = require('axios');

app.get("/add/contact", async (req, res) => {
  const hubspotClient = new hubspot.Client({
    accessToken: ACCESS_TOKEN,
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

app.get("/move-contact-to-list", async (req, res) => {
  const emails = JSON.stringify({ "emails": [
    "luisjavier004@hotmail.com"
  ]}); 
  axios.post('https://api.hubapi.com/contacts/v1/lists/1/add',emails,
  {
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  },
  (err, data) => {
    // Handle the API response
  }
);
});

app.get("/get/contact/email/:email", async(req,res)=>{
  const email = req.params.email; 
  const hubspot = require('@hubspot/api-client');

  const hubspotClient = new hubspot.Client({"accessToken":ACCESS_TOKEN});
  const response = await hubspotClient.apiRequest({
    method:'GET', 
    path: `/crm/v3/objects/contacts/${email}?idProperty=email`
  })
  const json = await response.json()

  res.send(json.properties.firstname + " found"); 
  console.log(json)

})

app.get("/get/contact/id/:id", async(req,res)=>{
  const id = req.params.id; 
  console.log("req params", req.params);
  const hubspot = require('@hubspot/api-client');

  const hubspotClient = new hubspot.Client({"accessToken":ACCESS_TOKEN});

  const contactId = id;
  const properties = undefined;
  const propertiesWithHistory = undefined;
  const associations = undefined;
  const archived = false;

  console.log('contactId: ',contactId); 
  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.getById(contactId,properties,propertiesWithHistory,associations,archived);
    console.log(JSON.stringify(apiResponse.body, null, 2));
    console.log('apiresponse',apiResponse.properties); 
    res.send(apiResponse.properties.firstname + " found"); 
  } catch (e) {
    
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
    res.send("error found, please see logs on console"); 
  }
      
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
