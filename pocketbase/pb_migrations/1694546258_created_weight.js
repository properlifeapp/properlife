/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "p1jxg61fnjiplt8",
    "created": "2023-09-12 19:17:38.718Z",
    "updated": "2023-09-12 19:17:38.718Z",
    "name": "weight",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ffhalqlo",
        "name": "weight",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("p1jxg61fnjiplt8");

  return dao.deleteCollection(collection);
})
