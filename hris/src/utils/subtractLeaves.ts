import { ILeaves } from "@/providers/employee/context";

export const subtractLeave = (
    leaves: ILeaves,
    type: keyof Omit<ILeaves, "id">,
    amount: number
  ): ILeaves => {
    if (!leaves.hasOwnProperty(type)) {
      throw new Error(`Invalid leave type: ${type}`);
    }
   
    return {
      ...leaves,
      [type]: Math.max(0, leaves[type] - amount),
    };
  };
   