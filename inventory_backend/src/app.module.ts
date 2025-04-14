// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from './user/user.module';
// import { CustomerModule } from './customer/customer.module';
// import { EmployeeModule } from './employee/employee.module';
// import { ItemModule } from './item/item.module';
// import { CategoryModule } from './category/category.module';
// import { SupplierModule } from './supplier/supplier.module';
// import { TransactionModule } from './transaction/transaction.module';
// import { InventoryModule } from './inventory/inventory.module';
// import { AddressModule } from './address/address.module';
// import { FactoryModule } from './factory/factory.module';
// import { UserExperienceModule } from './user-experience/user-experience.module';
// import { OrderModule } from './order/order.module';
// import { OrderDetailModule } from './order-detail/order-detail.module';
// import { AuthModule } from './auth/auth.module';
// import { CaslModule } from './casl/casl.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: process.env['DB_USERNAME'] || 'postgres',
//       password: process.env['DB_PASSWORD'] || '1234',
//       database: process.env['DB_NAME'] || 'SM',
//       autoLoadEntities: true,
//       synchronize: false,
//       migrationsRun: true,
//     }),
//     UserModule,
//     CustomerModule,
//     EmployeeModule,
//     ItemModule,
//     CategoryModule,
//     SupplierModule,
//     AuthModule,
//     TypeOrmModule.forRoot({/*...*/}),
//     TransactionModule,
//     InventoryModule,
//     AddressModule,
//     OrderModule,
//     OrderDetailModule,
//     UserExperienceModule,
//     FactoryModule,
//     CaslModule,
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { EmployeeModule } from './employee/employee.module';
import { ItemModule } from './item/item.module';
import { CategoryModule } from './category/category.module';
import { SupplierModule } from './supplier/supplier.module';
import { TransactionModule } from './transaction/transaction.module';
import { InventoryModule } from './inventory/inventory.module';
import { AddressModule } from './address/address.module';
import { FactoryModule } from './factory/factory.module';
import { UserExperienceModule } from './user-experience/user-experience.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load env automatically
    TypeOrmModule.forRoot({
      type: 'postgres', // hardcode type for consistency
      host: 'localhost',
      port: 5432,
      username: process.env['DB_USERNAME'] || 'postgres',
      password: process.env['DB_PASSWORD'] || '1234',
      database: process.env['DB_NAME'] || 'SM',
      autoLoadEntities: true,
      synchronize: true, // don't auto sync in production
      migrationsRun: true, // automatically run migrations
    }),
    UserModule,
    CustomerModule,
    EmployeeModule,
    ItemModule,
    CategoryModule,
    SupplierModule,
    AuthModule,
    TransactionModule,
    InventoryModule,
    AddressModule,
    OrderModule,
    OrderDetailModule,
    UserExperienceModule,
    FactoryModule,
    CaslModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
