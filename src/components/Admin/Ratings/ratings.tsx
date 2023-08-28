import { useEffect, useState } from "react";
import { Rating, Box, Divider, Grid, LinearProgress, TextField, InputAdornment } from "@mui/material";
import { Send, Star } from "@mui/icons-material";
import ReplyIcon from "@mui/icons-material/Reply";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import dayjs from "dayjs";
import NoResult from "../../assets/common-images/svg/noresult.svg";
import { v4 as uuidv4 } from "uuid";
import "./ratings.scss";
import { ratingsData } from "../../../mock/RatingsDataAdmin";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { firestore } from "../../../utils/firebase";
import { orderBy } from "lodash";


const Feedback = () => {
  const { id } = useParams()
  const [ratingsList, setRatingList] = useState<any>([])
  const tempArray = [
    { name: "Ratings & Feedback  " },
    {
      name: "Dashboard ",
      onClickNavigateTo: "/",
    },
    { name: "/ Customers Feedback" },
  ];

  const [actionType, setActionType] = useState("new");
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<any>({});


  useEffect(() => {
    if (id)
      fetchRatings()
  }, [])

  const fetchRatings = async () => {
    try {
      const ratingsRef = collection(firestore, `grounds/${id}/reviews`);
      getDocs(ratingsRef).then(async (snapshot) => {
        const list: any = []
        for await (let docsData of snapshot.docs) {
          const userData = await getDoc(doc(firestore, "users", docsData.id));
          list.push({
            id: docsData.id, ...docsData.data(), userData: userData.data()
          })
        }
        setRatingList(list)
      })
    } catch (err) {
      console.log("Error", err)
    }
  }

  const editHandler = (item: string, index: number) => {
    setComment(item);
    setActionType("edit");
  };
  const handleCommentSubmit = (e: any, id: string) => {
    e.preventDefault();

  };
  //  to find the lenth of arry object


  return (
    <>
      <Box className="feedback-system-admin feedback">
        <Box sx={{ fontSize: 20 }}>

        </Box>
        <Box className="main border-radius-10" sx={{ py: 2 }}>
          <Box sx={{ px: 4 }}>
            <h3 className="grey-color fs-20 line-height-24 fw-700" style={{ margin: 0 }}>
              Customers Feedback
            </h3>
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Box>
            <Grid container justifyContent="space-between">
              <Grid item xs={12} sm={4} md={3} p={4} minHeight="80vh" borderRight="1px solid rgba(0, 0, 0, 0.12)">
                {/* {loadingStatus === "succeeded" && (
                  <div className="main_rating_display">
                    <h2 className="fw-700 grey-color ">{avgTwoplacdecimel}</h2> <h4 className="fs-20 fw-500 label-color">based on {cardsList?.length} ratings</h4>
                    <Box className="stars">
                      <Rating name="size-medium" value={avg} readOnly emptyIcon={<Star />} sx={{ mt: 1 }} />
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      {ratingStars?.map((number: any, index: any) => (
                        <Box display="flex" alignItems="center" mt={2} className="rating_graph_dispaly_MAIN" key={uuidv4()}>
                          <span className="fs-18 selected-field-color starCounter">{number?.rating} stars</span>
                          <LinearProgress variant="determinate" value={percentRating(number?.rating)} sx={{ maxWidth: "250px", width: "100%", backgroundColor: "#fff", height: "20px" }} />
                        </Box>
                      ))}
                    </Box>
                  </div>
                )} */}

              </Grid>
              <Grid item xs={12} sm={8} md={9} lg={9} sx={{ marginLeft: { xs: "13px", sm: "0px" }, pl: { md: 4, sm: 2.5 }, pt: 2 }}>
                <div className="feedBack_lenth_main_wraper">
                  <h4 className="fw-500 fs-20 label-color" style={{ marginBottom: "15px" }}>
                    Feedback
                  </h4>

                </div>
                <div className=" feedback_mesasges">
                  {ratingsList?.map((obj: any, i: number) => {
                    return (
                      <>
                        {(
                          <Box className="feedback-card comment border-radius-8" key={uuidv4()} mb={2} p="14px 20px">
                            <Box className="head showComment">
                              <Box className="feedbackProfile ">
                                <Grid container alignItems="center">
                                  <Grid item xs={2} sm={2} md={1} lg={1} xl={0.7} sx={{ width: "50%" }}>
                                    <Box className="commentInfo" display="flex">
                                      {obj?.User?.imageId ? (
                                        <img src={process.env.REACT_APP_AWS_BASE_URL + obj?.User?.imageId} alt="user-img" />
                                      ) : (
                                        <img src={`https://ui-avatars.com/api/?rounded=true&name=${obj?.userData?.username}`} alt="user-img" />
                                      )}
                                    </Box>
                                  </Grid>
                                  <Grid item xs sm={10} md={9} lg={6} xl={5}>
                                    <Box display="flex" sx={{ flexDirection: { sm: "row" }, alignItems: "center", gap: { xs: "4px", sm: "0px" } }}>
                                      <h4 className="font-size-24 font-weight-500" style={{ marginBottom: "0px" }}>
                                        {obj?.userData?.username}
                                      </h4>
                                      <p className="account_usertype fs-12 fw-400 grey-color" style={{ marginTop: "22px" }}>
                                        {obj?.userData?.role} Account
                                      </p>
                                    </Box>
                                    <p className="fs-12 fw-400 selected-field-color feedback_date">{dayjs.unix(obj?.createdAt?.seconds).format("DD/MM/YYYY")}</p>
                                  </Grid>
                                  <Grid container item xs={12} md={10} lg={5} xl={6}>
                                    <Grid container item xs={12}>
                                      <Grid item xs={12}>
                                        <Rating sx={{ float: { xs: "left", md: "right" } }} name="size-medium" value={obj?.rating} readOnly emptyIcon={<Star />} />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Box>
                            <p className="description selected-field-color fs-14"> {obj?.feedback}</p>
                            {/* <Box className="replySection" display="flex" justifyContent="space-between" alignItems="center">
                              <p className="fs-14 fw-400">
                                Rating Type:
                                <span className="selected-field-color" style={{ paddingLeft: "6px" }}>
                                  {obj?.ratingType}
                                </span>
                              </p>
                              <Box
                                className="cursor-pointer"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                onClick={() => {
                                  setSelectedRecord(obj);
                                  setComment("");
                                }}
                              >
                                {obj?.id !== selectedRecord?.id && (
                                  <>
                                    <ReplyIcon className="selected-field-color" /> <p className="selected-field-color">Reply</p>
                                  </>
                                )}
                              </Box>
                            </Box>
                            {obj?.id === selectedRecord?.id && (
                              <Box className="comment">
                                <Box className="showComment">
                                  <Box display="flex" mb={2} className="replyArrow selected-field-color" onClick={() => setSelectedRecord("")}>
                                    <NavigateBeforeIcon /> <p className="m-0">Reply</p>
                                  </Box>
                                  <Divider />
                                  {
                                    obj?.comments?.length > 0 &&
                                    obj?.comments?.map((item: any, index: any) => {
                                      return (
                                        <>
                                          <div key={index}>
                                            <Box className="commentInfo " sx={{ display: "flex" }}>
                                              {item?.User?.imageId ? (
                                                <img src={process.env.REACT_APP_AWS_BASE_URL + item?.User?.imageId} alt="user-img" />
                                              ) : (
                                                <img src={`https://ui-avatars.com/api/?rounded=true&name=${item?.User?.firstName} ${item?.User?.lastName}`} alt="user-img" />
                                              )}
                                              <Box sx={{ paddingLeft: "15px", display: "flex", gap: 2 }} className="profileInfo selected-field-color">
                                                <h4>{item?.User?.firstName + " " + item?.User?.lastName}</h4>
                                                <p style={{ marginTop: "20px" }}>{dayjs(item?.createdAt).format("DD/MM/YYYY") + "  " + dayjs(item?.createdAt).format("hh:mm a")} </p>
                                              </Box>
                                            </Box>
                                            <p className="answer"> {item?.comment}</p>
                                            <Box className="btnDiv">
                                              <button
                                                className="selected-field-color"
                                                onClick={() => {
                                                  setCommentId(item?.id);

                                                  editHandler(item.comment, index);

                                                  setActionType("edit");
                                                }}
                                              >
                                                Edit
                                              </button>
                                              <button
                                                className="selected-field-color"

                                              >
                                                Delete
                                              </button>
                                            </Box>
                                          </div>
                                        </>
                                      );
                                    })}
                                  <Box display="flex" className="addComment">
                                    {obj?.User?.imageId ? (
                                      <img src={process.env.REACT_APP_AWS_BASE_URL + obj?.User?.imageId} alt="user-img" />
                                    ) : (
                                      <img src={`https://ui-avatars.com/api/?rounded=true&name=${obj?.User?.firstName} ${obj?.User?.lastName}`} alt="user-img" />
                                    )}
                                    <form onSubmit={(e) => handleCommentSubmit(e, obj.id)}>
                                      <TextField
                                        sx={{ marginLeft: "10px" }}
                                        autoFocus
                                        InputProps={{
                                          endAdornment: (
                                            <InputAdornment position="end">
                                              <Send onClick={(e: any) => handleCommentSubmit(e, obj.id)} sx={{ cursor: "pointer" }} />
                                            </InputAdornment>
                                          ),
                                        }}
                                        fullWidth
                                        size="small"
                                        placeholder="Add a comment"
                                        value={comment}
                                        onChange={(e) => {
                                          setComment(e.target.value);
                                        }}
                                      />
                                    </form>
                                  </Box>
                                </Box>
                              </Box>
                            )} */}
                          </Box>
                        )}
                      </>
                    );
                  })}
                  {/* {loadingStatus !== "succeeded" ? (
                    <CardsApiLoader image="true" feedback />
                  ) : (
                    getCardsListData?.length === 0 && (
                      <Box sx={{ textAlign: "center" }}>
                        <img src={NoResult} alt="feedback" height={200} width={200} /> <p className="disabled-color">No Feedback Results</p>
                      </Box>
                    )
                  )} */}
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Feedback;
