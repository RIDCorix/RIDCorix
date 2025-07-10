function doPost(e) {
  try {
    // Parse the request data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Prepare data for the spreadsheet
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.subject || '',
      data.message || '',
      data.source || 'Unknown'
    ];
    
    // Add data to spreadsheet
    sheet.appendRow(rowData);
    
    // Send email notification
    sendNotificationEmail(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendNotificationEmail(data) {
  try {
    // Your email address for notifications
    const yourEmail = 'ridcorix@gmail.com'; // Change this to your email
    
    // Email subject
    const subject = `New Contact Form Submission: ${data.subject}`;
    
    // Email body
    const body = `
You've received a new contact form submission from your portfolio website:

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

Submitted on: ${data.timestamp}
Source: ${data.source}

---
This message was automatically generated from your portfolio contact form.
    `;
    
    // Send email
    MailApp.sendEmail({
      to: yourEmail,
      subject: subject,
      body: body
    });
    
    console.log('Notification email sent successfully');
    
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
}

// Function to test the script
function testScript() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message',
        timestamp: new Date().toISOString(),
        source: 'Test'
      })
    }
  };
  
  const result = doPost(testData);
  console.log(result.getContent());
}
