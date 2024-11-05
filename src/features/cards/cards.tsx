import coinIcon from "@/assets/Coin.svg"
import { CardDetailsModalProps } from "@/entities/cards/cards.dto"
import IconCoinBig from "@/assets/icons-react/CoinBig"
import IconCoin from "@/assets/icons-react/Coin"
import { Box, Typography, Divider } from "@mui/material"
import { Button } from "@mui/material"
// import YoutubeIcon from "@mui/icons-material/YouTube"
import { DetailsModal } from "@/shared/ui/DetailsModal"
import { IconCardPaid } from "@/assets/icons-react/IconCardPaid"
import { ICard } from "../clicker"
import { IconCardTelegram } from "@/assets/icons-react/IconCardTelegram"
import { IconCardYoutube } from "@/assets/icons-react/IconCardYoutube"
import { IconCardInstagram } from "@/assets/icons-react/IconCardInstagram"

type IProps = {
  onSelectCard: (card: ICard) => void
  cards: ICard[]
  isMyCards: boolean
  userCoins: number
  userSalary: number
}



export const CardsList = ({ onSelectCard, cards, isMyCards }: IProps) => {
  console.log("CARDS LIST?: ", cards)

  return (
    <Box
      sx={{
        overflowY: "auto",
        marginTop: "20px",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "16px",
        paddingBottom: "64px"
      }}
    >
      {Array.isArray(cards) && cards.length > 0 ? cards.map((card) => (
        <Box
          key={card._id}
          sx={{
            borderRadius: "16px",
            backgroundColor: "primary.main",
            border: "1px solid #008f6d",
            borderBottom: 0,
            background: "#031E2B",
            // borderColor: card.variant === 'approved' ? 'green' : card.variant === 'new' ? 'blue' : 'grey',
            padding: "16px",
            display: "flex",
            cursor: "pointer"
          }}
          onClick={() => onSelectCard(isMyCards ? { ...card, paid: true } : card)}
        >
          <img
            src={card.urlPicture}
            width="108px"
            height="118px"
            alt="card image"
            style={{ borderRadius: "12px" }}
          />
          <Box
            sx={{
              marginLeft: "16px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "medium",
                  textTransform: "capitalize",
                  marginBottom: "8px",
                  maxWidth: "140px",
                }}
              >
                {card.title}
              </Typography>
              {card.descriptionShort && <Typography
                sx={{ fontSize: "12px", color: "#FFE881", marginBottom: "8px" }}
              >
                {card.descriptionShort}
              </Typography>}
              <Typography
                sx={{ fontSize: "12px", color: "#FFE881", marginBottom: "8px" }}
              >
                lvl {card.level}
              </Typography>
              {card.paid && <IconCardPaid style={{ position: "absolute", right: 0, top: 0 }} />}
            </Box>
            <Divider
              sx={{
                backgroundColor: "rgba(0, 143, 109, 0.1)",
                marginTop: "8px",
              }}
            />
            <Box
              sx={{
                marginTop: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: "2px", alignItems: "center" }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "800",
                    paddingBottom: "3px",
                  }}
                >
                  {card.upgradeCost || card.price}
                </Typography>
                <IconCoin width={25} height={25} />
              </Box>
              <Box>
                <Typography
                  sx={{ fontSize: "9px", color: "white", opacity: 0.6 }}
                >
                  Прибыль в час
                </Typography>
                <Box sx={{ display: "flex", gap: "2px", alignItems: "center" }}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      letterSpacing: ".8px",
                    }}
                  >
                    +{card.salary}
                  </Typography>
                  <IconCoin width={25} height={25} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>))
        : <Box sx={{ width: '100%', textAlign: 'center' }}>Карточки отсутствуют</Box>
      }
    </Box>
  )
}

export const CardDetailsModal: React.FC<CardDetailsModalProps> = ({
  card,
  onClose,
  isView,
  onClickBuyCard,
  onClickUpdateCard,
  coins,
}) => {

  // const logoList = [
  //   {
  //     id: 1,
  //     title: 'telegram',
  //     source: <IconCardTelegram />
  //   },
  //   {
  //     id: 2,
  //     title: 'youtube',
  //     source: <IconCardTelegram />
  //   },
  //   {
  //     id: 3,
  //     title: 'instagram',
  //     source: <IconCardTelegram />
  //   },
  // ]

  // const logo = logoList.find(el => el.title === currentCard?.urlPictureSocial)

  /* @ts-ignore */
  const currentCard = card?.card ? { ...card.card, ...card, description: card.card.description, paid: true } : card
  /* @ts-ignore */
  console.log('CURRENT CARD: ', currentCard)
  console.log('SELECTED CARD: ', card)
  if (currentCard) {
    return (
      <DetailsModal onClose={onClose} isView={isView} salary={0}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, paddingTop: 2 }}>
          <IconCoinBig width={45} height={45} />
          <Typography sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: '800', fontSize: 30, color: "#C8D5D8", letterSpacing: "1px" }}>{coins}</Typography>
        </Box>

        <Divider sx={{ mb: 2, backgroundColor: 'rgba(0, 143, 109, 0.1)' }} />

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={currentCard?.urlPicture}
            alt="currentCard image"
            style={{ width: 150, height: 150, objectFit: 'cover', borderRadius: 12 }}
          />
          <Box sx={{ ml: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'capitalize', mb: 1 }}>
              {currentCard?.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>

              <a href={currentCard.urlUser} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }} target="_blank">

                {currentCard?.urlPictureSocial === 'youtube'
                  ? <IconCardYoutube />
                  : currentCard?.urlPictureSocial === 'telegram'
                    ? <IconCardTelegram />
                    : currentCard?.urlPictureSocial === 'instagram'
                      ? <IconCardInstagram />
                      : <img width={24} height={24} src={currentCard?.urlPictureSocial} />}
                {/* {logo ? logo.source : <img width={32} height={32} src={currentCard?.urlPictureSocial} />} */}

                <Typography variant="body2" sx={{ color: 'gray', textDecoration: 'underline', margin: "3px 0" }}>
                  {currentCard.urlUserTitle || 'Автор не указан'}
                </Typography>
              </a>

            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: 'white', opacity: 0.6, marginTop: '15px' }}>
                Прибыль в час
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  +{currentCard?.salary}
                </Typography>
                <img src={coinIcon} alt="coin" style={{ width: 20, height: 20 }} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: "40px" }}>
          <Typography variant="body2" sx={{ color: 'white', opacity: 0.6, textAlign: 'center' }}>
            {currentCard?.description}
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            mt: "52px",
            mb: "24px",
            height: 56,
            fontWeight: '600',
            letterSpacing: '1px',
            borderRadius: '16px',
            fontSize: '18px',
            backgroundColor: '#026850',
            wordWwrap: "break-word",
            textTransform: "none",
            padding: "16px 0",
            boxShadow: "-2px -2px 2px rgba(0, 0, 0, 0.25) inset",
          }}
          onClick={() => {
            currentCard.paid ? onClickUpdateCard(currentCard._id)
              : onClickBuyCard(currentCard._id)
          }
          }
        >
          {currentCard.paid ? `Улучшить - ${currentCard.upgradeCost}` : 'Подписаться'}
          {!!currentCard.paid && <IconCoin width={26} height={26} />}
        </Button>
      </DetailsModal>

    );

  }
};

