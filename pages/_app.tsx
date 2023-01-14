import '../styles/global.css';
import Head from 'next/head';
import Layout from '../components/Layout';
import { QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { buildBreadcrumbs } from '../components/utils';
import { queryClient } from '../components/reactQueryClient';
// import { ReactQueryDevtools } from 'react-query/devtools';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const meta = Component.layoutProps?.meta || {};

  const canonicalURL = process.env.domain + router.pathname;
  const _title = meta.title ?? process.env.defaultTitle;
  const _description = meta.description ?? process.env.defaultDescription;

  useEffect(() => {
    const handleRouteChange = () => {
      // eslint-disable-next-line
      // @ts-ignore google analytics script
      ga('send', 'pageview');
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>{_title}</title>
        <meta key='twitter:title' name='twitter:title' content={_title} />
        <meta name='description' content={_description} />
        <meta property='og:title' content={_title} />
        <meta property='og:description' content={_description} />

        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <meta name='apple-mobile-web-app-title' content={process.env.siteName} />
        <meta name='application-name' content={process.env.siteName} />
        <meta name='msapplication-TileColor' content='#38bdf8' />
        <meta property='og:type' content='article' />
        <meta property='og:url' content={process.env.domain} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='canonical' href={canonicalURL} />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: buildBreadcrumbs(_title, router.pathname) }}
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  );
}
