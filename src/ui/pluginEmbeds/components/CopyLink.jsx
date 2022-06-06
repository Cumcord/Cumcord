import { findByDisplayName, findAsync, findByProps } from "@webpackModules";
import { copyText } from "@utils";
import i18n from "@i18n";

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
        {state ? i18n.COPY : i18n.COPIED_URL}
      </Clickable>
    );
  };
}
