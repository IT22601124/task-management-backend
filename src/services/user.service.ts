import { User } from "../database";

export const getAllUsers = async () => {
  return User.findAll({
    order: [["name", "ASC"]]
  });
};
