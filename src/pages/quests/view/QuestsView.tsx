import "@/shared/styles/global.scss"
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  Typography,
} from "@mui/material"
import IconCoin from "@/assets/icons-react/Coin"
import { useSelector } from "react-redux"
import { QuestsLogo } from "@/assets/icons-react/QuestsLogo"
import { Quest } from "@/features/quests/quests.types"

import IconPr from "@/assets/icons/tasks/Pr.png"
import IconFr from "@/assets/icons/tasks/Fr.png"
import IconYtb from "@/assets/icons/tasks/Ytb.png"
import IconTg from "@/assets/icons/tasks/Tg.png"

import { Fragment, useEffect, useState } from "react"
import { QuestCompleted } from "@/assets/icons-react/QuestCompleted"
import { QuestArrow } from "@/assets/icons-react/QuestArrow"
// import IconCoinBig from "@/assets/icons-react/CoinBig"
import { IconCloseModal } from "@/assets/icons-react/IconCloseModal"
import questDaily from "@/assets/questDaily.png"
import questDailyMedium from "@/assets/questDailyMedium.png"
import { IconCoinMedium } from "@/assets/icons-react/IconCoinMedium"

// @ts-ignore
const userData = window.Telegram.WebApp.initDataUnsafe;
// const userData = {
//   user: {
//     id: "6646659616",
//     username: 'travikvlad'
//   },
// }

const bonusesList = [200, 500, 1000, 1500, 2000, 3000, 1000, 1000, 1000]

const iconArray = [IconTg, IconYtb, IconFr, IconPr]

const Welcome = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
      alignItems: "center",
      paddingTop: "45px",
    }}
  >
    <QuestsLogo />
    <span
      style={{
        color: "white",
        fontSize: "32px",
        fontWeight: 700,
        textAlign: "center",
      }}
    >
      Заработай &nbsp; <br />
      <div className="gradient-stroke-text">больше монет!</div>
    </span>
  </Box>
)

const Bonuses = ({ title }: { title: string }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
      alignItems: "center",
      // paddingTop: '45px'
      // gap: 5,
      // paddingInline: 1,
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "80%",
        alignItems: "center",
        gap: 8,
      }}
    >
      {/* <Typography sx={{ fontWeight: '700', fontSize: 18, color: '#BAF266' }}>Бонусы</Typography> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: 1,
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "600",
            fontSize: 18,
            letterSpacing: "0.8px",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  </Box>
)


const QuestsEvents = ({
  setQuests,
  quests,
  title,
}: {
  setQuests: (val: any) => void,
  quests: Quest[]
  title: string
}) => {

  console.log('QUESTS?: ', quests)
  // @ts-ignore
  // const [questsList, setQuestsList] = useState(quests)

  const onClickQuest = async (idTelegram: string, idQuest: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/quest/${idTelegram}/${idQuest}`,
        {
          method: 'POST',
        })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const jsonData = await response.json()
      setQuests(jsonData.questsUsersJSON)

    } catch (err) {
    } finally {
    }
  }

  return <>
    <Box sx={{ display: "flex", gap: 1, flexDirection: "column", marginBottom: '8px' }}>
      <Bonuses title={title} />

      {Array.isArray(quests) && quests.length > 0 && quests?.map((quest: Quest, idx: number) => (
        <Fragment key={idx}>
          {
            quest.isCompleted ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  height: "95%",
                }}
              >
                <div
                  style={{ width: "80%", margin: "auto", padding: 1, height: 64 }}
                >
                  <div
                    style={{
                      backgroundColor: quest.isCompleted ? "#0D1D25" : "#182830",
                      borderRadius: 20,
                      height: 64,
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      border: '2px rgba(205, 254, 100, 0.20) solid',
                      borderBottom: 0,
                    }}
                  >
                    <Box
                      sx={{
                        margin: 1,
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <Avatar src={iconArray[idx]} />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            sx={{ fontSize: 12, color: "white", fontWeight: 400 }}
                          >
                            {quest.title}
                          </Typography>

                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <IconCoin width={25} height={25} />
                            <Typography sx={{ color: "white" }}>
                              +{quest.salary}
                            </Typography>
                          </Box>
                        </Box>

                      </Box>

                      {quest.isCompleted ? <QuestCompleted /> : <QuestArrow />}


                    </Box>
                  </div>
                </div>

              </Box>

            ) : (

              <Link onClick={() => onClickQuest(userData.user.id, quest.id)} href={quest.url} target="_blank"
                sx={{
                  textDecoration: 'none', // Убирает подчеркивание
                  color: 'inherit', // Убирает стандартный цвет
                  '&:focus': {
                    outline: 'none', // Убирает контур при фокусировке
                  },
                  '&:hover': {
                    textDecoration: 'none', // Убирает подчеркивание при наведении
                  },
                  '&:active': {
                    textDecoration: 'none', // Убирает подчеркивание при нажатии
                  },
                  '&:visited': {
                    textDecoration: 'none', // Убирает подчеркивание для посещённых ссылок
                  },
                }}
              >
                <div
                  style={{ width: "80%", margin: "auto", padding: 1, height: 64 }}
                >
                  <div
                    style={{
                      backgroundColor: quest.isCompleted ? "#0D1D25" : "#182830",
                      borderRadius: 20,
                      height: 64,
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      border: '2px rgba(205, 254, 100, 0.20) solid',
                      borderBottom: 0,
                    }}
                  >
                    <Box
                      sx={{
                        margin: 1,
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                        <Avatar src={iconArray[idx]} />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            sx={{ fontSize: 12, color: "white", fontWeight: 400 }}
                          >
                            {quest.title}
                          </Typography>

                          <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <IconCoin width={25} height={25} />
                            <Typography sx={{ color: "white", textDecoration: 'none', outline: 'none' }}>
                              +{quest.salary}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {quest.isCompleted ? <QuestCompleted /> : <QuestArrow />}


                    </Box>
                  </div>
                </div>

              </Link>
            )
          }
        </Fragment>)
      )}
    </Box>
  </>
}

function QuestsView() {
  const friends = useSelector((state: any) => state.quests)
  // const quests = useSelector((state: any) => state.quests)

  // @ts-ignore
  const [quests, setQuests] = useState([])

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/telegram/${userData.user.id}`)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const jsonData = await response.json()
        setQuests(jsonData.questsUsersJSON)
        return jsonData
      } catch (err) {
        // setError2(err)
      } finally {
        // setLoading(false)
      }
    }

    getUser()

  }, [])

  console.log("Quests: ", quests)
  console.log("FRIENDS: ", friends)

  const [isOpen2, setIsOpen2] = useState(false)


  const handleBackgroundClick = () => {
    setIsOpen2(state => !state)
    // if (isOpen) {
    //   setIsOpen(false)
    // } else if (isOpen2) {
    //   setIsOpen2(false)
    // }
  }

  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [counter, setCounter] = useState(0)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${import.meta.env.VITE_API_URL}/users/isDailyTaken/${userData.user.id}`)
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok")
  //       }
  //       const jsonData = await response.json()
  //       console.log('jsonData2: ', jsonData)
  //       setIsButtonDisabled(jsonData)
  //       // setCardsList(jsonData)
  //       return jsonData
  //     } catch (err) {
  //       // setError2(err)
  //     } finally {
  //       // setLoading(false)
  //     }
  //   }

  //   fetchData()
  // }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/isDailyTaken/${userData.user.id}`)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const jsonData = await response.json()
        console.log('jsonData2: ', jsonData)
        setIsButtonDisabled(jsonData.isDailyTaken)
        setCounter(jsonData.counter)

        // setCardsList(jsonData)
        return jsonData
      } catch (err) {
        // setError2(err)
      } finally {
        // setLoading(false)
      }
    }

    fetchData()
  }, [])



  const onClickClaim = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/dailyQuest/${userData.user.id}`, { method: 'POST' })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const jsonData = await response.json()
      console.log('jsonData2: ', jsonData)
      setIsButtonDisabled(true)
      handleBackgroundClick()
      // setCardsList(jsonData)
      return jsonData
    } catch (err) {
      // setError2(err)
    } finally {
      // setLoading(false)
    }
  }

  return (
    <Box className="main-bg" sx={{ height: '100%', overflowY: 'auto' }}>
      <Welcome />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>

        </Box>

        <Button
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            height: "95%",
            textTransform: 'none'
          }}
          onClick={() => setIsOpen2(true)}
        >
          <div
            style={{ width: "80%", margin: "auto", padding: 1, height: 64 }}
          >
            <div
              style={{
                backgroundColor: "#182830",
                borderRadius: 20,
                height: 64,
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                border: '2px rgba(205, 254, 100, 0.20) solid',
                borderBottom: 0,
              }}
            >
              <Box
                sx={{
                  margin: 1,
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                  <Avatar src={questDailyMedium} />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{ fontSize: 12, color: "white", fontWeight: 400 }}
                    >
                      Ежедневная награда
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <IconCoin width={25} height={25} />
                      <Typography sx={{ color: "white" }}>
                        +{bonusesList[counter]}
                      </Typography>
                    </Box>
                  </Box>

                </Box>

                <QuestArrow />


              </Box>
            </div>
          </div>

        </Button>

        {/* {Array.isArray(quests) && quests.length > 0 &&
          <QuestsEvents
            quests={quests}
            title="Ежедневные награды"
            setQuests={setQuests}
          />
        } */}
        <QuestsEvents quests={quests} title="Список заданий" setQuests={setQuests} />

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
                <IconCloseModal style={{ width: "24px", height: "24px", zIndex: 10, color: 'white' }} />
              </IconButton>
            </Box>

            <Box
              sx={{
                paddingInline: "35px",
                gap: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: 'center',
                height: "80vh",
              }}
            >

              <img src={questDaily} style={{ width: '74px', height: '74px' }} />

              <div className="gradient-stroke-text" style={{ textAlign: 'center', fontSize: '24px', fontWeight: '800' }}>Ежедневный<br />бонус</div>
              <div className="" style={{ textAlign: 'center', width: '80%' }}>Забирайте бонусы за посещение игры. Нажимайте кнопку каждый день, чтобы счётчик не обнулялся.</div>
              <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1, justifyContent: 'center', alignItems: 'center' }}>
                {[...new Array(9)].map((_: any, idx: number) =>

                  <div className={idx <= counter ? "gradient-border-only" : "day-button-unactive"} key={idx} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
                    <span className="day-one-title">День {idx + 1}</span>
                    <IconCoinMedium />
                    <span className="day-one-salary">+{bonusesList[idx]}</span>
                  </div>

                )}
              </Box>


              {/* <div className="take-bonus">Забирайте бонусы за посещение игры. Нажимайте кнопку каждый день, чтобы счётчик не обнулялся. */}
              {/* </div> */}
              {/* <div className="day-button">asd</div> */}
              {/* <div className="gradient-stroke-text">Your Text Here</div> */}
              {/* <DayButton /> */}
              {/* <div className="gradient-stroke-border">Your Content Here</div> */}
              {/* <div className="gradient-stroke-border2">Your Content Here</div> */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  fontWeight: "600",
                  borderRadius: "16px",
                  fontSize: "18px",
                  letterSpacing: "1px",
                  wordWwrap: "break-word",
                  textTransform: "none",
                  padding: "16px 0",
                  marginBottom: '24px',
                  boxShadow: "-2px -2px 2px rgba(0, 0, 0, 0.25) inset",
                  background: "linear-gradient(45deg, #1d9988 0%, #5B5EF3 100%)",
                }}
                // Закрытие при нажатии на кнопку
                // onClick={handleButtonClick}
                onClick={onClickClaim}
                disabled={isButtonDisabled}
              >
                Забрать монеты
              </Button>

            </Box>
          </Box>
        </Box>

      </Box>
    </Box >
  )
}

export default QuestsView
