import { addOneClick } from "@/entities/profile/profileSlice"
import {
  Box,
  Button,
  Container,
  Typography,
  List,
  IconButton,
  Divider,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import "../../shared/styles/global.scss"
import TapCoin from "@/assets/Tap_coin.png"
import { io, Socket } from "socket.io-client"
import BackgroundEffect from "@/assets/BgEffect-1.png"
import BackgroundEffect2 from "@/assets/BgEffect-2-png.png"
import { Link } from "react-router-dom"

import IconCoin from "@/assets/icons-react/Coin"
import CoinBig from "@/assets/CoinBig.png"
import ImgStopwatch from "@/assets/Stopwatch_img.png"
import DividerSvg from "@/assets/icons-react/Divider"
import { IconCloseModal } from "@/assets/icons-react/IconCloseModal"
import IconCoinBig from "@/assets/icons-react/CoinBig"
import { CardDetailsModal, CardsList } from "@/features/cards/cards"
import CustomButton from "@/shared/ui/CustomButton"
import teamIcon from "@/assets/icons/btns/teamIcon.svg"
import blogerIcon from "@/assets/icons/btns/blogerIcon.svg"
import { IUserCardType } from "@/entities/cards/cards.dto"

import ImgAvatar from "@/assets/9.png"
import ImgStar from "@/assets/Star_img.png"
import { EnergyBar } from "@/shared/ui/EnergyLine"
import { WelcomeModal } from "@/shared/ui/WelcomeModal"

// console.log('GG: ', import.meta.env.VITE_API_URL)

let userDataTelegram = null

// @ts-ignore
userDataTelegram = window?.Telegram?.WebApp?.initDataUnsafe

if (!userDataTelegram) {
  userDataTelegram = {
    user: {
      id: "6646659616",
      username: 'travikvlad'
    },
  }
}


// import.meta.env.VITE_API_STATUS === 'PROD'
//   // @ts-ignore
//   ? userDataTelegram = window.Telegram.WebApp.initDataUnsafe
//   : userDataTelegram = {
//     user: {
//       id: "6646659616",
//       username: 'travikvlad'
//     },
//   }

// @ts-ignore
const checkExpander = window.Telegram.WebApp.ready(function () {
  // @ts-ignoreW
  window.Telegram.WebApp.expand();
});

type User = {
  _id: number
  idTelegram: number
  username: string
  level: number
  salary: number
  rating: number
  energy: number
  coins: number
  dateRegistartion: string
  dateSalary: string
  dateUpdated: string
  dateOnline: string
}

interface FloatNumber {
  id: number
  x: number
  y: number
  value: number
}

// -------------------- Init 

export type ICard = {
  _id: number,
  title: string,
  descriptionShort: string,
  description: string,
  level: number,
  salary: number,
  rph: number,
  progress: number,
  urlPicture: string,
  urlUser: string,
  urlUserTitle: string,
  price: number,
  dateCreation: string,
  upgradeCost: number,
  paid?: boolean
}

const defaultCategories = [
  { id: 1, title: "Новые" },
  { id: 2, title: "Добавленные" },
]

const defaultData = {
  _id: 0,
  idTelegram: 0,
  username: "Guest",
  level: 1,
  salary: -1,
  rating: 0,
  energy: 0,
  coins: 0,
  dateRegistartion: "0",
  dateSalary: "0",
  dateUpdated: "0",
  dateOnline: "1724591195368",
}


const App: React.FC = () => {

  // const location = useLocation();

  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [isOpen3] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)
  const [socketId, setSocketId] = useState<string | undefined>("")

  const [clicks, setClicks] = useState(0)
  const [floatNumbers, setFloatNumbers] = useState<FloatNumber[]>([])
  const [showShare, setShowShare] = useState(false)
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  const [welcomeSalary, setWelcomeSalary] = useState(0);


  const toggleSlider = () => {
    setIsOpen(!isOpen)
  }
  const toggleSlider2 = () => {
    setIsOpen2(!isOpen2)
  }

  const handleBackgroundClick = () => {
    if (isOpen) {
      setIsOpen(false)
    } else if (isOpen2) {
      setIsOpen2(false)
    }
  }



  const [cardsList, setCardsList] = useState<ICard[] | []>([])
  const [cardsPartyList, setCardsPartyList] = useState<ICard[] | []>([])

  const [myCardsList, setMyCardsList] = useState<ICard[] | []>([])
  const [myCardsPartyList, setMyCardsPartyList] = useState<ICard[] | []>([])

  const [selectedCard, setSelectedCard] = useState<ICard>(cardsList[0])

  const [cardsCategoriesList] = useState(defaultCategories)

  const [activeTab, setActiveTab] = useState(cardsCategoriesList[0])

  const [userData, setUserData] = useState<User>(defaultData)

  const [loading, setLoading] = useState(true)
  const [error2, setError2] = useState<unknown | null>(null)

  // const [isUserUpdated, setIsUserUpdated] = useState(false)

  console.log(loading, error2)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const newClicks = clicks + 1;

    setClicks(newClicks)

    const x = e.clientX - 50;
    const y = e.clientY - 250;
    let z = 1;

    let newEnergy = userData.energy - 1;
    if (newEnergy < 0) newEnergy = 0;

    if (!userData.energy) z = 0;
    const newFloatNumber: FloatNumber = {
      id: newClicks,
      x: x,
      y: y,
      value: z,
    };
    setFloatNumbers([...floatNumbers, newFloatNumber]);
    dispatch(addOneClick());

    setTimeout(() => {
      setFloatNumbers((current) =>
        current.filter((floatNumber) => floatNumber.id !== newFloatNumber.id)
      );
    }, 2000);

  };


  const onClickBuyCard = async (cardId: number) => {

    const body = JSON.stringify({ userId: userData._id, cardId })

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user-cards/assign`, {
        method: 'POST', body, headers: {
          "Content-Type": "application/json",
        }
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const jsonData = await response.json()

      setCardsList(state => state.filter(card => card._id !== cardId))
      setCardsPartyList(state => state.filter(card => card._id !== cardId))
      setUserData(jsonData);
      handleClearAndCloseModal()
      return jsonData
    } catch (err) {
      setError2(err)
    } finally {
      setLoading(false)
    }
  }

  const onClickUpdateCard = async (cardId: number) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user-cards/upgrade/${userData._id}/${cardId}`, {
        method: 'POST',
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const jsonData = await response.json()

      setMyCardsList(state => state.map(card => card._id === selectedCard._id ? { ...jsonData.userCard.card, salary: jsonData.userCard.salary, upgradeCost: jsonData.userCard.upgradeCost, level: jsonData.userCard.level, paid: true } : card))
      setMyCardsPartyList(state => state.map(card => card._id === selectedCard._id ? { ...jsonData.userCard.card, salary: jsonData.userCard.salary, upgradeCost: jsonData.userCard.upgradeCost, level: jsonData.userCard.level, paid: true } : card))
      console.log('CHECK?: ', jsonData)
      setSelectedCard({ ...jsonData.userCard, paid: true, description: jsonData.userCard.description, _id: jsonData.userCard.card._id })
      setUserData({ ...jsonData.user });
      return jsonData
    } catch (err) {
      setError2(err)
    } finally {
      setLoading(false)
    }
  }


  const handleShareCard = (card: ICard) => {
    console.log('CARD?: ', card)
    setSelectedCard(card)
    setShowShare(true)
  }

  const handleClearAndCloseModal = () => {
    setShowShare(false)
  }

  const handleCloseWelcomeModal = () => {
    // setUserData(state => { ...state, coins:  })
    setIsWelcomeModalOpen(false);
    setUserData(state => ({ ...state, coins: state.coins + welcomeSalary }))
    // sessionStorage.setItem("welcomeModalShown", "true");
    // console.log('Session Storage: ', sessionStorage.getItem("welcomeModalShown"))
  };

  // ------------------------------ fetch

  const fetchDataMyCards = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user-cards/category/${userData._id}/bloggers`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const jsonData = await response.json()
      const filteredData = jsonData.map((card: IUserCardType) => ({ ...card.card, salary: card.salary, level: card.level, upgradeCost: card.upgradeCost }))
      setMyCardsList(filteredData.map((data: any) => ({ ...data, paid: true })))
      return jsonData
    } catch (err) {
      setError2(err)
    } finally {
      setLoading(false)
    }
  }


  const fetchDataMyPartyCards = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user-cards/category/${userData._id}/party`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const jsonData = await response.json()
      const filteredData = jsonData.map((card: IUserCardType) => ({ ...card.card, salary: card.salary, level: card.level, upgradeCost: card.upgradeCost }))
      setMyCardsPartyList(filteredData.map((data: any) => ({ ...data, paid: true })))
      return jsonData
    } catch (err) {
      setError2(err)
    } finally {
      setLoading(false)
    }
  }


  const handleButtonPress = () => {
    console.log('SOCKET: ', socket)
    if (socket && socket.connected) {
      socket.emit(
        "buttonPress",
        { message: "Button pressed!", id: user },
        socketId
      )
    } else {
    }

    /* @ts-ignore */
    handleClick(event)
  }


  // -------------------------   CONNECTION

  const [username, setUsername] = useState<string>()

  console.log('username: ', username)

  const userProfile = {
    idTelegram: (typeof userDataTelegram.user?.id === 'string' && userDataTelegram.user?.id) || (userDataTelegram.user?.id).toString(),
    username: userDataTelegram.user?.username || 'Guest',
  }


  // ------------------- useEffects

  // USE EFFECT INIT

  useEffect(() => {
    /* @ts-ignore */
    setUser(userProfile.idTelegram)
    setUsername(userProfile?.username || 'Guest')
  }, [])
  const [user, setUser] = useState<string>()


  useEffect(() => {

    console.log('gg1')

    // const regex = /[\?&]tgWebAppStartParam=(\d+)/;
    // const match = location.search.match(regex);
    // @ts-ignore
    const idReferral = userDataTelegram?.start_param

    console.log('gg2')


    if (userProfile.idTelegram) {

      console.log('gg2')

      console.log('FIRST')
      // SOCKETS

      const newSocket = io(`${import.meta.env.VITE_API_URL}`, {
        transports: ["websocket"],
        autoConnect: true,
        query: { userId: userProfile.idTelegram, username: userProfile?.username, idReferral }
      })


      // ----------- ON INIT
      newSocket.on("connect", () => {

        console.log("Connected to server:", newSocket)

        setSocket(newSocket)
        console.log("Updating...")

        const { idTelegram, username } = userProfile

        newSocket.emit(
          "init",
          { message: "init", idTelegram, username },
          socketId
        )

        console.log("Updated!")

        newSocket.emit(
          "onSalary",
          { message: "onSalary", idTelegram: userDataTelegram.user.id },
          socketId
        )

        console.log("Salary!")

      })

      newSocket.on("initAck", (data) => {
        console.log("initAck: ", data)
        // setWelcomeSalary(data.salary)
        // setUserData(data.user)
        // 
        // const { coins, energy } = data.result
        // setUserData((state) => ({ ...state, coins, energy }))
      })

      newSocket.on("onSalaryAck", (data: { user: User, salary: number }) => {
        console.log("onSalaryAck: ", data.salary)
        setWelcomeSalary(data.salary)
        setUserData({ ...data.user, coins: data.user.coins - data.salary })

        // const { coins, energy } = data.result
        // setUserData((state) => ({ ...state, coins, energy }))
      })

      // ----------- INIT

      // Disconnect
      newSocket.on("disconnect", () => {
        console.log("Disconnected from server")
        setSocketId("")
      })


      // ----------- ACTIONS

      newSocket.on("buttonPressAck", (data) => {
        console.log("data: ", data)
        const { coins, energy } = data.result
        setUserData((state) => ({ ...state, coins, energy }))
      })


      return () => {
        newSocket.close()
      }

    }
  }, [user])

  // ------------------- ON UPDATE SOCKET

  // useEffect(() => {

  //   if (socket) {x
  //     console.log('onSalary:', socket)
  //     socket.emit(
  //       "onSalary",
  //       { message: "onSalary", idTelegram: userDataTelegram.user.id },
  //       socketId
  //     )
  //     // sessionStorage.setItem('sessionStatus', 'true')
  //     console.log("Updated session!")
  //   }

  // }, [socket])

  useEffect(() => {
    console.log('welcomeSalary: ', welcomeSalary)
    if (+welcomeSalary > 0) setIsWelcomeModalOpen(true);
  }, [welcomeSalary])


  useEffect(() => {
    if (activeTab.id === 2) {

      fetchDataMyCards()
      fetchDataMyPartyCards()
    }

  }, [activeTab])


  useEffect(() => {
    if (isOpen === true) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/cards/category/bloggers/${userData._id}`)
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          const jsonData = await response.json()
          setCardsList(jsonData)
          return jsonData
        } catch (err) {
          setError2(err)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
      fetchDataMyCards()

      setActiveTab({ id: 1, title: "Новые" })

    }
  }, [isOpen])


  useEffect(() => {
    if (isOpen2 === true) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/cards/category/party/${userData._id}`)
          if (!response.ok) {
            throw new Error("Network response was not ok")
          }
          const jsonData = await response.json()
          setCardsPartyList(jsonData)
          return jsonData
        } catch (err) {
          setError2(err)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
      fetchDataMyPartyCards()

      setActiveTab({ id: 1, title: "Новые" })

    }
  }, [isOpen2])


  return (

    <article
      className="main-bg"
      style={{ position: "relative", height: "100%", overflow: "hidden" }}
    >

      {(isOpen || isOpen2 || isOpen3) && (
        <div
          className="slider-background"
          onClick={handleBackgroundClick}
        ></div>
      )}

      <WelcomeModal
        isView={isWelcomeModalOpen}
        onClose={handleCloseWelcomeModal}
        salary={welcomeSalary}
      />

      <Box className={`slider ${isOpen ? "open" : ""}`}>
        <Box
          sx={{
            color: "#fff",
            gap: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingBlock: 1,
              height: 22,
            }}
          >
            <IconButton onClick={handleBackgroundClick}>
              <IconCloseModal style={{ width: "25px", height: "25px" }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              paddingInline: "35px",
              gap: 1,
              display: "flex",
              flexDirection: "column",
              height: "80vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                height: 40,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconCoinBig width={44} height={44} />
                <Typography sx={{ fontWeight: "800", fontSize: 30, paddingLeft: 1 }}>
                  {userData.coins}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{ fontSize: "10px", fontWeight: 200, lineHeight: 1, opacity: 0.6 }}
                >
                  Прибыль в час

                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 600, lineHeight: 1 }}>
                    +{userData.salary}
                  </Typography>
                  <IconCoin width={25} height={25} />
                </Box>
              </Box>
            </Box>

            <Divider
              sx={{ color: "#333", backgroundColor: "rgba(0, 143, 109, 0.1)" }}
            />

            <Box
              sx={{
                display: "flex",
                flex: 1,
                borderRadius: "8px",
                backgroundColor: "rgba(27, 46, 55, 0.5)",
                p: "4px",
                gap: 1,
                maxHeight: "33px",
                justifyContent: "space-between",
              }}
            >
              {cardsCategoriesList.map((cat) => (
                <Box
                  key={cat.id}
                  onClick={() => setActiveTab(cat)}
                  sx={{
                    paddingInline: "15px",
                    paddingBlock: "8px",
                    borderRadius: "6px",
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    fontSize: 14,
                    letterSpacing: "0.3px",
                    backgroundColor:
                      cat.id === activeTab.id ? "#008F6E" : "transparent",
                  }}
                >
                  {cat.title}
                </Box>
              ))}

            </Box>

            <CardsList
              onSelectCard={handleShareCard}
              cards={activeTab.id === 1 ? cardsList : myCardsList}
              isMyCards={activeTab.id === 1 ? false : true}
              userCoins={userData.coins}
              userSalary={userData.salary}
            />
          </Box>
        </Box>
      </Box>

      <Box className={`slider ${isOpen2 ? "open" : ""}`}>
        <Box
          sx={{
            color: "#fff",
            gap: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              paddingBlock: 1,
              height: 22,
            }}
          >
            <IconButton onClick={handleBackgroundClick}>
              <IconCloseModal style={{ width: "25px", height: "25px" }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              paddingInline: "35px",
              gap: 1,
              display: "flex",
              flexDirection: "column",
              height: "80vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                height: 40,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <IconCoinBig width={44} height={44} />
                <Typography sx={{ fontWeight: "800", fontSize: 30, paddingLeft: 1 }}>
                  {userData.coins}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{ fontSize: "10px", fontWeight: 200, lineHeight: 1, opacity: 0.6 }}
                >
                  Прибыль в час

                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: 600, lineHeight: 1 }}>
                    +{userData.salary}
                  </Typography>
                  <IconCoin width={25} height={25} />
                </Box>
              </Box>
            </Box>

            <Divider
              sx={{ color: "#333", backgroundColor: "rgba(0, 143, 109, 0.1)" }}
            />

            <Box
              sx={{
                display: "flex",
                flex: 1,
                borderRadius: "8px",
                backgroundColor: "rgba(27, 46, 55, 0.5)",
                p: "4px",
                gap: 1,
                maxHeight: "33px",
                justifyContent: "space-between",
              }}
            >
              {cardsCategoriesList.map((cat) => (
                <Box
                  key={cat.id}
                  onClick={() => setActiveTab(cat)}
                  sx={{
                    paddingInline: "15px",
                    paddingBlock: "8px",
                    borderRadius: "6px",
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    fontSize: 14,
                    letterSpacing: "0.3px",
                    backgroundColor:
                      cat.id === activeTab.id ? "#008F6E" : "transparent",
                  }}
                >
                  {cat.title}
                </Box>
              ))}

            </Box>

            <CardsList
              onSelectCard={handleShareCard}
              cards={activeTab.id === 1 ? cardsPartyList : myCardsPartyList}
              isMyCards={activeTab.id === 1 ? false : true}
              userCoins={userData.coins}
              userSalary={userData.salary}
            />
          </Box>
        </Box>
      </Box>


      <CardDetailsModal
        card={selectedCard}
        onClose={handleClearAndCloseModal}
        isView={showShare}
        onClickBuyCard={onClickBuyCard}
        onClickUpdateCard={onClickUpdateCard}
        coins={userData.coins}
      />

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <header
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "12px",
            paddingBottom: "24px",
            width: "100%",
          }}
        >

          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              maxHeight: 48,
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <Link to="/">
                <Button>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <img src={ImgAvatar} style={{ width: 40, height: 40 }} />
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: "4px" }}
                    >
                      <img src={ImgStar} style={{ width: 28, height: 28 }} />
                      <Typography style={{ color: "white", fontSize: "18px" }}>
                        {userData.rating}
                      </Typography>
                    </Box>
                  </Box>
                </Button>
              </Link>
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                alignItems: "center",
              }}
            >
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <img src={ImgStopwatch} style={{ width: 28, height: 28, paddingRight: "5px" }} />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{ color: "white", fontSize: "9px", opacity: 0.6 }}
                    >
                      Прибыль в час
                    </span>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: "white",
                          fontSize: "14px",
                          fontWeight: "700",
                          lineHeight: "15.4px",
                          letterSpacing: "0.3%",
                          alignContent: "flex-end",
                        }}
                      >
                        +{userData?.salary}
                      </span>
                      <IconCoin width={25} height={25} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </header>

        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{ zIndex: 50, position: "relative" }}
              onClick={toggleSlider2}
            >
              <CustomButton iconPath={teamIcon}>Команда</CustomButton>
            </Box>
            <Box
              sx={{ zIndex: 50, position: "relative" }}
              onClick={toggleSlider}
            >
              <CustomButton iconPath={blogerIcon}>Блогеры</CustomButton>
            </Box>

          </List>
        </Container>

        <DividerSvg />

        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            zIndex: 10,
            paddingTop: "28px",
            position: "relative",
          }}
        >

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              color: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >

            <img src={CoinBig} />
            <Typography
              sx={{
                fontSize: "40px",
                fontWeight: "600",
              }}
            >
              {userData?.coins}
              {/* {JSON.stringify(userDataTelegram)} */}
              {/* {JSON.stringify(userProfile)} */}
            </Typography>
          </Box>

          <img
            src={BackgroundEffect2}
            style={{
              position: "absolute",
              zIndex: 5,
              left: "0%",
              top: "120%",
              width: "100%",
              height: "500px",
            }}
          />
        </Container>

        <Box
          sx={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 30,
            display: "flex",
          }}
        >
          <div>
            <div
              className="round-button"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                top: "20%",
              }}
              onClick={handleButtonPress}
            >
              <img
                src={TapCoin}
                width={292}
                height={292}
                style={{ zIndex: 60, pointerEvents: "none" }}
              />
            </div>
          </div>

          {floatNumbers.map((floatNumber) => (
            <div
              key={floatNumber.id}
              className="float-number"
              style={{
                left: floatNumber.x,
                top: floatNumber.y,
                fontWeight: "700",
              }}
            >
              {floatNumber.value ? `+${floatNumber.value}` : "+0"}{" "}

            </div>
          ))}
        </Box>

        <div style={{ padding: '20px' }}>
          <EnergyBar energy={userData.energy} />
        </div>

      </Container>

      <img
        src={BackgroundEffect}
        style={{ position: "absolute", bottom: 0, width: "100%", zIndex: 5 }}
      />
    </article>
  )
}

export default App
