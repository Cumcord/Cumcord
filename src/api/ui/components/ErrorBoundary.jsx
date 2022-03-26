import { React } from "commonModules";
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="cumcord-error-handler">
          <h1 className="cumcord-error-handler-title">Oops, we had a fucky wucky. (Cumcord)</h1>
          <code className="cumcord-error-handler-code">{`${this.state.error}` /* wtf lol */}</code>
        </div>
      );
    }

    return this.props.children;
  }
}
