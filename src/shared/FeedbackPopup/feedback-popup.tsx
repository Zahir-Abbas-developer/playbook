import React from "react";
import Button from "@mui/material/Button";
import { styled, Dialog, DialogContent, Box, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useFormik } from "formik";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useDispatch } from "react-redux";
// import { addFeedback } from "../../store/features/feedbackSlice/index";
import { useLocation } from "react-router-dom";


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
  open: boolean;

  setOpen: any;
}
interface IFeedbackPopup {
  open: boolean;
  setOpen: any;
  feedBack: any;
  ownerId?:any;
}
const FeedbackPopup = (props: IFeedbackPopup) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const ratingType = location.pathname;
  const feedbackType=ratingType==="/appeal-process"?"APPEAL":ratingType==="/pcn"?"PCN":ratingType==="/manage/manage-vehicles"?"VEHICLE":ratingType==="/personal-services"?"SERVICE":ratingType==="/my-vehicles"?"VEHICLE":"VEHICLE"

  const feedbackSubmit = () => {
    props.setOpen(false);
    if(values.ratingType!=="SERVICE"){
      delete values.ownerId}
    // dispatch(addFeedback(values));
    props.feedBack({
      message: "Feedback submitted successfully",
      isToggle: true,
      mode: "success",
    });
  };
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      ratingType: feedbackType,
      rating: 0,
      feedback: "",
      ownerId:props.ownerId
    
    },
    onSubmit: feedbackSubmit,
  });

  return (
    <Slide direction="up" in={props.open}>
      <div>
        <BootstrapDialog
          open={props.open}
          aria-labelledby="customized-dialog-title"
          TransitionComponent={Transition}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "400px",
                borderRadius: "10px",
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
                position: { sm: "fixed" },
                bottom: { sm: "50px" },
                right: { sm: "10px" },
              },
            },
          }}
        >
          <form onSubmit={handleSubmit}>
            <DialogContent
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ pb: 2, m: 0 }}
              >
                <IconButton
                  disableRipple
                  aria-label="close"
                  onClick={() => props.setOpen(false)}
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    color: "#434242",
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography
                sx={{
                  pt: "15px",
                  color: "$grey-color",
                  fontSize: "24px",
                  fontWeight: "500",
                }}
              >
                How was your experience?
              </Typography>
              <Rating
                sx={{ paddingBlock: "40px", fontSize: "40px" }}
                name="rating"
                value={Number(values.rating)}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                name="feedback"
                fullWidth
                rows={3}
                multiline
                size="small"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tell us about your experience..."
              />
              {(values.rating>0 || values.feedback.length>0) ? <Button
                disableRipple
                type="submit"
                className="btn-primary"
                sx={{
                  paddingInline: "20px",
                  textTransform: "capitalize",
                  float: "right",
                  marginTop: "30px",
                  
                }}
                autoFocus
                onClick={feedbackSubmit}
              >
                Submit
              </Button>:<Button
                disableRipple
                disabled
                className="btn-primary"
                sx={{
                  paddingInline: "20px",
                  textTransform: "capitalize",
                  float: "right",
                  marginTop: "30px",
                  
                }}
                autoFocus
              >
                Submit
              </Button>}
             
            </DialogContent>
          </form>
        </BootstrapDialog>
      </div>
    </Slide>
  );
};
export default FeedbackPopup;
