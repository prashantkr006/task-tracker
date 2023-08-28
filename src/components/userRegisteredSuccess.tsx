import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface UserRegisteredSuccessProps {
  open: boolean;
  onClose: () => void;
}

const UserRegisteredSuccess: React.FC<UserRegisteredSuccessProps> = ({
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
      <DialogContent className="bg-green-400 p-4 text-white flex flex-col items-center space-y-2">
        <CheckCircleOutlineIcon />
        <Typography>User registered successfully!</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default UserRegisteredSuccess;
