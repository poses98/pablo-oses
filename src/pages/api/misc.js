import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  console.log('Inititating');
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DB);
  console.log(db);
  const data = await db.collection('misc').find().toArray();

  client.close();

  res.status(200).json({ data });
}
