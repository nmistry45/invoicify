import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { createContext, useState } from "react";
import UserPoolData from "../../config/aws";
import { useHistory } from "react-router-dom";

const AccountContext = createContext();

const Account = (props) => {
  const history = useHistory();
  const [userID, setUserId] = useState({});
  const getSession = async () => {
    await new Promise((resolve, reject) => {
      const user = UserPoolData.getCurrentUser();
      // console.log("user.......", user);
      setUserId(user);
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: UserPoolData,
      });

      const authenticateDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authenticateDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (data) => {
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = UserPoolData.getCurrentUser();
    user.signOut();
  };

  return (
    <AccountContext.Provider
      value={{ authenticate, getSession, logout, userID: userID }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
