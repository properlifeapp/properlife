/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "kedid6iwoznetb9",
    "created": "2023-09-12 19:03:24.462Z",
    "updated": "2023-09-12 19:03:24.462Z",
    "name": "exercise",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ge4jwm88",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "nzevqmhb",
        "name": "max_sets",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "namlwjgh",
        "name": "workout_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "q49wv3kp9otq2qw",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
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
  const collection = dao.findCollectionByNameOrId("kedid6iwoznetb9");

  return dao.deleteCollection(collection);
})
