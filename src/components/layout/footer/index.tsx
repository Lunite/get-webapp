import React, { FunctionComponent } from "react"

import "./styles.scss"
import { Link } from "gatsby"

const Footer: FunctionComponent<Linkny> = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <Link
            className="block-cta  block-cta--primary visible-xs"
            to="/quote"
          >
            Get a Quote Today
          </Link>

          <div className="footer__logo">
            <svg
              className="logo"
              width="100%"
              height="100%"
              viewBox="0 0 132 90"
              fill="none"
            >
              <g className="logo__words">
                <path
                  d="M0.162109 60.6516C0.162109 57.0939 2.77591 54.4805 6.47899 54.4805C9.36492 54.4805 11.5795 56.0594 12.4326 58.455H10.3815C9.69183 57.0576 8.29406 56.1866 6.47905 56.1866C3.84691 56.1866 2.0319 58.074 2.0319 60.6515C2.0319 63.2289 3.84691 65.117 6.47905 65.117C8.6389 65.117 10.2365 64.0273 10.7991 62.0492H5.75255V60.3432H12.7775V61.2507C12.5054 64.4998 9.9639 66.8231 6.47899 66.8231C2.77591 66.8231 0.162109 64.2094 0.162109 60.6517"
                  fill="white"
                ></path>
                <path
                  d="M14.5021 54.7163H19.6026C22.5249 54.7163 23.7956 56.332 23.7956 58.5281C23.7956 60.3071 22.9605 61.7046 21.0911 62.1765L24.2312 66.5872H22.0165L19.1849 62.3398H16.3533V66.5872H14.502L14.5021 54.7163ZM19.6206 60.6336C21.3449 60.6336 21.9259 59.7261 21.9259 58.5281C21.9259 57.3121 21.3269 56.4226 19.6206 56.4226H16.3534V60.6336H19.6206Z"
                  fill="white"
                ></path>
                <path
                  d="M25.8828 54.7163H34.6137V56.4227H27.7345V59.6898H33.561V61.3962H27.7345V64.8812H34.6137V66.5873H25.8828V54.7163Z"
                  fill="white"
                ></path>
                <path
                  d="M36.665 54.7163H45.3959V56.4227H38.5164V59.6898H44.3432V61.3962H38.5164V64.8812H45.3959V66.5873H36.665V54.7163Z"
                  fill="white"
                ></path>
                <path
                  d="M47.1738 59.3992C47.1738 56.3865 48.9708 54.4805 52.1836 54.4805C55.4147 54.4805 57.2118 56.3866 57.2118 59.3992V66.5872H55.36V59.3992C55.36 57.4031 54.2711 56.1868 52.1836 56.1868C50.1145 56.1868 49.0255 57.4031 49.0255 59.3992V66.5872H47.1738V59.3992Z"
                  fill="white"
                ></path>
                <path
                  d="M64.2002 54.7163H72.9311V56.4227H66.0519V59.6898H71.8784V61.3962H66.0519V64.8812H72.9311V66.5873H64.2002V54.7163Z"
                  fill="white"
                ></path>
                <path
                  d="M74.71 59.3992C74.71 56.3865 76.507 54.4805 79.7198 54.4805C82.9509 54.4805 84.7475 56.3866 84.7475 59.3992V66.5872H82.8962V59.3992C82.8962 57.4031 81.8073 56.1868 79.7198 56.1868C77.6506 56.1868 76.5613 57.4031 76.5613 59.3992V66.5872H74.71V59.3992Z"
                  fill="white"
                ></path>
                <path
                  d="M86.9072 54.7163H95.6381V56.4227H88.7586V59.6898H94.5854V61.3962H88.7586V64.8812H95.6381V66.5873H86.9072V54.7163Z"
                  fill="white"
                ></path>
                <path
                  d="M97.6895 54.7163H102.79C105.713 54.7163 106.983 56.332 106.983 58.5281C106.983 60.3071 106.148 61.7046 104.279 62.1765L107.419 66.5872H105.204L102.373 62.3398H99.5412V66.5872H97.6895V54.7163ZM102.808 60.6336C104.533 60.6336 105.114 59.7261 105.114 58.5281C105.114 57.3121 104.514 56.4226 102.808 56.4226H99.5411V60.6336H102.808Z"
                  fill="white"
                ></path>
                <path
                  d="M108.398 60.6516C108.398 57.0939 111.012 54.4805 114.715 54.4805C117.601 54.4805 119.816 56.0594 120.669 58.455H118.618C117.928 57.0576 116.53 56.1866 114.715 56.1866C112.083 56.1866 110.268 58.074 110.268 60.6515C110.268 63.2289 112.083 65.117 114.715 65.117C116.875 65.117 118.473 64.0273 119.035 62.0492H113.989V60.3432H121.014V61.2507C120.742 64.4998 118.2 66.8231 114.715 66.8231C111.012 66.8231 108.398 64.2094 108.398 60.6517"
                  fill="white"
                ></path>
                <path
                  d="M125.407 61.5052L120.706 54.7163H122.92L126.333 59.8894L129.764 54.7163H131.923L127.259 61.4508V66.5869H125.407V61.5052Z"
                  fill="white"
                ></path>
                <path
                  d="M5.55421 75.2293H0.239258V72.8159H13.5139V75.2293H8.17323V89.6085H5.55421V75.2293Z"
                  fill="white"
                ></path>
                <path
                  d="M13.9766 81.2119C13.9766 76.1795 17.674 72.4824 22.9122 72.4824C28.1503 72.4824 31.8478 76.1795 31.8478 81.2119C31.8478 86.245 28.1504 89.942 22.9122 89.942C17.674 89.942 13.9766 86.2449 13.9766 81.2119ZM29.2029 81.2119C29.2029 77.566 26.6354 74.8954 22.9122 74.8954C19.189 74.8954 16.6211 77.5659 16.6211 81.2119C16.6211 84.8585 19.189 87.5287 22.9122 87.5287C26.6354 87.5287 29.203 84.8585 29.203 81.2119"
                  fill="white"
                ></path>
                <path
                  d="M33.5938 81.2119C33.5938 76.1795 37.2912 72.4824 42.529 72.4824C46.6119 72.4824 49.7445 74.7155 50.9514 78.105H48.0499C47.0739 76.1283 45.0969 74.8954 42.5289 74.8954C38.8061 74.8954 36.2382 77.5659 36.2382 81.2119C36.2382 84.8585 38.8061 87.5287 42.5289 87.5287C45.5847 87.5287 47.8444 85.988 48.64 83.1893H41.5022V80.776H51.4392V82.0594C51.0541 86.6555 47.459 89.942 42.529 89.942C37.2912 89.942 33.5938 86.2449 33.5938 81.2119Z"
                  fill="white"
                ></path>
                <path
                  d="M53.8789 72.8159H66.2297V75.2293H56.4979V79.8514H64.7402V82.2647H56.4979V87.1948H66.2297V89.6085H53.8789V72.8159Z"
                  fill="white"
                ></path>
                <path
                  d="M73.4198 75.2293H68.1045V72.8159H81.3792V75.2293H76.0388V89.6085H73.4198V75.2293Z"
                  fill="white"
                ></path>
                <path
                  d="M83.793 72.8159H86.412V79.8768H95.7842V72.8159H98.4033V89.6085H95.7842V82.2908H86.412V89.6085H83.793V72.8159Z"
                  fill="white"
                ></path>
                <path
                  d="M101.844 72.8159H114.195V75.2293H104.463V79.8514H112.705V82.2647H104.463V87.1948H114.195V89.6085H101.844V72.8159Z"
                  fill="white"
                ></path>
                <path
                  d="M117.097 72.8159H124.312C128.446 72.8159 130.243 75.1011 130.243 78.208C130.243 80.7244 129.062 82.7014 126.417 83.3691L130.86 89.6083H127.727L123.721 83.6003H119.716V89.6083H117.097V72.8159ZM124.338 81.1864C126.777 81.1864 127.599 79.9023 127.599 78.208C127.599 76.4872 126.751 75.2292 124.338 75.2292H119.716V81.1864H124.338Z"
                  fill="white"
                ></path>
              </g>

              <path
                d="M15.9083 29.1655C15.9083 24.3529 19.4438 20.8174 24.4526 20.8174C28.3321 20.8174 31.3765 22.9535 32.5061 26.1697H30.5662C29.535 23.9109 27.3005 22.4377 24.4526 22.4377C20.4503 22.4377 17.676 25.286 17.676 29.1655C17.676 33.045 20.4503 35.893 24.4526 35.893C27.9391 35.893 30.4681 33.9284 31.1063 30.7368H23.4457V29.1161H32.9724V29.9511C32.6041 34.3461 29.191 37.5133 24.4525 37.5133C19.4437 37.5133 15.9082 33.9778 15.9082 29.1655"
                fill="white"
              ></path>
              <path
                d="M60.0684 21.4556H71.8536V23.0762H61.8365V28.5513H70.4298V30.172H61.8365V35.8926H71.8536V37.5133H60.0684V21.4556Z"
                fill="white"
              ></path>
              <path
                d="M105.737 23.0762H100.286V21.4556H112.955V23.0762H107.505V37.5133H105.737V23.0762Z"
                fill="white"
              ></path>
              <path
                d="M0.881944 19.2457L0.373771 18.5249L24.9913 1.16154C25.1416 1.05524 25.3215 0.998755 25.5056 1.00002C25.6897 1.00129 25.8688 1.06024 26.0176 1.16859L50.2407 18.7461C50.3535 18.8278 50.4453 18.9351 50.5086 19.0592C50.5719 19.1833 50.6048 19.3206 50.6047 19.4599V47.8381C50.6047 48.072 50.5118 48.2963 50.3464 48.4617C50.181 48.6271 49.9567 48.72 49.7228 48.72H0.881944C0.648038 48.72 0.423714 48.6271 0.258318 48.4617C0.0929209 48.2963 0 48.072 0 47.8381V19.2458C0.00015137 19.1045 0.0341574 18.9654 0.0991649 18.84C0.164172 18.7146 0.258287 18.6066 0.373626 18.525L0.881944 19.2458H1.76389V46.9561H48.8407V19.9096L25.4922 2.96677L1.3904 19.9664L0.882052 19.2457H0.881944Z"
                fill="white"
              ></path>
              <path
                d="M82.2003 19.2461L81.692 18.5254L106.31 1.16203C106.46 1.05573 106.64 0.999243 106.824 1.00051C107.008 1.00177 107.187 1.06073 107.336 1.16908L131.559 18.7466C131.672 18.8283 131.764 18.9356 131.827 19.0597C131.89 19.1838 131.923 19.3211 131.923 19.4604V47.8386C131.923 48.0725 131.83 48.2968 131.665 48.4622C131.499 48.6276 131.275 48.7205 131.041 48.7205H82.2003C81.9664 48.7205 81.7421 48.6276 81.5767 48.4622C81.4113 48.2968 81.3184 48.0725 81.3184 47.8386V19.2463C81.3185 19.105 81.3525 18.9659 81.4175 18.8405C81.4825 18.7151 81.5766 18.6071 81.692 18.5255L82.2003 19.2463H83.0822V46.9566H130.159V19.91L106.81 2.96715L82.7087 19.9668L82.2003 19.2461H82.2003Z"
                fill="white"
              ></path>
              <path
                d="M41.541 19.2457L66.1586 1.88232L90.3817 19.4598V47.838H41.541V19.2457Z"
                stroke="white"
                strokeWidth="2.11667"
                strokeLinecap="square"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>

          <Link
            className="block-cta  block-cta--primary block-cta--right hidden-xs"
            to="/quote"
          >
            Get a Quote Today
          </Link>
        </div>
      </div>
      <div className="footer__middle">
        <div className="container">
          <div className="row">
            <div className="col-3  ">
              <h2 className="heading heading--2   footer__column-heading">
                GET UK
              </h2>
              <div className="footer__item">
                <span>
                  Green Energy Together
                  <span style={{ position: "relative", paddingLeft: "34px" }}>
                    <span className="icon icon-pin "></span>8 Peerglow Center,
                    <br />
                    Marsh Lane Ware,
                    <br />
                    Hertfordshire
                    <br />
                    SG12 9QL
                    <br />
                    VAT 292 7158 75
                  </span>
                </span>
                <span>
                  <a
                    href="tel:02039954422"
                    style={{
                      position: "relative",
                      paddingLeft: "34px",
                      display: "block",
                    }}
                  >
                    <span className="icon icon-phone "></span>020 3995 4422
                  </a>
                </span>
              </div>
            </div>
            <div className="col-3  ">
              <h2 className="heading heading--2   footer__column-heading">
                Services
              </h2>
              <Link className="footer__item" to="/service/asset-management/">
                Asset Management
              </Link>
              <Link
                className="footer__item"
                to="/service/operation-maintenance/"
              >
                Operation &amp; Maintenance
              </Link>
              <Link
                className="footer__item"
                to="/service/industrial-commercial-solutions/"
              >
                Industrial &amp; Commercial Solutions
              </Link>
              <Link className="footer__item" to="/service/technical-design/">
                Technical design
              </Link>
            </div>
            <div className="col-3  ">
              <h2 className="heading heading--2   footer__column-heading">
                Case Studies
              </h2>
              <Link
                className="footer__item"
                to="/project/no-surprises-and-just-happy-with-the-results/"
              >
                Mr. Weiss
              </Link>
              <Link
                className="footer__item"
                to="/project/prompt-with-setup-and-quick-with-installation/"
              >
                Mr. Jones
              </Link>
              <Link
                className="footer__item"
                to="/project/smooth-nice-and-fast/"
              >
                Mrs. Farcasan
              </Link>
              <Link className="footer__item" to="/project/sevenoaks-home/">
                Mr. Wakefield
              </Link>
              <Link
                className="footer__item"
                to="/project/very-happy-with-the-system-we-purchased/"
              >
                Mr. Gilder
              </Link>
              <Link
                className="footer__item"
                to="/project/“a-fuss-free-experience”/"
              >
                Mrs. Neil
              </Link>
            </div>
            <div className="col-3  ">
              <h2 className="heading heading--2   footer__column-heading">
                Company
              </h2>
              <Link className="footer__item" to="/contact-us">
                Contact Us
              </Link>
              <Link className="footer__item" to="/faq">
                Support and FAQ
              </Link>
              <Link className="footer__item" to="/for-your-business">
                For Your Business
              </Link>
              <Link className="footer__item" to="/quote">
                Get a Quote
              </Link>
              <Link className="footer__item" to="/products-warranties">
                Products &amp; Warranties
              </Link>
              <Link className="footer__item" to="/projects">
                Case Studies
              </Link>
              <Link className="footer__item" to="/about-us/">
                About Us
              </Link>
              <Link className="footer__item" to="/privacy">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container right">
          <span className="u-font--xsmall u-font--muted">
            © GET - Green Energy Together - 2020
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
