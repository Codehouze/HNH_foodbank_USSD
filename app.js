const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const {
  checkRequestStatus,
  generateReferenceNumber,
} = require("./utils/helperFn");
const Ussd = require("./models/ussdModel");

const connectDb = require("./config/db");

const app = express();
const PORT = 5000;

connectDb;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Success Message");
});

// USSD IMPLEMENTATION
app.post("/", (req, res) => {
  const { phoneNumber, serviceCode, text, sessionId, networkCode } = req.body;

  let response;
  let level = text.split("*");
  let referenceNumber = "";

  if (text == "") {
    // This is the first request. Note how we start the response with CON
    response = `CON Welcome to the Haba-Na-Haba Food Bank portal.\n 
        1. Donor Food 
        2. Request Food
        3. Check Status
        4. Contact Support`;
  } else if (level[0] === "1") {
    // Business logic for donor food
    if (!level[1]) {
      response = `CON Enter your District Code:`;
    } else if (!level[2]) {
      response = `CON Enter the type of food:`;
    } else {
      referenceNumber = generateReferenceNumber();
      response = `END Confirmation: Thank you! Your donation will be processed.\nReference Number: ${referenceNumber}`;
    }
  } else if (level[0] === "2") {
    // Business logic for requesting food
    if (!level[1]) {
      response = `CON Enter your District Code:`;
    } else if (!level[2]) {
      response = `CON Enter the type of food:`;
    } else if (!level[3]) {
      response = `CON Enter the quantity:`;
    } else {
      referenceNumber = generateReferenceNumber();
      response = `END Confirmation: Your request has been submitted. You will be notified when the food is available.\nReference Number: ${referenceNumber}`;
    }
  } else if (level[0] === "3") {
    // Business logic for checking status
    if (!level[1]) {
      response = `CON Enter your Reference Number:`;
    } else {
      const status = checkRequestStatus(level[1]); // Assuming checkRequestStatus is a function that returns 'processing', 'ready', or other statuses
      if (status === "processing") {
        response = `END Confirmation: Your request is being processed.`;
      } else if (status === "ready") {
        response = `END Confirmation: Your request is ready for collection.`;
      } else {
        response = `CON Error: Invalid reference number or request not found.`;
      }
    }
  } else if (text == "4") {
    response = `END Please visit [your district] or contact us at [+254 xxx xxxx] for details on how to receive food. `;
  }

  // Send the response back to the API
  res.set("Content-Type: text/plain");
  // SEND THIS TO THE debugger.
  res.send(response, phoneNumber, serviceCode, sessionId, networkCode);

  if (referenceNumber) {
    // persist to db
    try {
      const responseData = {
        phoneNumber,
        serviceCode,
        sessionId,
        networkCode,
        referenceNumber: referenceNumber,
      };
      const ussdResponse = new Ussd(responseData);

      ussdResponse
        .save()
        .then((saveResponse) => {
          console.log("Response saved to database:", saveResponse);
        })
        .catch((error) => {
          console.error("Error saving response to database:", error);
          // Handle the error appropriately
        });
    } catch (error) {
      console.error("Error saving response to database:", error);
    }
  }
});


app.get("/", async (req, res) => {
    const referenceNumber = req.params.referenceNumber;
    console.log( referenceNumber)
  
    try {
      // Query the database to find the request with the given reference number
      const request = await Ussd.findOne({ referenceNumber });
  console.log("==================>>>>>>>>>>>>>>",request);
      if (!request) {
        // If no request found with the given reference number, send an error response
        return res.status(404).json({ error: "Request not found" });
      }
  
      // Extract the status from the request document
      const status = request.status;
  
      // Send the status in the response
      res.json({ status });
    } catch (error) {
      console.error("Error fetching request status:", error);
      // Send an error response if an error occurs during database query
      res.status(500).json({ error: "Internal server error" });
    }
  });


app.listen(PORT, () => {
  console.log(`app is running on port +  ${PORT}`);
});
