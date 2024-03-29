import style from "./page.module.css";
export default async function Home() {
  return (
    <div>
      <div className={style["main-container"]}>
        <div className={style["main-header"]}>
          <div>Get Feedback On Your Project</div>
        </div>
        <div className={style["sub-header"]}>
          <h4>
            Don't know if your work is any good, you've come to the right place
          </h4>
        </div>
      </div>
      <div>
        <div className={style["image-container"]}>
          <img
            className={style["display-image"]}
            src="/images/see-code.jpeg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
