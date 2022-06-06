import { React } from "@commonModules";
import i18n from "@i18n";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="cumcord-error-handler">
        <h1 className="cumcord-error-handler-title">{i18n.ERR_HEADER}</h1>
        <code className="cumcord-error-handler-code">{`${this.state.error}` /* wtf lol */}</code>
      </div>
    );
  }
}
