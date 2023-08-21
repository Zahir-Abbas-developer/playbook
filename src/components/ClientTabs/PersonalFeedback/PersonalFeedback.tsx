import { useState, useEffect, Fragment } from "react";
import { Rating, Box, Divider, Grid, TextField, InputAdornment } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import dayjs from "dayjs";
import NoResult from "../../assets/common-images/svg/noresult.svg";
import { Send, Star } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

import "./feedback.scss";
import { ratingsData } from "../../../mock/RatingsDataAdmin";
const Feedback = () => {
  const [selectedRecord, setSelectedRecord] = useState<any>({});
  const [comment, setComment] = useState("");
  const [actionType, setActionType] = useState("new");
  const [commentId, setCommentId] = useState("");



  const tempArray = [
    { name: "My Accounts " },
    {
      name: "Dashboard ",
      onClickNavigateTo: "/",
    },
    { name: "/ Your Feedback" },
  ];
  const editHandler = (item: string, index: number) => {
    setComment(item);
    setActionType("edit");
  };
  const handleCommentSubmit = (e: any, id: string) => {
    e.preventDefault();
    if (comment !== "") {
      if (actionType === "new" || comment === "") {
    
        setComment("");
     
      }
      if (actionType === "edit") {
      
        setComment("");
       
        setActionType("new");
      }
    }
  };
  return (
    <>
      <Box className="feedback">
        <Box sx={{ fontSize: 20 }}>
         
        </Box>
        <Box className="main">
          <h3 className="grey-color fs-20 line-height-24 fw-700">Your Feedback</h3> <Divider sx={{ mb: 3 }} />
          <div className=" feedback_mesasges">
            {ratingsData?.map((obj: any, i: number) => {
              return (
                <Fragment key={i}>
                  { (
                    <Box className="feedback-card" key={uuidv4()}>
                      <Box className="head showComment">
                        <Box className="feedbackProfile ">
                          <Grid container alignItems="center">
                            <Grid item xs={4} sm={2} md={1} lg={1} xl={0.5} sx={{ width: "50%" }}>
                              <Box className="commentInfo">
                                {obj?.User?.imageId ? (
                                  <img src={`https://ppcn-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${obj?.User?.imageId}`} alt="user-img" />
                                ) : (
                                  <img src={`https://ui-avatars.com/api/?rounded=true&name=${obj?.User?.firstName} ${obj?.User?.lastName}`} alt="user-img" />
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={8} sm={6} md={9} lg={6} xl={5}>
                              <Box display="flex" sx={{ flexDirection: { sm: "row" }, alignItems: "center", gap: { xs: "4px", sm: "0px" }, height: "20px", mt: 2 }}>
                                <h4 className="fs-14 label-color font-weight-500">{obj?.User?.firstName + " " + obj?.User?.lastName}</h4>
                              </Box>
                              <p className="fs-12 fw-400 selected-field-color feedback_date">{dayjs(obj?.createdAt).format("DD/MM/YYYY")}</p>
                            </Grid>
                            <Grid container item xs={12} sm={4} md={10} lg={5} xl={6.5}>
                              <Grid container item xs={12}>
                                <Grid item xs={12}>
                                  <Rating
                                    sx={{ float: { xs: "left", md: "right" } }}
                                    name="size-medium"
                                    value={obj?.rating}
                                    readOnly
                                    emptyIcon={<Star sx={{ backgroundColor: "linear-gradient(136.4deg, #FAFF00 0%, #FACE02 102.56%)" }} />}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                      <p className="description selected-field-color"> {obj.feedback}</p>
                      <Box className="replySection">
                        <p className="fs-14">
                          Rating Type: <span className="selected-field-color"> {obj.ratingType}</span>
                        </p>
                        <Box
                          className="reply"
                          onClick={() => {
                            setSelectedRecord(obj);
                            setComment("");
                          }}
                        >
                          {obj.id !== selectedRecord.id && (
                            <>
                              <ReplyIcon className="selected-field-color" /> <p className="selected-field-color">Reply</p>
                            </>
                          )}
                        </Box>
                      </Box>
                      {obj.id === selectedRecord.id && (
                        <Box className="comment">
                          <Box className="showComment">
                            <Box className="replyArrow selected-field-color" onClick={() => setSelectedRecord("")} mb={2}>
                              <NavigateBeforeIcon /> <p>Reply</p>
                            </Box>
                            <Divider />
                            {obj?.comments?.map((item: any, index: any) => {
                              return (
                                <div key={index}>
                                  <Box className="commentInfo" display="flex">
                                    {item?.User?.imageId ? (
                                      <img src={`https://ppcn-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${item?.User?.imageId}`} alt="user-img" />
                                    ) : (
                                      <img src={`https://ui-avatars.com/api/?rounded=true&name=${item?.User?.firstName} ${item?.User?.lastName}`} alt="user-img" />
                                    )}
                                    <div className="profileInfo selected-field-color">
                                      <h4>{item?.User?.firstName + " " + item?.User?.lastName}</h4>{" "}
                                      <p>{dayjs(item?.createdAt).format("DD/MM/YYYY") + " " + dayjs(item?.createdAt).format("hh:mm a")}</p>
                                    </div>
                                  </Box>
                                  <p className="answer"> {item?.comment}</p>
                                  { (
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
                                  )}
                                </div>
                              );
                            })}
                            <Box display="flex" className="addComment">
                              {obj?.User?.imageId ? (
                                <img src={`https://ppcn-s3-public-dev-001.s3.eu-west-2.amazonaws.com/${obj?.User?.imageId}`} alt="user-img" />
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
                      )}
                    </Box>
                  )}
                </Fragment>
              );
            })}
            {/* {loadingStatus !== "succeeded" ? (
              <CardsApiLoader image="true" feedback />
            ) : (
              getCardsListData?.data?.length === 0 && (
                <Box sx={{ textAlign: "center" }}>
                  <img src={NoResult} alt="no feedback" height={250} width={250} /> <p className="disabled-color ">No Feedback Found</p>
                </Box>
              )
            )} */}
          </div>
        </Box>
      </Box>
    </>
  );
};
export default Feedback;
