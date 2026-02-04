import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const AssistTable = ({ onAssetClick, coin = [], loading }) => {
  if (loading) {
    return (
      <div className="p-6 text-center text-slate-500">
        Loading coins...
      </div>
    );
  }

  return (
    <div className="w-full">
     
      <Table>
         <ScrollArea className="h-[85vh]">
          <TableHeader>
          <TableRow className="bg-slate-50 border-b">
            <TableHead>Coin</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>24h</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coin.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => onAssetClick(item)}
              className="cursor-pointer border-b hover:bg-slate-50 transition"
            >
              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={item.image} />
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-slate-900">
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-500 uppercase">
                      {item.symbol}
                    </div>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                ${item.total_volume?.toLocaleString()}
              </TableCell>

              <TableCell>
                ${item.market_cap?.toLocaleString()}
              </TableCell>

              <TableCell
                className={`font-medium ${
                  item.price_change_percentage_24h < 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {item.price_change_percentage_24h?.toFixed(2)}%
              </TableCell>

              <TableCell className="text-right font-semibold">
                ${item.current_price?.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
         </ScrollArea>
      </Table>
   
    </div>
  );
};

export default AssistTable;
