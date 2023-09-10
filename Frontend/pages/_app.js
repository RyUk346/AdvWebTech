import '../styles/globals.css';
import { AuthProvider } from './utils/authcontext';
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <div className="dark:text-white">
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      </div>
    </ThemeProvider>
  );
}
