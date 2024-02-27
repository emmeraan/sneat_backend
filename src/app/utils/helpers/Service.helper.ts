import { Validations } from "../validations/index.validation";
import { DatabaseService } from "../../services/database/Database.service";
import { QueueService } from "../../services/queue/Queue.service";

export const ServiceHelper = [
  DatabaseService, QueueService,...Validations
];