import { PublicCheckpoint } from "src/app/feature-modules/tour-execution/model/public_checkpoint.model";
import { PrivateTourExecution } from "./private-tour-execution.model";
import { PrivateTourBlog } from "../../blog/model/private-tour-blog";

export interface PrivateTour{
    id: number;
    touristId: number;
    checkpoints: PublicCheckpoint[];
    name: string; 
    blog?: PrivateTourBlog;
    execution?: PrivateTourExecution;
}