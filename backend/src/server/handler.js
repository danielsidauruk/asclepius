const predictClassification = require('../services/inferenceService');
const { storeData, getData } = require('../services/storeData');
const crypto = require('crypto');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;
 
  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
 
  const data = {
    "id": id,
    "result": label,
    "suggestion": suggestion,
    "createdAt": createdAt
  }

  await storeData(id, data);
 
  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data,
  });
  response.code(201);
  return response;
}
 
async function getHistoriesHandler(request, h) {
  const result = await getData();
  return h.response({
    status: "success",
    data: result,
  });
}

module.exports = { postPredictHandler, getHistoriesHandler };
