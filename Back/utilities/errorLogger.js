const fs = require('fs');
const path = require('path');

class ErrorLogger {
  constructor() {
    this.logFile = path.join(__dirname, '..', 'logs', 'error.log');
  }

  log(error) {
    const message = `[${new Date().toISOString()}] ${error.stack}\n`;
    fs.appendFileSync(this.logFile, message);
  }
}

module.exports = new ErrorLogger();