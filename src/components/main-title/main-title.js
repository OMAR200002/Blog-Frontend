import classes from "./main-title.module.css";
function MainTitle(props) {
  return (
    <div className={`${classes["main-title"]}`}>
      <h2>{props.title}</h2>
    </div>
  );
}

export default MainTitle;
