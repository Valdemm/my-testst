import client from "contentfuli";
import { GetStaticProps } from "next";
import Head from "next/head";
import { IHome, IHomeFields } from "contentful";

export default function Home({ home }: { home: IHome }) {
  return (
    <div>
      <Head>
        <title>{home.fields.title}</title>
      </Head>
      <main>
        <h1>{home.fields.title}</h1>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const home = await client.getEntries<IHomeFields>({
    content_type: "Home",
    limit: 1,
  });

  const [homePage] = home.items;

  return {
    props: {
      title: "Мой блог",
      home: homePage,
    },
  };
};
