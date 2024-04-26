const { app } = require('@azure/functions');
const { updateEntity } = require("../services/table-services");

app.http('UpdatePost', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    route: 'UpdatePost/{blog}/{id}',
    handler: async function (context, req) {
        try {
          if (!req.body) {
            context.res = {
              status: 400,
              body: "Request body required",
            };
            return;
          }
      
          const { title, content } = req.body;
      
          if (!title && !content) {
            context.res = {
              status: 400,
              body: "Please pass a property to update!",
            };
            return;
          }
      
          const { blog, id } = context.bindingData;
      
          const entity = {
            PartitionKey: { _: blog },
            RowKey: { _: id.toString() },
          };
      
          if (title) entity.title = { _: title };
      
          if (content) entity.content = { _: content };
      
          await updateEntity("posts", entity);
      
        } catch (error) {
          context.res = {
            status: 500,
            body: `Request error. ${error.message}`,
          };
        }
      }
});

