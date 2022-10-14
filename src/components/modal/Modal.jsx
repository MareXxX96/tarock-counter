import { createPortal } from "react-dom";
import { selectModalPage } from "../../store/modal/modal.selector";
import { useSelector } from "react-redux";

import GameSelector from "../gameselector/gameselector.component";
import PlayerSelector from "../playerselector/playerselector.component";
import Ansagen from "../ansagen/ansagen.component";
import PositiveSuccessSelector from "../success-selector/positive-success-selector.component";
import NegativeSuccessSelector from "../success-selector/negative-success-selector.component";
import NegativeAnsagen from "../negative-ansagen/negative-ansagen.component";
import Fahren from "../fahren/fahren.component";
import PlayerCreator from "../playercreator/playercreator.component";
// import from '@mui/'

const Modal = ({ isVisible }) => {
  const modalPage = useSelector(selectModalPage);

  if (isVisible === true) {
    switch (modalPage) {
      case 0:
        return createPortal(
          <GameSelector />,
          document.body,
          console.log("Displaying screen 0")
        );
        break;
      case 1:
        return createPortal(
          <PlayerSelector />,
          document.body,
          console.log("Displaying screen 1")
        );
        break;
      case 2:
        return createPortal(
          <Ansagen />,
          document.body,
          console.log("Displaying screen 2")
        );
        break;
      case 3:
        return createPortal(
          <PositiveSuccessSelector />,
          document.body,
          console.log("Displaying screen 3")
        );
        break;
      case 4:
        return createPortal(
          <NegativeAnsagen />,
          document.body,
          console.log("Displaying screen 4")
        );
        break;
      case 5:
        return createPortal(
          <NegativeSuccessSelector />,
          document.body,
          console.log("Displaying screen 5")
        );
        break;
      case 6:
        return createPortal(
          <Fahren />,
          document.body,
          console.log("Displaying screen 6")
        );
        break;
        case 7:
        return createPortal(
          <PlayerCreator/>,
          document.body,
          console.log("Displaying screen 7")
        );
        break;
      default:
        return console.log("Unexpected modal nr");
    }
  } else {
    return null;
  }
};
export default Modal;
