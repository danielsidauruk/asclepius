const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
  const db = new Firestore({
    projectId: process.env.PROJECT_ID,
    databaseId: process.env.DATABASE_ID,
  });
 
  const predictCollection = db.collection('predictions');
  return predictCollection.doc(id).set(data);
}

async function getData() {
  const db = new Firestore({
    projectId: process.env.PROJECT_ID,
    databaseId: process.env.DATABASE_ID,
  });
  
  const predictCollection = db.collection('predictions');
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
