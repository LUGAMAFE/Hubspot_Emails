const express = require('express')
const app = express()
const port = 5000



app.get('/', async(req, res) => {
    const hubspot = require('@hubspot/api-client');

const hubspotClient = new hubspot.Client({"accessToken":"pat-na1-2744e970-8a88-4306-aaba-d43b8033d66f"});

const properties = {
  "company": "Biglytics2",
  "email": "bcooper2@biglytics.net",
  "firstname": "Bryan",
  "lastname": "Cooper",
  "phone": "(877) 929-0687",
  "website": "biglytics.net",
  "rol":"supercustomer"
};
const SimplePublicObjectInput = { properties };

try {
  const apiResponse = await hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput);
  console.log(JSON.stringify(apiResponse.body, null, 2));
} catch (e) {
  e.message === 'HTTP request failed'
    ? console.error(JSON.stringify(e.response, null, 2))
    : console.error(e)
}
    res.send('Hello World!')
    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})