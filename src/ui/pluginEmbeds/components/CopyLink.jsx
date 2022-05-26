import { findByDisplayName, findAsync, findByProps } from "../../../api/modules/webpack";
import { copyText } from "utils";

const Clickable = findByDisplayName("Clickable");
const Link = findByDisplayName("Link");

export default async function getCopyLink() {
  const { copyLink, copyLinkIcon, copied } = await findAsync(() => findByProps("titleRegion"));

  return ({ url }) => {
    const [state, setState] = React.useState(false);
    const timeoutRef = React.useRef();
    React.useEffect(() => () => clearTimeout(timeoutRef));

    function handleClick() {
      if (state) return;

      copyText(url);
      setState(true);
      timeoutRef.current = setTimeout(() => setState(false), 2000);
    }

    return (
      <Clickable className={`${copyLink}${state ? " " + copied : ""}`} onClick={handleClick}>
        <Link className={copyLinkIcon} href={url} target="_blank" />
        {state ? "Copied!" : "Copy Link"}
      </Clickable>
    );
  };
}
