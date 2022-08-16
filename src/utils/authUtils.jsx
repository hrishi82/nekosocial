
  import { faker } from "@faker-js/faker";
  
  export const validatePassword = (input) => {
    return /^(?=.{8,20}$)\D*\d/.test(input);
  };
  


export const createRandomUser = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
};
