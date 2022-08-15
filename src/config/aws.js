import { CognitoUserPool } from "amazon-cognito-identity-js";
const userPoolData = {
  UserPoolId: "",
  ClientId: "",
};
export default new CognitoUserPool(userPoolData);
