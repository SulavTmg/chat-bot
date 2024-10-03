import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import WaitingRoom from "./components/WaitingRoom";
import Chat from "./components/Chat";
import SendMessage from "./components/SendMessage";

type messages = {
  userName: string;
  message: string;
};

function App() {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [messages, setMessages] = useState<messages[] | []>([]);
  const [currentUser, setCurrentUser] = useState<string | "">("");

  const joinChatRoom = async (userName: string, chatRoom: string) => {
    try {
      setCurrentUser(userName);
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5219/Chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("JoinSpecificChatRoom", (userName, message) => {
        setMessages((messages) => [...messages, { userName, message }]);
      });

      connection.on("ReceiveSpecificMessage", (userName, message) => {
        setMessages((messages) => [...messages, { userName, message }]);
      });

      await connection
        .start()
        .catch((err) => console.log("Connection failed.", err));
      await connection.invoke("JoinSpecificChatRoom", { userName, chatRoom });
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (message: string) => {
    try {
      await connection?.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!connection ? (
        <WaitingRoom joinChatRoom={joinChatRoom} />
      ) : (
        <Chat currentUser={currentUser} messages={messages}>
          <SendMessage sendMessage={sendMessage} />
        </Chat>
      )}
    </>
  );
}

export default App;
