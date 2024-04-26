const { app } = require('@azure/functions');
const { insertEntity } = require("../services/table-services");

app.http('CreatePost', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async function (context, req) {
        try {
          if (!req.body) {
            context.res = {
              status: 400,
              body: "Request body required",
            };
            return;
          }
      
          const { blog, title, content } = req.body;
      
          if (!blog || !title || !content) {
            context.res = {
              status: 400,
              body: "Please pass blog, title and content in the request body",
            };
            return;
          }
      
          const entity = {
            PartitionKey: { _: blog },
            RowKey: { _: new Date().getTime().toString() },
            title: { _: title },
            content: { _: content },
          };
      
          const result = await insertEntity("posts", entity);
      
          context.res = {
            status: 200,
            body: result,
          };
        } catch (error) {
          context.res = {
            status: 500,
            body: `Request error. ${error.message}`,
          };
        }
}
});
