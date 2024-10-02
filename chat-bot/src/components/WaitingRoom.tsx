import { useState } from "react";

type WaitingRoomProp = {
  joinChatRoom: (userName: string, chatRoom: string) => void;
};

const WaitingRoom = ({ joinChatRoom }: WaitingRoomProp) => {
  const [userName, setUserName] = useState<string | "">("");
  const [chatRoom, setChatRoom] = useState<string | "">("");

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          joinChatRoom(userName, chatRoom);
          setUserName("");
          setChatRoom("");
        }}
      >
        <div className="flex flex-col gap-y-5 w-[250px] text-sm">
          <input
            className="border outline-none px-4 py-2 rounded-full"
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            className="border outline-none px-4 py-2 rounded-full"
            type="text"
            placeholder="Room"
            value={chatRoom}
            onChange={(e) => setChatRoom(e.target.value)}
            required
          />
          <div className="font-semibold flex justify-center">
            <button className="text-black w-full px-6 py-2 rounded-full bg-slate-100">
              Join
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WaitingRoom;
