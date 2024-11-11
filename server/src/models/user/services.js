import User from "./schema.js";

export const getUserById = ({ userId }) =>
  User.findById(userId)
    .lean()
    .catch((error) => {
      throw new Error(error);
    });

export const create = (payload) =>
  User.create(payload).catch((error) => {
    throw new Error(error);
  });

export const getUser = (query) =>
  User.findOne(query)
    .lean()
    .catch((error) => {
      throw new Error(error);
    });
