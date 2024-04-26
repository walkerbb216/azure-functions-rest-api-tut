const { app } = require('@azure/functions');
const azure = require("azure-storage");
const { queryEntities } = require("../services/table-services");

app.http('GetAllPosts', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'GetAllPosts/{blog}',
    handler: async (req, context) => {
        try {
            const blog = context.bindingData.blog;
        
            if (!blog) {
              context.res = {
                status: 400,
                body: "Blog ID is required",
              };
            }
        
            var query = new azure.TableQuery().where("PartitionKey eq ?", blog);
        
            const result = await queryEntities("Posts", query);
        
            context.res = {
              body: result,
            };

            return result;

          } catch (error) {
            context.res = {
              status: 500,
              body: error.message,
            };
          }
    }
    
});
  