import rssLogo from "../../data/assets/svg/rss.svg";
import footerStyles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={footerStyles.footerWrapper}>
      <a
        className={footerStyles.footer__linkToGh}
        href="https://github.com/chessdude1"
      >
        Github
      </a>
      <h2>2021</h2>
      <a href="https://rs.school/" target="blank">
         <img className={footerStyles.footer_rssLogo} src={rssLogo}></img>
      </a>
    </footer>
  );
};
