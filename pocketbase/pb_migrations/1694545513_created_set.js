/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "vxk2nlu1f9oann8",
    "created": "2023-09-12 19:05:13.438Z",
    "updated": "2023-09-12 19:05:13.438Z",
    "name": "set",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "upkrkhlj",
        "name": "weight",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "pc9kpwkl",
        "name": "reps",
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
        "id": "byk3o7vr",
        "name": "max_reps",
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
        "id": "lgf6orfz",
        "name": "exercise_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "kedid6iwoznetb9",
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
  const collection = dao.findCollectionByNameOrId("vxk2nlu1f9oann8");

  return dao.deleteCollection(collection);
})
