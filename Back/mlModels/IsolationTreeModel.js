class IsolationTree {
  constructor(heightLimit) {
    this.heightLimit = heightLimit;
    this.root = null;
  }

  fit(data, currentHeight = 0) {
    if (currentHeight >= this.heightLimit || data.length <= 1) {
      this.root = { size: data.length };
      return;
    }

    const feature = Math.floor(Math.random() * data[0].length);
    const min = Math.min(...data.map(d => d[feature]));
    const max = Math.max(...data.map(d => d[feature]));
    const splitValue = Math.random() * (max - min) + min;

    const left = data.filter(d => d[feature] < splitValue);
    const right = data.filter(d => d[feature] >= splitValue);

    this.root = {
      feature,
      splitValue,
      left: new IsolationTree(this.heightLimit),
      right: new IsolationTree(this.heightLimit)
    };

    this.root.left.fit(left, currentHeight + 1);
    this.root.right.fit(right, currentHeight + 1);
  }

  pathLength(point, currentHeight = 0) {
    if (this.root.size !== undefined) {
      return currentHeight + c(this.root.size);
    }

    const { feature, splitValue, left, right } = this.root;
    if (point[feature] < splitValue) {
      return left.pathLength(point, currentHeight + 1);
    } else {
      return right.pathLength(point, currentHeight + 1);
    }
  }
}

function c(size) {
  if (size <= 1) return 0;
  return 2 * (Math.log(size - 1) + 0.5772156649) - (2 * (size - 1) / size);
}
