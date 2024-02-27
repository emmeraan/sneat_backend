
import { DynamicModule, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
require('dotenv').config()

@Module({})
export class MailModule {
  static async forRoot(): Promise<DynamicModule> {
    return {
      module: MailModule,
      imports: [
        MailerModule.forRoot({
          transport: {
            service: "gmail",
            host: "smtp.gmail.com",
            secure: false,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASSWORD,
            },
            tls: {
              rejectUnauthorized: false
            }
          },
          defaults: {
            from: process.env.SMTP_USER,
          },
          template: {
            dir: process.cwd()+'/src/app/resources/views/mail',
            adapter: new HandlebarsAdapter(undefined, {
              inlineCssEnabled: true,
              inlineCssOptions: {
                url: ' ',
                preserveMediaQueries: true,
              },
            }),
            options: {
              strict: true,
            },
          },
          options: {
            partials: {
              dir: process.cwd()+'/src/app/resources/views/partials',
              options: {
                strict: true,
              },
            },
          },
        })
      ],
    };
  }
}