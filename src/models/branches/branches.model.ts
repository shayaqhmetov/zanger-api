import { model } from "mongoose";

import { IBranchDocument } from "./branches.types";
import BranchSchema from "./branches.schema";

export const BranchModel = model<IBranchDocument>("branch", BranchSchema);