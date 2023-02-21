import { IArticle, IArticleFields } from "contentful";
import client from "contentfuli";
import React from "react";
import { Container } from "reactstrap";
import Head from "next/head";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Article({ article }: { article: IArticle }) {
  return (
    <>
      <Head>
        <title>{article.fields.title}</title>
      </Head>
      <Container className="py-3">
        <h1>{article.fields.title}</h1>
        <div className="py-2">
          {documentToReactComponents(article.fields.content!)}
        </div>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articleEntries = await client.getEntries<IArticleFields>({
    content_type: "article",
    select: "fields.slug",
  });
  return {
    paths: articleEntries.items.map((item) => {
      return {
        params: {
          article: item.fields.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.artical;

  const articleEntries = await client.getEntries<IArticleFields>({
    content_type: "article",
    select: "fields.slug",
    limit: 1,
    "fields.slug": slug,
  });

  const [article] = articleEntries.items;

  return {
    props: {
      article,
    },
  };
};
