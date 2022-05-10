import { MailerOptions } from '@nestjs-modules/mailer';

import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig: MailerOptions = {
  template: {
    dir: path.resolve(__dirname, '..', 'shared', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      layoutsDir: path.resolve(__dirname, '..', 'shared', 'templates'),
    },
  },
  transport: `smtps://lucasduarteinacio@gmail.com:Gnr3roses@smtp.gmail.com`,
};
