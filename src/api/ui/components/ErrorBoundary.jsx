import { React } from "@commonModules";
import { findByProps } from "@webpackModules";
import i18n from "@i18n";

const Button = findByProps("BorderColors", "Colors");

let reactErrCache;

fetch("https://reactjs.org/page-data/docs/error-decoder.html/page-data.json").then(async (res) => {
  reactErrCache = JSON.parse((await res.json()).result.data.errorCodesJson.internal.contentDigest);
});

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasErr: false };
  }

  static getDerivedStateFromError(error) {
    return { hasErr: true, errTxt: ErrorBoundary.decodeError(error) ?? error.message };
  }

  static decodeError(error) {
    if (error instanceof Error)
      return reactErrCache[error.message.match(/Minified React error #(\d+)/)?.[1]];
  }

  render() {
    if (!this.state.hasErr) return this.props.children;

    return (
      <div className="cumcord-error-handler">
        <h1 className="cumcord-error-handler-title">{i18n.ERR_HEADER}</h1>
        <code className="cumcord-error-handler-code">{this.state.errTxt}</code>
        <Button
          color={Button.Colors.RED}
          size={Button.Sizes.TINY}
          look={Button.Looks.OUTLINED}
          onClick={() => this.setState({ errTxt: null, hasErr: false })}>
          Retry
        </Button>
      </div>
    );
  }
}
