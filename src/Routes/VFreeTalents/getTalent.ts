import { router } from "../../express";
import getTalent from "../../Mongo/getTalent";

router.get("/VFreeTalents/getTalent", async (req: any, res: any) => {
  if (!req.query["talent"]) return res.send("No talent specified!");
  const TALENT = String(req.query["talent"]);
  const TALENT_DATA: any = await getTalent(TALENT);
  if (!TALENT_DATA) return res.send("Talent isn't registered or doesn't exist!");

  delete TALENT_DATA["_id"];
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(TALENT_DATA);
});

export {
  router
}

