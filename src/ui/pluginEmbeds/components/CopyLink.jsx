import { findByDisplayName, findAsync, findByProps } from "@webpackModules";
import { copyText } from "@utils";
import i18n from "@i18n";

const Clickable = findByDisplayName("Clickable");
const Link = findByDisplayName("Link");

export default async function getCopyLink() {
  const { copyLink, copyLinkIcon, copied } = await findAsync(() => findByProps("titleRegion"));

  return ({ url }) => {
    const [cooldown, setCooldown] = React.useState(false);
    const timeoutRef = React.useRef();
    React.useEffect(() => () => clearTimeout(timeoutRef.current));

    function handleClick() {
      if (cooldown) return;

      copyText(url);
      setCooldown(true);
      timeoutRef.current = setTimeout(() => setCooldown(false), 2000);
    }

    return (
      <Clickable className={`${copyLink}${cooldown ? " " + copied : ""}`} onClick={handleClick}>
        <Link className={copyLinkIcon} href={url} target="_blank" />
        {cooldown ? i18n.COPIED_URL : i18n.COPY_LINK}
      </Clickable>
    );
  };
}
