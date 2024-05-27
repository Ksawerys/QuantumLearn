const AnomalyDetector = require('node-anomaly-detector');

class MyAnomalyDetector {
  constructor() {
    this.model = new AnomalyDetector();
  }

  predict(data) {
    return this.model.detect(data);
  }
}

module.exports = new MyAnomalyDetector();