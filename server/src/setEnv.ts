import {
  connectorSecret as ConnectorSecret,
  getSecretsParams as GetSecretsParams,
} from "@hilma/secrets-handler";
import getSecrets from "@hilma/secrets-handler";

export let privateSecret: {
  mysqlSecret?: ConnectorSecret;
};

const param: GetSecretsParams = {
  connectors: [
    {
      name: "mysqlSecret",
      alias: "DB",
    },
  ],
};

export const setEnv = async () => {
  console.log("setting env");
  privateSecret = (await getSecrets(param))!;
  console.log(privateSecret);
};
