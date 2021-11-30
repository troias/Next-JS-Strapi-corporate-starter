'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
 const {  sanitizeEntity } = require('strapi-utils');

module.exports = {

    async create(ctx) {
       
    
    
        const entity = await strapi.services['lead-form-submissions'].create(ctx.request.body);
        console.log("user", user);

        await strapi.plugins['email'].services.email.send({
            to: 'hunter007nz@gmail.com',
            from: "StrapiTest@localhost",
            subject: 'New Lead Form Submission',
            text: `${entity.user.username} has submitted a new lead form. Email is submitted in form is ${entity.email} and number is ${entity.number} and message is ${entity.message}`,    
           
        });
        return sanitizeEntity(entity, { model: strapi.models['lead-form-submissions'] });
      
        
      },

};


