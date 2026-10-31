/**
 * activity-log controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::activity-log.activity-log', ({strapi}) => ({
    async create(ctx) {
       const user = ctx.state.user

       if(!user) return ctx.unauthorized("Login required")

        // get data from request body
       const body = ctx.request.body?.data
    //    save userid
    if(!body) return ctx.badRequest("Missing data")

       body.users_permissions_user = user.id

    //    add the userId when activitylog is created
       const entry = await strapi.entityService.create(
          'api::activity-log.activity-log', {
            data:body,
            populate : ["users_permissions_user"]
          }
       )
       return entry
    },

    async find(ctx) {
       const user = ctx.state.user
          if(!user) return ctx.unauthorized("Login required")


       const result  = await strapi.entityService.findMany(
          'api::activity-log.activity-log', {
            filters : {users_permissions_user : user.id},
            populate : ["users_permissions_user"]
          }
       )
       return result
    },

    async findOne(ctx) {
       const user = ctx.state.user
       const {id} = ctx.params

       const result  = await strapi.entityService.findMany(
          'api::activity-log.activity-log', {
            filters : {id, users_permissions_user : user.id},
            populate : ["users_permissions_user"]
          }
       )

       if(!result) return ctx.notFound("Not found or not yours")
       return result[0]
    },

//     async delete(ctx) {
//    const user = ctx.state.user
//    if(!user) return ctx.unauthorized("Login required")

//    const {id} = ctx.params

//    const found = await strapi.entityService.findMany(
//       'api::activity-log.activity-log', {
//         filters : {id, users_permissions_user : user.id}
//       }
//    )

//    if(!found.length) return ctx.notFound("Not found or not yours")

//    return await strapi.entityService.delete(
//       'api::activity-log.activity-log', found[0].id
//    )
// },

// async update(ctx) {
//    const user = ctx.state.user
//    if(!user) return ctx.unauthorized("Login required")

//    const {id} = ctx.params

//    const found = await strapi.entityService.findMany(
//       'api::activity-log.activity-log', {
//         filters : {id, users_permissions_user : user.id}
//       }
//    )

//    if(!found.length) return ctx.notFound("Not found or not yours")

//    const body = ctx.request.body?.data
//    if(!body) return ctx.badRequest("Missing data")

//    delete body.users_permissions_user   // owner can't be changed

//    return await strapi.entityService.update(
//       'api::activity-log.activity-log', found[0].id, { data: body }
//    )
// },


}));
