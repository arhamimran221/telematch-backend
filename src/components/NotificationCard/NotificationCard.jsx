import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";

const NotificationCard = (props) => {
  console.log("props", props);
  return (
    <div className="flex gap-[20px] bg-[#fafafa] m-4 rounded-lg">
      <Image src="" alt="" />
      <div className="">
        <div className="flex items-center gap-[10px]">
          <Typography variant="paragraph" className="text-[16px] font-[600]">
            {props.notification.header}
          </Typography>
          <div className="font-[300] text-[10px] italic">
            Accepted By:
            {props.notification.accepted_by
              ? props.notification.accepted_by
              : "None"}
          </div>
        </div>
        <Typography variant="paragraph" className="font-poppins mt-[5px]">
          {props.notification.body}
        </Typography>
      </div>
    </div>
  );
};

export default NotificationCard;
