var azure = require('azure-storage');
var tableSvc = azure.createTableService('mediumtutorial', process.env.AZURE_STORAGE_ACCESS_KEY);

const insertEntity = (tableName, entity) => {
    return new Promise((resolve, reject) => {
    tableSvc.insertEntity(
     tableName,
     entity,
    { echoContent: true, payloadFormat: "application/json;odata=nometadata" },
     function (error, result, response) {
      if (error) {
       reject(error);
      }
      
      resolve(result);
     });
    });
   };
   exports.insertEntity = insertEntity;

   
const updateEntity = (table, entity) => {
    return new Promise((resolve, reject) => {
      tableSvc.mergeEntity(table, entity, function (error, result, response) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };
  
  exports.updateEntity = updateEntity;

  
const deleteEntity = (table, entity) => {
    return new Promise((resolve, reject) => {
      tableSvc.deleteEntity(table, entity, function (error, result, response) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };
  
  exports.deleteEntity = deleteEntity;

  const queryEntities = (tableName, query) => {
    return new Promise((resolve, reject) => {
      tableSvc.queryEntities(
        tableName,
        query,
        null,
        { payloadFormat: "application/json;odata=nometadata" },
        function (error, result, response) {
          if (error) {
            reject(error);
          }
  
          resolve(response.body);
        }
      );
    });
  };
  exports.queryEntities = queryEntities;