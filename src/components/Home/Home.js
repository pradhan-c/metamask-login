import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

function Home(props) {
  return (
    <Card className={classes.home}>
      <h1>You are logged in</h1>
      <p>{props.currentAccount}</p>
      
      <p>Network : {props.currentNetwork}</p>
    </Card>
  );
};
export default Home;