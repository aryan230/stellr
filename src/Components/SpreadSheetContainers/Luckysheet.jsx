import React from "react";
class Luckysheet extends React.Component {
  componentDidMount() {
    const luckysheet = window.luckysheet;
    luckysheet.create({
      container: "luckysheet",
      plugins: ["chart"],
      showinfobar: false,
      lang: "en",
    });
  }
  render() {
    const luckyCss = {
      margin: "0px",
      padding: "0px",
      width: "100%",
      height: "100%",
      left: "0px",
      top: "0px",
    };
    return <div id="luckysheet" style={luckyCss}></div>;
  }
}

export default Luckysheet;
