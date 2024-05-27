const transformInputData = (inputData) => {
    // Transforma los datos de entrada en el formato que tu modelo espera
    // Esto dependerá de cómo hayas entrenado tu modelo
    // Este es solo un ejemplo y deberás adaptarlo a tus necesidades
    const transformedData = {
      feature1: inputData.feature1 / 100,
      feature2: inputData.feature2 / 100,
      feature3: inputData.feature3 / 100,
    };
  
    return transformedData;
  };
  
  module.exports = { transformInputData };