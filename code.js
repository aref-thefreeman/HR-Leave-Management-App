const mailHeaders = [
    'Employee Name',
    'Employee email address',
    'Department',
    'Email Address of Line Manager',
    'Type of Leave',
    'Start Date of Leave',
    'End Date of Leave',
    'Total Leave Days',
    'Justification/Reason for leave'
  ]
  
  function getEmailHtml(data) {
    var htmlTemplate = HtmlService.createTemplateFromFile("emailBody.html");
    htmlTemplate.data = data
    var htmlBody = htmlTemplate.evaluate().getContent();
    return htmlBody;
  }
  
  function sendEmail(data, employeeEmail, lineManagerEmail, employeeName, typeOfLeave, numberOfLeaves) {
    var htmlBody = getEmailHtml(data);
  
    // Send email to line manager
   MailApp.sendEmail({
      to: lineManagerEmail,
      cc: `aref@staffasia.org`,
      subject: `[Leave] ${employeeName} - ${typeOfLeave} - ${numberOfLeaves} day(s)`,
      htmlBody: htmlBody,
      name: 'HR Automation',
      noReply: true
    });
  
  
    // Send email to employee here
    MailApp.sendEmail({
      to: employeeEmail,
      subject: `Leave Application Submitted - ${typeOfLeave} - ${numberOfLeaves} day(s)`,
      htmlBody: `Dear ${employeeName},<br><br>Your leave application has been submitted successfully. You will be notified by your line manager once the leave is approved.This email is as automated as a self-driving car, so please refrain from replying and confusing the machines <br><br>Thank you.<br>HR Automation`,
      name: 'HR Automation',
      noReply: true
    });
  
    Logger.log(`Mail has been sent to ${lineManagerEmail} and ${employeeEmail}!`);
  }
  
  
  
  
  
  
  function mySubmit(e) {
      const result = JSON.stringify(e);
      const JSONresult = JSON.parse(result);
  
      const mailDataSorted = []
  
      mailHeaders.forEach((header) => {
        mailDataSorted.push({
            headerName: header,
            value: JSONresult['namedValues'][header][0]
          })
      })
  
      const employeeEmail = JSONresult['namedValues']['Employee email address'][0]
      const lineManagerEmail = JSONresult['namedValues']['Email Address of Line Manager'][0]
      const employeeName = JSONresult['namedValues']['Employee Name'][0]
      const typeOfLeave = JSONresult['namedValues']['Type of Leave'][0]
      const numberOfLeaves = JSONresult['namedValues']['Total Leave Days'][0]
      const department = JSONresult['namedValues']['Department'][0]
  
      Logger.log(mailDataSorted);
  
      sendEmail(mailDataSorted, employeeEmail, lineManagerEmail, employeeName, typeOfLeave, numberOfLeaves, department)
  
  }
  
  function createTrigger() {
      var sheet = SpreadsheetApp.openById(
          '1bY-K9V_FkAgAo5kCU-d0njfhAkla4nyaQGxFP7PnRlY'
      );
      ScriptApp.newTrigger('mySubmit')
          .forSpreadsheet(sheet)
          .onFormSubmit()
          .create();
  }
  