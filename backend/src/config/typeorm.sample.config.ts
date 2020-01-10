import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres', // Or other type of database
    host: 'localhost',
    port: 5432,
    username: 'yourUsername',
    password: 'yourPassword',
    database: 'yourDataBase',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true, // Or false
}