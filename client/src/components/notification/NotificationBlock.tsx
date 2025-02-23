import { Notification } from "@/@types/notifiction";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";

interface Props {
  notification: Notification;
}

const NotificationBlock = ({ notification }: Props) => {
  return (
    <div>
      <Alert
        className={cn("flex items-center w-full gap-4", {
          "bg-green-200": !notification.isSeen,
        })}
      >
        {notification.image ? (
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={notification.image}
          />
        ) : (
          <Terminal className="h-4 w-4" />
        )}
        <div className="flex flex-col">
          <AlertTitle>New notification!</AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

export default NotificationBlock;
