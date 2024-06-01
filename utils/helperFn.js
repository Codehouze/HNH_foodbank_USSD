 // Function to generate a unique reference number
 const crypto = require('crypto');
 const dotenv = require('dotenv')
 const axios = require("axios")

 const{BASE_URL} = process.env;


 
 const generateReferenceNumber = () => {
    const timestamp = Date.now().toString(); // Current timestamp in milliseconds
    const randomComponent = crypto.randomBytes(4).toString('hex'); // Generate a random 4-byte hex string
    return timestamp + randomComponent; // Combine the timestamp and random component
}
const checkRequestStatus = (referenceNumber) =>{
    // Replace with the actual URL of your backend API endpoint
    const apiUrl = `${BASE_URL}get-request-status?referenceNumber=${referenceNumber}`;
  
    // Make an asynchronous HTTP GET request to the API
    return axios.get(apiUrl)
      .then(response => {
        // Check for successful response
        if (response.status === 200) {
          // Extract the status from the API response data (replace 'status' with the actual property name)
          const status = response.data.status;
          return status; // Return the retrieved status (processing, ready, etc.)
        } else {
          throw new Error('Failed to retrieve request status'); // Handle API errors
        }
      })
      .catch(error => {
        console.error('Error fetching request status:', error);
        return 'error'; // Return a generic error message for USSD display
      });
  }

  
  module.exports={
    generateReferenceNumber,
    checkRequestStatus
}