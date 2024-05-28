import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { setupStore } from "../store";
import { Fallback } from "shared/ui/fallback";

interface IProviders {
  readonly children: JSX.Element;
}

export const Providers: FC<IProviders> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Provider store={setupStore()}>{children}</Provider>
    </ErrorBoundary>
  );
};
