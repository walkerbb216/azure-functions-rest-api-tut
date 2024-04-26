const { app } = require('@azure/functions');
const { deleteEntity } = require("../services/table-services");

app.http('DeletePost', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    route: 'DeletePost/{blog}/{id}',
    handler: async function (context, req) {
        try {
          const { blog, id } = context.bindingData;
      
          const entity = {
            PartitionKey: { _: blog },
            RowKey: { _: id.toString() },
          };
      
          await deleteEntity("Posts", entity);
        } catch (error) {
          context.res = {
            status: 500,
            body: `Request error. ${error.message}`,
          };
        }
    }
});
