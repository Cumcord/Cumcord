import webpackModules from "webpackModules";
import { copyText } from "utils";

const Clickable = webpackModules.findByDisplayName("Clickable");
const Link = webpackModules.findByDisplayName("Link");

export default async function getCopyLink() {
  const { copyLink, copyLinkIcon, copied } =
  await webpackModules.findAsync(() => webpackModules.findByProps("titleRegion"));

  return function CopyLink({ url }) {
    const [state, setState] = React.useState(false);
    const timeoutRef = React.useRef(null);
    React.useEffect(() => {
      return function () {
        return clearTimeout(timeoutRef);
      };
    });

    function handleClick() {
      if (!state) {
        copyText(url);
        setState(true);
        timeoutRef.current = setTimeout(() => {
          return setState(false);
        }, 2000);
      }
    }

    return (
      <Clickable
        className={`${copyLink}${state ? " " + copied : ""}`}
        onClick={handleClick}
      >
        <Link className={copyLinkIcon} href={url} target="_blank" />
        {state ? "Copied!" : "Copy Link"}
      </Clickable>
    );
  };
}
