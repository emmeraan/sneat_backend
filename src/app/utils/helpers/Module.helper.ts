import { BullModule } from "@nestjs/bull";
import { SequelizeModule } from "@nestjs/sequelize";
import { Models } from "../../models/index.model";

export const ModuleHelper = [
  SequelizeModule.forFeature(Models),
  BullModule.registerQueue({
    name: process.env.DEFAULT_QUEUE_NAME,
  })
]