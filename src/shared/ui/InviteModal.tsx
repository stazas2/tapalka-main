import React from "react"
import { Box, Typography } from "@mui/material"
import { Button } from "@mui/material"
import { DetailsModal } from "@/shared/ui/DetailsModal"

// @ts-ignore

const userDataTelegram = window.Telegram.WebApp.initDataUnsafe;

// let userDataTelegram = null

// import.meta.env.VITE_API_STATUS === 'PROD'
//   // @ts-ignore
//   ? userDataTelegram = window.Telegram.WebApp.initDataUnsafe
//   : userDataTelegram = {
//     user: {
//       id: "6646659616",
//       username: 'travikvlad'
//     },
//   }
  
type InviteModalProps = {
  onClose: () => void;
  isView: boolean;
}

// TODO: плавное закрытие модалки
export const InviteModal: React.FC<InviteModalProps> = ({
  onClose,
  isView,
}) => {



  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // alert("Текст скопирован!");
      })
      .catch((error) => {
        console.error("Ошибка при копировании: ", error);
      });
  };


  return (
    <DetailsModal onClose={onClose} isView={isView}>
      <Box sx={{
        display: 'flex', alignItems: 'center', flexDirection: 'column',
        textAlign: 'center', gap: '30px', paddingTop: '16px'
      }}>
        <Typography className='gradient-stroke-text' sx={{ fontSize: '25px', fontWeight: '800' }}>
          Пригласить друга
        </Typography>
        <Typography sx={{ fontSize: '14px', fontWeight: '800' }}>
          {`https://t.me/LiveParadox_Bot/paradox?startapp=${userDataTelegram?.user?.id}`}
        </Typography>
      </Box>

      <Button
        onClick={() => { handleCopy(`https://t.me/LiveParadox_Bot/paradox?startapp=${userDataTelegram?.user?.id}`); onClose(); alert('Текст скопирован') }}
        fullWidth
        variant="contained"
        color="primary"
        sx={{
          mt: "52px",
          height: 56,
          fontWeight: '600',
          letterSpacing: '1px',
          borderRadius: '16px',
          fontSize: '18px',
          backgroundColor: '#026850',
          wordWwrap: "break-word",
          textTransform: "none",
          marginBottom: "16px",
          boxShadow: "-2px -2px 2px rgba(0, 0, 0, 0.25) inset",
        }}
      >
        Скопировать
      </Button>

    </DetailsModal >
  );
};

