import React, { useState } from "react"
import { Box, Modal, Slide } from "@mui/material"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

export interface DetailsModalProps {
  onClose: () => void;
  isView: boolean;
  salary?: number;
  children?: React.ReactNode; // Изменяемый контент
}

export const DetailsModal: React.FC<DetailsModalProps> = ({ onClose, isView, children }) => {

  // console.log(salary)

  return (

    <Modal
      open={isView}
      onClose={onClose}
      closeAfterTransition
      sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
    >
      <Slide direction="up" in={isView} timeout={500}>
        <div style={{
          color: 'white',
          position: 'relative',
          width: '100%',
          backgroundColor: '#001313',
          borderTop: '3px solid #026850',
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 -4px 150px rgba(0, 69, 36, 0.9)',
          padding: 25,
          paddingTop: 4,
          paddingBottom: 6,
          animation: `${isView ? 'fadeIn' : 'fadeOut'} 0.5s`,
        }}>
          <Box
            sx={{

            }}
          >
            {/* Кнопка закрытия */}
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                color: 'black',
                backgroundColor: 'rgba(98, 124, 108, 0.603)',
              }}
            >
              <CloseIcon style={{ width: '20px', height: '20px' }} />
            </IconButton>

            {/* Изменяемый контент */}
            {children}
          </Box>
        </div>
      </Slide>
    </Modal>

  );
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    handleOpen,
    handleClose,
  };
};
