"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const mongoose = require("mongoose");
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/economic';
            return mongoose.connect(uri);
        },
    },
];
//# sourceMappingURL=database.providers.js.map