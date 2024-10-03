type message = {
  userName: string;
  message: string;
};
type ChatProp = {
  messages: message[];
  currentUser: string;
  children: React.ReactElement;
};
const Chat = ({ messages, currentUser, children }: ChatProp) => {
  return (
    <>
      <div className="fixed top-0 bottom-0 z-20 w-full max-w-[230px] bg-[#F9F9F9] flex justify-center">
        <h2 className="font-bold text-[34px]">Chat room</h2>
      </div>
      <div className="h-screen ml-[230px] max-w-[calc(100vw-230px)] bg-white py-4 px-5 relative">
        <div className="flex flex-col-reverse overflow-auto h-[calc(100vh-110px)]">
          <ul className="text-sm flex flex-col">
            {messages.map((msg, index: number) => (
              <li
                key={index}
                className={`mb-8 p-2 rounded-full max-w-[60%] relative ${
                  msg.userName === "admin"
                    ? "text-slate-500 self-center font-medium text-[10px]"
                    : msg.userName === currentUser
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                {msg.message}
                {msg.userName !== currentUser && msg.userName !== "admin" && (
                  <span className="absolute text-[10px] text-slate-500 left-2 -top-[19px]">
                    {msg.userName}
                  </span>
                )}
              </li>
            ))}
          </ul>
          {children}
        </div>
      </div>
    </>
  );
};

export default Chat;
