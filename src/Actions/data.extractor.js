const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { MongoClient } = require("mongodb");
const config = require("../config.json");
const client = new MongoClient(config.DB.URL);
module.exports = async (name, maper, filter) => {
  console.group(`Fetch.${name}`);
  console.time(name);
  try {
    let response = await fetch(
      `https://${config.Minner.World}.${config.Minner.Domain}/map/${name}.txt`
    );
    console.debug(`Api Response: ${response.status} - ${response.statusText}`);

    let text = await response.text();
    let rows = text.split("\n").filter((x) => x != "");
    console.debug(`Reading \t [${rows.length}] \t items`);

    let collection = rows.map(maper).filter(filter);
    console.debug(`Parsed \t [${collection.length}] \t items`);

    if (collection.length > 0) {
      await client.connect();
      let result = await client
        .db(config.DB.Name)
        .collection(name)
        .insertMany(collection);
      console.debug(`Inserted \t [${result.insertedCount}] \t items`);
    }
  } catch (Exception) {
    console.error(Exception);
  } finally {
    await client.close();
    console.timeEnd(name);
    console.groupEnd();
  }
};
