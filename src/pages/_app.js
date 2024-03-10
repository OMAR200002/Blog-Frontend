import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "../lib/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "@/pages/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as React from "react";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <RootLayout>
          <QueryClientProvider client={queryClient}>
            <main className={roboto.className}>
              <Component {...pageProps} />
              <ToastContainer></ToastContainer>
            </main>
          </QueryClientProvider>
        </RootLayout>
      </Provider>
    </>
  );
}
