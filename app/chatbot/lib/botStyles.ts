//rsc-container
const styleTheme = {
  boxShadow: "none",
  width: "auto",
  height: "95vh",
  minWidth: "100%",
  zIndex: "1",
};

//rsc-content
const contentTheme = {
  height: "100%",
  minWidth: "100%",
};

const bubbleTheme = {
  backgroundColor: "#065f46",
  color: "white",
  fontSize: "1rem",
  fontWeight: "thin",
  fontFamily: "verdana",
  marginTop: "1px",
};

const bubbleOptionTheme = {
  cursor: "pointer",
  backgroundColor: "#16a34a",
  color: "white",
  fontSize: "1rem",
  fontFamily: "verdana",
  marginTop: "10px",
};

const footerTheme = {
  display: "none",
  height: "0px",
};

const inputTheme = {
  display: "none",
};

export const botStyles = {
  style: styleTheme,
  contentStyle: contentTheme,
  bubbleStyle: bubbleTheme,
  bubbleOptionStyle: bubbleOptionTheme,
  footerStyle: footerTheme,
  inputStyle: inputTheme,
  hideHeader: true,
  hideSubmitButton: true,
  botAvatar:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' version='1.0' viewBox='0 0 375 375'%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath d='M32.25 0h310.5C360.563 0 375 14.438 375 32.25v310.5c0 17.813-14.438 32.25-32.25 32.25H32.25C14.437 375 0 360.562 0 342.75V32.25C0 14.437 14.438 0 32.25 0'/%3E%3C/clipPath%3E%3CclipPath id='b'%3E%3Cpath d='M52.063 110H275v215.883H52.062Zm0 0'/%3E%3C/clipPath%3E%3CclipPath id='c'%3E%3Cpath d='M101 58.133h221.813V276H101Zm0 0'/%3E%3C/clipPath%3E%3C/defs%3E%3Cpath fill='%23fff' d='M-37.5-37.5h450v450h-450z'/%3E%3Cpath fill='%23fff' d='M-37.5-37.5h450v450h-450z'/%3E%3Cpath fill='%23fff' d='M-37.5-37.5h450v450h-450z'/%3E%3Cg clip-path='url(%23a)'%3E%3Cpath fill='%232d882d' d='M-37.5-37.5h450v450h-450z'/%3E%3C/g%3E%3Cpath fill='%23fff' d='M272.844 224.352v35.304c0 10.34-8.387 18.727-18.73 18.727h-145.75a11.49 11.49 0 0 0-8.16 3.375L58.59 323.375c-1.574 1.578-4.278.465-4.278-1.77V133.883c0-11.903 9.653-21.555 21.56-21.555h37.25Zm0 0'/%3E%3Cg clip-path='url(%23b)'%3E%3Cpath fill='%23545454' d='M56.816 325.867a4.454 4.454 0 0 1-1.632-.324 4.24 4.24 0 0 1-2.63-3.938V133.883c0-12.86 10.454-23.313 23.317-23.313h37.797l.453.325 160.48 112.558v36.215c0 11.297-9.187 20.484-20.488 20.484h-145.75a9.689 9.689 0 0 0-6.922 2.871l-41.613 41.59a4.25 4.25 0 0 1-3.012 1.254Zm19.055-211.781c-10.922 0-19.8 8.879-19.8 19.797v187.722c0 .434.28.618.464.688a.72.72 0 0 0 .817-.168l41.613-41.605a13.203 13.203 0 0 1 9.414-3.899h145.746c9.36 0 16.973-7.61 16.973-16.965v-34.39l-158.54-111.18Zm0 0'/%3E%3C/g%3E%3Cpath fill='%23fff' d='m272.844 224.352 42.89 48.613c1.66 1.887 4.786.703 4.786-1.817V80.938c0-11.622-9.43-21.047-21.051-21.047h-178.82c-9.426 0-17.055 7.64-17.055 17.05v35.387Zm0 0'/%3E%3Cg clip-path='url(%23c)'%3E%3Cpath fill='%23545454' d='M317.777 275.652a4.484 4.484 0 0 1-3.351-1.52l-42.738-48.429-169.852-112.418V76.957c-.016-10.383 8.43-18.824 18.812-18.824H299.48c12.582 0 22.813 10.226 22.813 22.804v190.227a4.476 4.476 0 0 1-2.898 4.207 4.998 4.998 0 0 1-1.618.281ZM105.34 111.387l168.672 111.629 43.047 48.78a.944.944 0 0 0 1.07.267c.18-.07.633-.31.633-.915V80.938c0-10.637-8.657-19.29-19.293-19.29h-178.82c-8.442 0-15.297 6.868-15.297 15.309v34.43Zm0 0'/%3E%3C/g%3E%3Cpath fill='%238c8' d='M272.844 225.156H127.488c-13.199 0-23.91-10.707-23.91-23.906v-88.922h143.61c14.171 0 25.656 11.48 25.656 25.649Zm0 0'/%3E%3Cpath fill='%23545454' d='M274.617 226.914H127.488c-14.156 0-25.668-11.508-25.668-25.664v-90.68h145.368c15.113 0 27.414 12.297 27.414 27.407v88.937ZM105.34 114.086v87.164c0 12.215 9.933 22.133 22.133 22.133H271.07v-85.406c0-13.168-10.722-23.891-23.894-23.891Zm0 0'/%3E%3Cpath fill='%23fff' d='m175.45 199.828-27.317-27.914 7.05-6.879 20.364 20.809 44.96-44.7 6.938 6.993Zm0 0'/%3E%3C/svg%3E",
};
