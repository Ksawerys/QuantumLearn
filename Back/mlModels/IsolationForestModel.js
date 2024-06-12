const { IsolationTree, averageUnsuccessfulPathLength } = require('./IsolationTreeModel');

class IsolationForest {
  constructor(numTrees, sampleSize) {
    this.numTrees = numTrees;
    this.sampleSize = sampleSize;
    this.trees = [];
  }

  fit(data) {
    const heightLimit = Math.ceil(Math.log2(this.sampleSize));
    for (let i = 0; i < this.numTrees; i++) {
      const sample = this.getRandomSample(data, this.sampleSize);
      const tree = new IsolationTree(heightLimit);
      tree.fit(sample);
      this.trees.push(tree);
    }
  }

  getRandomSample(data, sampleSize) {
    const sample = [];
    for (let i = 0; i < sampleSize; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      sample.push(data[randomIndex]);
    }
    return sample;
  }

  anomalyScore(point) {
    const pathLengths = this.trees.map(tree => tree.pathLength(point));
    const avgPathLength = pathLengths.reduce((a, b) => a + b, 0) / pathLengths.length;
    return Math.pow(2, -avgPathLength / averageUnsuccessfulPathLength(this.sampleSize));
  }

  predict(data) {
    return data.map(point => this.anomalyScore(point));
  }
}

module.exports = IsolationForest;