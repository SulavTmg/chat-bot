import { useState } from "react";
import sendIcon from "../assets/sendIcon.svg";

type SendMessageProp = {
  sendMessage: (message: string) => void;
};

const SendMessage = ({ sendMessage }: SendMessageProp) => {
  const [msg, setMsg] = useState<string | "">("");
  return (
    <div className="absolute bottom-0 left-0 w-full p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(msg);
          setMsg("");
        }}
      >
        <div className="flex border justify-center items-center rounded-full p-2 bg-[#F4F4F4]">
          <div className="flex-1">
            <input
              className="outline-none px-3 py-2 w-full bg-[#F4F4F4]"
              type="text"
              placeholder="Message..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              required
            />
          </div>
          <>
            <button disabled={!msg} className="size-6 cursor-pointer">
              <img src={sendIcon} className="size-6" />
            </button>
          </>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
