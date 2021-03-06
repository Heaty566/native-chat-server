import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { monoEnum } from 'mono-utils-core';
import { config } from './core/config';
import { Message } from './chat/entities/message.entity';
import { Chat } from './chat/entities/chat.entity';

export const dbModuleConfig = TypeOrmModule.forRoot({
    type: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    synchronize: true,
    keepConnectionAlive: true,
    entities: [User, Message, Chat],
    extra: { connectionLimit: 1 },
});

export const graphQLModuleConfig = GraphQLModule.forRoot({
    autoSchemaFile: true,
    playground: config.NODE_ENV !== monoEnum.NODE_ENV_MODE.PRODUCTION,
    debug: false,
    installSubscriptionHandlers: true,
    cors: {
        origin: config.CLIENT_URL,
        credentials: true,
    },
    path: '/api/graphql',
    subscriptions: {
        'subscriptions-transport-ws': {
            onConnect: (headers) => {
                return {
                    ws: {
                        headers: headers,
                    },
                };
            },
        },
    },
    context: ({ req, res }) => {
        return {
            req,
            res,
        };
    },

    formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
            message: error?.extensions?.details,
            extensions: {
                status: error?.extensions?.statusCode,
            },
        };
        return graphQLFormattedError;
    },
});
