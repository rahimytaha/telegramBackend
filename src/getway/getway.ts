import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server} from 'socket.io'

@WebSocketGateway({})
export class MyGetway implements OnModuleInit{
    onModuleInit() {
        this.Server.on("connection",(socket)=>{
            console.log(socket.id,"connected".red)
        })
        console.log("first")
    }
    @WebSocketServer()
    Server:Server
    @SubscribeMessage("newMessage")
    onNewMessage(@MessageBody()data:{msg:string}){
        this.Server.emit("onMessage",{
            "msg":data.msg
        })
        console.log(data,typeof data)
        return true
    }
}