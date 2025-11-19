/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestimonialsModule } from './testimonials/testimonials.module';
import * as fs from 'fs';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: process.env.DB_SSL_CA
        ? {
            ca: fs.readFileSync(process.env.DB_SSL_CA, 'utf8'),
            rejectUnauthorized: false,
          }
        : { rejectUnauthorized: false },
      autoLoadEntities: true,
      synchronize: true,
    }),

    TestimonialsModule,
  ],
})
export class AppModule {}
