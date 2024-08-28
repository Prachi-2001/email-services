# Email Sending Service

This repository contains a simple email sending service built with a Node.js backend and a React frontend. The service includes features such as retry logic with exponential backoff, fallback mechanisms between email providers, idempotency, rate limiting, and status tracking. The frontend provides an interface for users to send emails.

## Project Structure

- `backend/`: Contains the Node.js backend implementation.
- `frontend/`: Contains the React frontend implementation.

## Getting Started

### Backend (Node.js)

#### Installation

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

#### API Endpoints

- **POST /api/email/send**

  Sends an email with the provided details.

  **Request Body:**

  ```json
  {
    "to": "recipient@example.com",
    "subject": "Email Subject",
    "body": "Email body content."
  }
  ```
  **Response**
  ```json
  {
  "message": "Email sent successfully."
  }
  ```

  ## Features

- **Retry Mechanism**: Implements retry logic with exponential backoff to handle transient failures and increase the chances of successful email delivery.
- **Fallback Mechanism**: Automatically switches to an alternative email provider if the primary provider fails after a specified number of attempts.
- **Idempotency**: Ensures that duplicate emails are not sent by tracking email attempts.
- **Rate Limiting**: Limits the number of emails sent within a specific time frame to avoid overwhelming the providers and to comply with rate-limiting rules.
- **Status Tracking**: Logs and tracks the status of each email sending attempt for debugging and monitoring purposes.

## Test Cases for Key Features

### 1. Retry Mechanism

- **Description:** Verifies that the system retries sending an email with exponential backoff upon failure.
- **Test Case:**
  1. Simulate a failure in sending an email.
  2. Verify that the system retries sending the email according to the exponential backoff strategy.
  3. Ensure that the maximum number of retry attempts is respected.

### 2. Fallback Mechanism

- **Description:** Verifies that the system switches to the secondary email provider when the primary provider fails.
- **Test Case:**
  1. Simulate a failure in the primary email provider.
  2. Send an email and verify that the request is automatically routed to the secondary email provider.
  3. Ensure that the email is sent successfully via the secondary provider.

### 3. Idempotency

- **Description:** Ensures that multiple requests with the same email data do not result in duplicate emails being sent.
- **Test Case:**
  1. Send an email request with a unique `idempotency-key` header.
  2. Verify that if the same request is sent multiple times with the same `idempotency-key`, only one email is sent.
  3. Check that the system acknowledges duplicate requests without sending additional emails.

### 4. Rate Limiting

- **Description:** Verifies that the system enforces rate limiting to prevent abuse.
- **Test Case:**
  1. Send multiple email requests in quick succession.
  2. Verify that the system limits the number of requests within a specified time frame.
  3. Ensure that requests exceeding the rate limit return an appropriate error message.

### 5. Status Tracking

- **Description:** Verifies that the system provides status updates on email sending attempts.
- **Test Case:**
  1. Send an email and request the status of the email sending process.
  2. Verify that the status updates reflect the current state (e.g., "Pending", "Sent", "Failed").
  3. Ensure that the status tracking information is accurate and updated as the process progresses.

### 6. Circuit Breaker Pattern (Bonus)

- **Description:** Verifies that the circuit breaker pattern is applied to handle failures gracefully.
- **Test Case:**
  1. Simulate repeated failures in sending emails.
  2. Ensure that the circuit breaker opens to prevent further attempts.
  3. Verify that after a cool-down period, the system attempts to send emails again and reverts to normal operation if successful.

### 7. Simple Logging (Bonus)

- **Description:** Verifies that simple logging is implemented for email sending attempts.
- **Test Case:**
  1. Send an email and check the log output.
  2. Ensure that relevant details such as request payload, response status, and errors are logged.
  3. Verify that logs provide sufficient information for debugging and tracking.

### 8. Basic Queue System (Bonus)

- **Description:** Verifies that the system handles email requests using a basic queue mechanism.
- **Test Case:**
  1. Send multiple email requests to the system.
  2. Ensure that the emails are processed in the order they are received (FIFO).
  3. Verify that the queue system handles requests efficiently and processes them without loss.


  
  

