import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/modules/app/App.module';
import { useContainer } from 'class-validator';
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";
import helmet from 'helmet';
// var admin = require("firebase-admin");
// var serviceAccount = require("../giisty-5c007-firebase-adminsdk-41spi-6c2655d8b9.json");
require('dotenv').config()


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(helmet());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Metaverse Dev APIs')
    .setDescription('<b>All information is set in this documentation with all APIs description. Hope everthing is understandable.</b><br><h5>Please Fill parameters correctly cause mostly errors occure when wi miss some parameter</h5><br> <b>NOTE</b>: Following APIs does not need authentication: <br> 1: Login <br> 2: Register <br> 3: forgetpassword <br> 2: password_change <br><br> but use authentication for rest APIs. Authentication token will be in login api response')
    .setVersion('1.0')
    .addTag('Metaverse').addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/api', app, document);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.APP_PORT);
}
bootstrap();
