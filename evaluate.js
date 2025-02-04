// const http = require('http');
// const fs = require('fs');
// const path = require('path');

// const serverUrl = 'http://localhost:3000';

// // Test if the server is running
// http.get(serverUrl, (res) => {
//   if (res.statusCode === 200) {
//     console.log('Server is running: PASS');
//   } else {
//     console.error('Server is not running: FAIL');
//     process.exit(1);
//   }
// }).on('error', (err) => {
//   console.error('Server is not running: FAIL', err);
//   process.exit(1);
// });

// // Test if the /questions endpoint returns valid data
// http.get(`${serverUrl}/questions`, (res) => {
//   let data = '';
//   res.on('data', (chunk) => {
//     data += chunk;
//   });
//   res.on('end', () => {
//     try {
//       const questions = JSON.parse(data);
//       if (Array.isArray(questions) && questions.length > 0) {
//         console.log('/questions endpoint: PASS');
//       } else {
//         console.error('/questions endpoint: FAIL - No questions found');
//         process.exit(1);
//       }
//     } catch (err) {
//       console.error('/questions endpoint: FAIL - Invalid JSON', err);
//       process.exit(1);
//     }
//   });
// }).on('error', (err) => {
//   console.error('/questions endpoint: FAIL - Server error', err);
//   process.exit(1);
// });

// // Test if the frontend files are served correctly
// const frontendFiles = ['index.html', 'style.css', 'script.js'];
// frontendFiles.forEach((file) => {
//   http.get(`${serverUrl}/${file}`, (res) => {
//     if (res.statusCode === 200) {
//       console.log(`${file} served correctly: PASS`);
//     } else {
//       console.error(`${file} served correctly: FAIL`);
//       process.exit(1);
//     }
//   }).on('error', (err) => {
//     console.error(`${file} served correctly: FAIL`, err);
//     process.exit(1);
//   });
// });

const http = require("http");

function testServer() {
  return new Promise((resolve, reject) => {
    http
      .get("http://localhost:3000", (res) => {
        if (res.statusCode === 200) {
          resolve("Server test passed");
        } else {
          reject("Server test failed");
        }
      })
      .on("error", reject);
  });
}

function testQuestionsEndpoint() {
  return new Promise((resolve, reject) => {
    http
      .get("http://localhost:3000/questions", (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const questions = JSON.parse(data);
            if (Array.isArray(questions) && questions.length > 0) {
              resolve("Questions endpoint test passed");
            } else {
              reject("Questions endpoint test failed");
            }
          } catch (error) {
            reject("Invalid JSON response");
          }
        });
      })
      .on("error", reject);
  });
}

async function runTests() {
  try {
    await testServer();
    await testQuestionsEndpoint();
    console.log("All tests passed!");
    process.exit(0);
  } catch (error) {
    console.error("Tests failed:", error);
    process.exit(1);
  }
}

runTests();
