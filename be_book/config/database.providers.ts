import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/economic';
      return mongoose.connect(uri);
    },
  },
];

// nest g resource user --no-spec