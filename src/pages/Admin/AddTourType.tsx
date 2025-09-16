import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { AddTourTypeModal } from "@/components/modules/Admin/Tour/AddTourTypeModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AddTourType() {
  const { data } = useGetTourTypesQuery(undefined);
  const [removeTourType] = useRemoveTourTypeMutation();

  const removeTourTypeHandler = async (tourTypeId: string) => {
    const toastId = toast.loading("TourType Removing...");
    try {
      const res = await removeTourType(tourTypeId).unwrap();

      if (res.success) {
        toast.success("TourType is removed.", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Wrong happened when removing.", {
        id: toastId,
      });
    }
  };
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
            {data?.map((type: { name: string, _id: string }) => (
              <TableRow>
                <TableCell className="font-medium">{type.name}</TableCell>
                <TableCell className="font-medium">
                  <DeleteConfirmDialog onConfirm={() => removeTourTypeHandler(type._id)}>
                    <Trash2 />
                  </DeleteConfirmDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
