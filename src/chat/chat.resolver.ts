import { Args, Context, Mutation, Resolver, Subscription, Query } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { PubSub } from 'graphql-subscriptions';
import { JoiValidatorPipe } from 'src/core/utils/validator/validator.pipe';
import { CreateChatDTO, vCreateChatDTO } from './dto/createChatDto';
import { UserGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ChatSchema } from './entities/chat.schema';
import { GraphqlWs } from 'src/core/interface/graphql';
import { AddNewMessageDTO, vAddNewMessageDTO } from './dto/addNewMessage';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';
@Resolver((of) => ChatSchema)
export class ChatResolver {
    private readonly pubSub: PubSub;

    constructor(private readonly chatService: ChatService, private readonly messageService: MessageService) {
        this.pubSub = new PubSub();
    }

    @UseGuards(UserGuard)
    @Mutation(() => String)
    async createNewChat(
        @Context('req') req: Request,
        @Args('input', new JoiValidatorPipe(vCreateChatDTO)) body: CreateChatDTO
    ) {
        console.log('test');
        let chat = new Chat();
        chat.createDate = new Date();
        chat.id = [body.userId, req.user.id].sort().join('-');
        chat = await this.chatService.save(chat);
        this.pubSub.publish(`newChat`, chat);
        return chat;
    }

    @UseGuards(UserGuard)
    @Mutation(() => Boolean)
    async addNewMessage(
        @Context('req') req: Request,
        @Args('input', new JoiValidatorPipe(vAddNewMessageDTO)) body: AddNewMessageDTO
    ) {
        let chat = await this.chatService.findOneByField('id', body.chatId);
        let message = new Message(req.user.id, body.content);
        message.createDate = new Date();
        message = await this.messageService.save(message);
        chat.messages = [...chat.messages, message];
        chat = await this.chatService.save(chat);
        this.pubSub.publish(`newMessage`, chat);
        return true;
    }

    @UseGuards(UserGuard)
    @Query(() => [ChatSchema])
    async getMyChat(@Context('req') req: Request): Promise<Array<ChatSchema>> {
        const chats = await this.chatService.findManyChatByCurrentUser(req.user.id);

        return chats;
    }

    @UseGuards(UserGuard)
    @Subscription((returns) => ChatSchema, {
        filter: (chat: Chat, _, { ws }: { ws: GraphqlWs }) => {
            if (chat.id.includes(ws.user.id)) {
                return true;
            }

            return false;
        },
        resolve: (value) => {
            return value;
        },
    })
    newChat() {
        return this.pubSub.asyncIterator(`newChat`);
    }

    @UseGuards(UserGuard)
    @Subscription((returns) => ChatSchema, {
        filter: (chat: Chat, _, { ws }: { ws: GraphqlWs }) => {
            if (chat.id.includes(ws.user.id)) {
                return true;
            }

            return false;
        },
        resolve: (value) => {
            return value;
        },
    })
    newMessage() {
        return this.pubSub.asyncIterator(`newMessage`);
    }
}
