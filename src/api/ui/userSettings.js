import { findAndPatch, after } from "@patcher";
import { findByProps } from "@webpackModules";

const sections = [];

export function registerSection(id, name, component) {
  const section = { section: id, label: name, element: component };
  sections.push(section);

  return () => {
    const i = sections.indexOf(section);
    if (i !== -1) sections.splice(i, 1);
  };
}

export const initUserSettings = () =>
  findAndPatch(
    () => findByProps("SHAKE_INTENSITY_DEFAULT").default.prototype,
    (SidebarComponent) =>
      after("getPredicateSections", SidebarComponent, (_a, sects) => {
        const pos = sects.findIndex((e) => e.section === "changelog") - 1;

        // if we're not in user settings, die
        if (pos < 0) return;

        sects.splice(
          pos,
          0,
          { section: "DIVIDER" },
          { section: "HEADER", label: "Cumcord" },
          ...sections,
        );

        return sects;
      }),
  );
