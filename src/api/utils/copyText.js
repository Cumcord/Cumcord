export default function copyText(text) {
  if (window["DiscordNative"]) {
    DiscordNative.clipboard.copy(text);
  } else {
    navigator.clipboard.writeText(text).then(
      // We just want to account for errors
      () => {},
      () => {
        let copyArea = document.createElement("textarea");

        copyArea.style.visibility = "hidden";
        copyArea.style.position = "fixed";
        copyArea.style.top = "0";
        copyArea.style.left = "0";

        document.body.appendChild(copyArea);
        copyArea.focus();
        copyArea.select();

        try {
          document.execCommand("copy");
        } catch (err) {
          console.error(err);
        }

        document.body.removeChild(copyArea);
      },
    );
  }
}
