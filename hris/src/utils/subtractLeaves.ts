import { ILeaves } from "@/providers/leaves/context";

export const subtractLeave = (
    leaves: ILeaves,
    type: keyof Omit<ILeaves, "id" | "employeeId">,
    amount: number
  ): ILeaves => {
    if (!leaves.hasOwnProperty(type)) {
      throw new Error(`Invalid leave type: ${type}`);
    }
   
    return {
      ...leaves,
      [type]: leaves[type] - amount,
    };
  };

  export const addLeave = (
    leaves: ILeaves,
    type: keyof Omit<ILeaves, "id" | "employeeId">,
    amount: number
  ): ILeaves => {
    if (!leaves.hasOwnProperty(type)) {
      throw new Error(`Invalid leave type: ${type}`)
    }

    return {
      ...leaves,
      [type]: leaves[type] + amount,
    }
  }
   