const MLR = require('ml-regression').MultivariateLinearRegression;

class PredictionModel {
  constructor() {
    this.model = null;
  }

  train(X, y) {
    if (!Array.isArray(X) || !Array.isArray(y)) {
      throw new Error('X and y must be arrays');
    }

    if (X.length === 0 || y.length === 0) {
      throw new Error('X and y must not be empty');
    }

    this.model = new MLR(X, y);
  }

  predict(input) {
    if (!Array.isArray(input)) {
      throw new Error('Input must be an array');
    }

    if (this.model) {
      return this.model.predict(input);
    } else {
      throw new Error('Model not trained yet');
    }
  }
}

module.exports = new PredictionModel();