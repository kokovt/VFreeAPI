import getClient from "../mongodb";


export default async function getTalent(talentName: string) {
  const CLIENT = getClient();
  if (!CLIENT) return "Client not initialized!";
  const COLLECTION = CLIENT.db("VFreeData").collection("Talents");
  return await COLLECTION.findOne({
    "talent.streamer_name": talentName
  });
}
