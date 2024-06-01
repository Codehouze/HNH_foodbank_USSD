# USSD Foodbank Application

## Overview
This application offers a USSD-based solution for managing food bank services. Users can request food, check availability, and receive updates on their requests via a simple, accessible interface using their mobile phones. The system is designed to be user-friendly, ensuring that even those without internet access can benefit from the food bank services.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Request Food**: Users can request food items through a series of menu options.
- **Check Availability**: Users can check the availability of different food items.
- **Request Status**: Users can check the status of their food requests.
- **Admin Interface**: Admins can manage inventory and view requests.

## Prerequisites
- Node.js (version 14 or higher)
- AWS account (for DynamoDB, S3, and Lambda)
- Twilio account (for USSD service)
- AWS CLI configured

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ussd-foodbank.git
cd ussd-foodbank
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup AWS Services
Ensure you have the following AWS services set up:
- **DynamoDB**: For storing user requests and food inventory.
- **S3**: For storing static assets.
- **Lambda**: For serverless functions.
- **API Gateway**: For handling API requests.

### 4. Configure Environment Variables
Create a `.env` file in the root directory and add your configuration:
```
AWS_REGION=your-aws-region
DYNAMODB_TABLE_REQUESTS=requests-table-name
DYNAMODB_TABLE_INVENTORY=inventory-table-name
S3_BUCKET_NAME=your-s3-bucket-name
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number
```

## Configuration

### DynamoDB Tables
Create two DynamoDB tables:
1. **Requests Table**: To store user requests.
   - Primary Key: `requestId` (String)
2. **Inventory Table**: To store food inventory.
   - Primary Key: `itemId` (String)

### Twilio Setup
- Sign up for an African's Talking [https://africastalking.com/] account and get a phone number.
- Configure the  phone number to use the USSD application by setting up a webhook to your API Gateway endpoint.

## Usage

### Starting the Application
Deploy the application using AWS CLI or the AWS Management Console. Ensure all Lambda functions are correctly connected to API Gateway endpoints.

### USSD Flow
1. **Dial the USSD Code**: Users dial the provided USSD code on their mobile phones.
2. **Main Menu**: Users navigate through the main menu to donate food,request food, check availability, or check the status of their requests.
3. **Request Handling**: The application processes the requests, updates DynamoDB, and sends appropriate responses back to the user.

### Example USSD Flow
1. User dials `*123#`.
2. Main Menu:
   ```
   1. Request Food
   2. Check Availability
   3. Request Status
   ```
3. If `1` (Request Food) is selected:
   ```
   1. Rice
   2. Beans
   3. Maize
   ```
4. User selects `1` (Rice):
   ```
   Enter quantity:
   ```
5. User enters quantity and submits.

## Contributing
We welcome contributions! Please read our [CONTRIBUTING](CONTRIBUTING.md) guide for more information on how to contribute to this project.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using the USSD Foodbank Application. We hope this application helps in efficiently managing food bank services and reaching those in need. If you have any questions or need further assistance, please feel free to open an issue or contact the project maintainers.