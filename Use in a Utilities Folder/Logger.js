const reporter = require('../node_modules/testcafe-reporter-html-logger-custom')();

const getCurrentDateTime = function (dateSeparator = '/', timeSeparator = ':', dateTimeSeparator = '|--|') {
  const currentdate = new Date();
  return currentdate.getDate() + dateSeparator + (currentdate.getMonth() + 1) + dateSeparator + currentdate.getFullYear() + dateTimeSeparator + currentdate.getHours() + timeSeparator + currentdate.getMinutes() + timeSeparator + currentdate.getSeconds();
};

const log = function (message, isStep) {
  console.log(`${getCurrentDateTime()} --- ${message}`);
  if (console.isReportUsed) reporter[isStep ? 'addStep' : 'addStepInfo'](message);
};

module.exports = class Logger {
  static step(id, stepNum, message) {
    stepNum = typeof stepNum === 'number' ? stepNum : `${stepNum[0]}-${stepNum[stepNum.length - 1]}`;
    log(`${id} ${stepNum}: ${message}`, true);
  }

  static info(message) {
    log(`INFO --- ${message}`, false);
  }

  static preconditions() {
    log('Preconditions', true);
  }

  static cleanUp() {
    log('Clean up', true);
  }

  static warn(message) {
    log(`WARN --- : ${message}`, false);
    if (console.isReportUsed) reporter.setTestStatus(reporter.testStatuses.broken);
  }

};