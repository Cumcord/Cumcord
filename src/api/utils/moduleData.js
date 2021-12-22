import { React } from "commonModules";
export const cache = {};
const invalid = {
  name: "Invalid module.",
  description: "This module does not exist.",
  author: "Unknown",
  invalid: true,
};

export default function useFetchModule(link) {
  const [module, setModule] = React.useState(cache[link]);
  React.useEffect(() => {
    if (cache[link]) {
      return;
    }
    fetch(link)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cache[link] = data;
        setModule(data);
      })
      .catch(() => {
        cache[link] = invalid;
        setModule(invalid);
      });
  }, [link]);

  return (
    module ?? {
      name: "Loading...",
      description: "This module is still loading.",
      author: "Loading...",
    }
  );
}
