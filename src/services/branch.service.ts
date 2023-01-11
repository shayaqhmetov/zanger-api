import { IBranch } from "../models/branches/branches.types";
import { BranchModel } from "../models/branches/branches.model";

class BranchService {
  private static instance: BranchService;

  private constructor() { }

  public static getInstance(): BranchService {
    if (!BranchService.instance) {
      BranchService.instance = new BranchService();
    }

    return BranchService.instance;
  }

  public async getBranch(name: string) {
    return await BranchModel.findOne({ name });
  }

  public async createBranch(params: IBranch) {
    return await BranchModel.create(params);
  }

}

export default BranchService.getInstance();