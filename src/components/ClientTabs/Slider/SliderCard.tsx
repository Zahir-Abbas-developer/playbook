import React, { useState, useEffect } from "react";
import { Typography, Box, Button, TextField, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../../../utils/firebase";
import { setGrounds } from "../../../store/Slices/Playbook";
import { useAppSelector } from "../../../store";
import "./SliderCard.scss"
import { CollectionReference, collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";



const SliderCard = (props:any) => {
  const { setPostTitle, setPostId, setPreview, setBroadCast, setPostType } =
    props;

    const { grounds, }: any = useAppSelector((state:any) => state.playbook);
    const [deleteModal, setDeleteModal] = useState(false);
    const [values,setValues]=useState<any>(null);
    const [productsLoading, setProductsLoading] = useState<boolean>(false);


  const dispatch = useDispatch();

  const fetchGrounds = () => {
    const  locationCollection:CollectionReference=collection(firestore, "grounds");
    let baseQuery:any = locationCollection;
    if(values?.location) baseQuery =query(baseQuery,where("locationId",'==',values?.location));
    if(values?.slot) baseQuery =query(baseQuery,where("slots",'array-contains',values?.slot));
    console.log(baseQuery)
    setProductsLoading(true);
    onSnapshot(baseQuery, (snapshot:any) => {
      const groundsData: any = snapshot.docs.map((doc:any) => ({ id: doc.id, ...doc.data() }))
      console.log("grounds",groundsData)
      setProductsLoading(false);
      dispatch(setGrounds(groundsData))
    });
  };
  useEffect(() => {
     fetchGrounds();
  
  }, [values]);

  return (
    <>
    <Grid container>
      <Grid item lg={12}>
        <Box className="slider" sx={{ p: 1 }}>
          <Box className="slide-track">
            {grounds.map((item:any, index:any) => {
              return (
                <>
                  <Box className="slide" key={index}>
                    <Box sx={{ mt: 2, mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <img src={item?.thumbnail} />
                      </Box>
                      <Box
                        sx={{ display: "flex", justifyContent: "center" }}
                        style={{
                          backgroundImage: "url(/home/newsfeed/celeb2.gif)",
                          backgroundPosition: "center",
                          // backgroundSize: "cover",
                          backgroundSize: "350px 350px",
                        }}
                      >
                        <img
                          style={{ borderRadius: "50%" }}
                          width={100}
                          height={100}
                          src={
                            item?.thumbnail
                          }
                        />
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <img src={item?.thumbnail} />
                      </Box>
                      <Box sx={{ textAlign: "center", mt: 2, mb: 2 }}>
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            fontSize: "16px",
                            lineHeight: "24px",
                            textTransform: "capitalize",
                            color: "#4E4B66",
                          }}
                        >
                          {item?.personalInformation?.firstName}{" "}
                          {item?.personalInformation?.middleName}{" "}
                          {item?.personalInformation?.lastName}
                        </Typography>

                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            fontSize: "14px",
                            lineHeight: "22px",
                            color: "#4E4B66",
                          }}
                        >
                          {item?.departmentName}
                        </Typography>

                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            fontSize: "12px",
                            lineHeight: "24px",
                            opacity: 0.8,
                            color: "#4E4B66",
                          }}
                        >
                          {item?.dobday}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <button
                          style={{
                            borderRadius: "50px",
                            color: "#FCFCFC",
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            fontSize: "14px",
                            lineHeight: "22px",
                            padding: "10px 20px",
                            border: "transparent",
                            cursor: "pointer",
                            margin: "5px",
                            backgroundColor: item?.dobday
                              ? "#E54888"
                              : "#AE66BF",
                          }}
                          onClick={() => {
                            setPostTitle({
                              title: item?.dobday
                                ? "Send Wishes"
                                : "Congratulations",
                            });
                            setPostType("Broadcast");
                            setBroadCast("");
                            setPreview(1);
                            setPostId({
                              id: "",
                              typeOfPost: "",
                              attachment: "",
                            });
                          }}
                        >
                          {item?.dobday ? "Send Wishes" : "Congratulations"}
                        </button>
                      </Box>
                    </Box>
                  </Box>
                </>
              );
            })}
          </Box>
        </Box>
      </Grid>
    </Grid>
  </>
  );
};

export default SliderCard;
