import React, {useEffect, useState} from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import memories from "./images/Memories.jpeg";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
import { getPosts } from "./actions/posts";

// Main component of our app
function App() {
  const [currentID, setcurrentID] = useState(null); // declare the current state in this component
  const classes = useStyles();
  const dispatch = useDispatch(); // Call the redux dispatch

  useEffect(() => {
    dispatch(getPosts());
  }, [currentID, dispatch]) // the getPosts will be dispatched each time the currentID change

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setcurrentID={setcurrentID}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentID={currentID} setcurrentID={setcurrentID}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
