import { AddTourTypeModal } from "@/components/modules/Admin/Tour/AddTourTypeModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";

export default function AddTourType() {
  const { data } = useGetTourTypesQuery(undefined);
  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-5 items-center">
        <h1>Tour Types</h1>
        <AddTourTypeModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">Name</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((type: { name: string }) => (
              <TableRow>
                <TableCell className="font-medium">{type.name}</TableCell>
                <TableCell className="font-medium">
                  <Trash2 />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
