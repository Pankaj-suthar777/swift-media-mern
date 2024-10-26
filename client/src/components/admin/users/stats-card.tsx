import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCard({
  count = 0,
  Icon,
  text,
}: {
  count?: number;
  Icon: React.ElementType;
  text?: string;
}) {
  return (
    <Card className="overflow-hidden border-2 border-black">
      <CardHeader className="border-b-2 border-black bg-black p-6">
        <CardTitle className="text-2xl font-semibold text-white">
          Total Users
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center">
          <Icon className="h-12 w-12 text-black" aria-hidden="true" />
          <span className="ml-4 text-5xl font-semibold text-black">
            {count}
          </span>
        </div>
        {text && (
          <p className="mt-2 text-sm font-medium text-gray-600">{text}</p>
        )}
      </CardContent>
    </Card>
  );
}
