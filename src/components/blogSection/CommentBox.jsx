import { Box } from "@mui/material";


import CommentList from "./CommentList";
import CommentForm from "./CommentForm";


export default function CommentBox({ subjectId }) {

  

  // console.log(subjectId);

  return (
    <Box sx={{ width: "100%", maxWidth:"900px", display:"flex",flexDirection:"column", padding:"1rem"}}>
      <CommentList />
      <CommentForm/>
    </Box>
  );
}
