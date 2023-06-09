# HR Leave Application Automation

This project is aimed at automating the HR leave application process using Google Apps Script. It consists of a Google Form that captures the required data and a Google Sheets that stores the data. Upon form submission, an email is sent to the employee's line manager for approval and a confirmation email is sent to the employee.

## Getting Started

### Prerequisites

- A Google account
- A Google Form
- A Google Sheets
- An HTML template for the email body (provided in this project)

### Installation

1. Open your Google Sheets and navigate to "Tools" > "Script editor"
2. Replace the default code in code.js with the code provided in this project.
3. Replace the content of emailBody.html with the HTML template provided in this project.
4. Save your changes.
5. Navigate to "Edit" > "Current project's triggers" to create a trigger.
6. Click the "+ Add Trigger" button.
7. Select the following options:
   - Choose which function to run: mySubmit
   - Choose which deployment should run: Head
   - Select event type: From spreadsheet > On form submit
   - Failure notification settings: Choose your desired notification settings.
8. Save your changes.

## Usage

When an employee submits a leave application through the Google Form, the script is triggered and performs the following actions:

- Retrieves the submitted data from the Google Sheet.
- Generates an email to the employee's line manager for approval using the HTML template provided in this project.
- Sends a confirmation email to the employee.
- The email subject and body are customized based on the submitted data.

## Customization

You can customize the email subject and body by modifying the `sendEmail()` function in `code.js`.

You can also customize the HTML template for the email body by modifying the `emailBody.html` file.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.
