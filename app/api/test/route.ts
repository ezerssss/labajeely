import db from "@/app/firebase/db";

const testCollection = db.collection("test");

export async function GET(request: Request) {
  const testDocs = await testCollection.get();
  const testData: { data: string }[] = [];
  testDocs.forEach((doc) => testData.push(doc.data() as { data: string }));
  console.log("test");

  return Response.json({ testData });
}
