const DEFAULT_BLOCKLIST = ["Clickable", "Tooltip"];

export default (
  node,
  { parent = false, displayName = true, blockList = DEFAULT_BLOCKLIST } = {},
) => {
  const isBlocked = (fiber) =>
    !fiber?.type?.displayName || blockList.includes(fiber?.type?.displayName);

  const fiberIsOkay = (fiber) =>
    // ignore "div" etc., if displayName is on, must not be blocked, else assume its fine
    typeof fiber?.type !== "string" && (displayName ? !isBlocked(fiber) : true);

  const walk = (fiber) => (fiberIsOkay(fiber) ? fiber?.type : walk(fiber.return));

  const type = walk(cumcord.utils.getReactInstance(node));

  return parent ? find((m) => m?.default === type) : type;
};
