const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
  const db = new Firestore();
 
  const predictCollection = db.collection('prediction');
  return predictCollection.doc(id).set(data);
}

async function getData() {
  const db = new Firestore();
  
  const predictCollection = db.collection('prediction');
  const snapshot = await predictCollection.get();
  const result = [];

  snapshot.forEach((doc) => {
    result.push({
      id: doc.id,
      history: {
        result: doc.data().result,
        createdAt: doc.data().createdAt,
        suggestion: doc.data().suggestion,
        id: doc.data().id,
      },
    });
  });

  return result;
}
 
module.exports = { storeData, getData };
