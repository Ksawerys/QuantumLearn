const transformInputData = (inputData) => {

    const transformedData = {
      feature1: inputData.feature1 / 100,
      feature2: inputData.feature2 / 100,
      feature3: inputData.feature3 / 100,
    };
  
    return transformedData;
  };
  
  module.exports = { transformInputData };