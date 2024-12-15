import { NestFactory,  } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';



async function bootstrap() {
  // //const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  // )
  // app.enableCors()
  // app.useGlobalPipes(new ValidationPipe());
  // await app.listen(process.env.PORT ?? 3000);
  
const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.RMQ,
  options: {
    urls: ['amqps://zujxsqjl:xQ-rHr8_DJIA4BVRKWrNwH1Q4HXbjQb1@cow.rmq2.cloudamqp.com/zujxsqjl'],
    queue: 'main_queue',
    queueOptions: {
      durable: false
    },
  },
});
app.useGlobalPipes(new ValidationPipe());
app.listen()
.then(() => console.log('Microservice is listening'));

}
bootstrap();
