import {Address} from "./Address";

export interface Factory {
  factoryId: number;
  factoryName: string;
  address: Address;
}
  