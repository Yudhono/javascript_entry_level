import "../styles/styles.css";
import "../styles/landing.css";
import "../styles/html-css.css";
import "../styles/components.css";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
