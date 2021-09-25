import { React } from "commonModules";
import { Events } from "nests";

export default function useNest(nest, transient = false, filter = () => true) {
  const value = React.useRef(nest.ghost);

  const [, forceUpdate] = React.useReducer((n) => ~n, 0);

  React.useEffect(() => {
    function listener(event, data) {
      if (filter(event, data)) forceUpdate();
    }

    nest.on(Events.UPDATE, listener);

    if (!transient) {
      nest.on(Events.SET, listener);
      nest.on(Events.DELETE, listener);
    }

    return () => {
      nest.off(Events.UPDATE, listener);

      if (!transient) {
        nest.off(Events.SET, listener);
        nest.off(Events.DELETE, listener);
      }
    };
  }, []);
}
