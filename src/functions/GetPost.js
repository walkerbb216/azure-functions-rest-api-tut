const { app } = require('@azure/functions');
const azure = require("azure-storage");
const { queryEntities } = require("../services/table-services");

app.http('GetPost', {

    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'GetPost/{blog}/{id}',
    handler: async function (context, req) {
        try {
          const { blog, id } = context.bindingData;
      
          var query = new azure.TableQuery()
            .where("PartitionKey eq ?", blog)
            .and("RowKey eq ?", id.toString());
      
          const result = await queryEntities("Posts", query);
      
          context.res = {
            body: result,
          };
        } catch (error) {
          context.res = {
            status: 500,
            body: error.message,
          };
        }
      }
});
