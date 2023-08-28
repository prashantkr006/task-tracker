import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface CreateSuccessDialogProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

const CreateSuccessDialog: React.FC<CreateSuccessDialogProps> = ({
  message,
  open,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    setIsVisible(open);

    if (open) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [open, onClose]);

  return (
    <Dialog open={isVisible} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent className="bg-green-400 p-4 text-white flex items-center space-x-2">
        <CheckCircleOutlineIcon />
        <Typography>{message}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSuccessDialog;
