import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";

export default function DeleteDialog({
  open,
  onOpenChange,
  onDelete,
  loading,
}) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent className="max-w-md rounded-2xl">

        <AlertDialogHeader>

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <Trash2
              className="text-red-600"
              size={24}
            />
          </div>

          <AlertDialogTitle className="text-center text-2xl">
            Delete Note?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center leading-6">
            This action cannot be undone.
            <br />
            Your note will be permanently deleted.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6">

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}