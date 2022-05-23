export default function copyText(text) {
  if (window.DiscordNative) {
    DiscordNative.clipboard.copy(text);
    return;
  }

  navigator.clipboard.writeText(text).catch(() => {
    const copyArea = document.createElement("textarea");

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
  });
}
