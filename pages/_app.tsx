
import { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react"


interface MyAppProps extends AppProps {
	// headers: Record<string, string>;
}

export default function MainFunctionX({
    Component, pageProps: {session, ...pageProps}
}:MyAppProps) {
    
    return <SessionProvider session={session}>
        <Component {...pageProps} />
        </SessionProvider>
    
}