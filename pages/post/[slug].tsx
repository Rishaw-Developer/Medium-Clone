import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import React from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typing'
import PortableText from 'react-portable-text'
import Link from 'next/link'

interface Props {
  data: Post
}

const Blog = ({ data }: Props) => {
  return (
    <main>
      <Head>
        <title>{data.title} - Medium</title>
        <meta name="description" content={data.description} />
        <meta name="keywords" content={data.keywords} />
      </Head>
      <Header />
      <img
        className="h-80 w-full object-cover"
        src={urlFor(data.mainImage).url()}
        alt=""
      />
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">{data.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {data.description}
        </h2>
        <div className="flex items-center space-x-2">
          <Link href={`/authors/${data.author.slug.current}`}>
            <a>
              <img
                className="h-10 w-10 rounded-full"
                src={urlFor(data.author.image).url()}
                alt=""
              />
            </a>
          </Link>
          <p className="text-sm font-extralight">
            Post By <span className="font-semibold">{data.author.name}</span> -
            Published at {new Date(data._createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={data.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h1 className="my-5 text-xl font-bold" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-900 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>

      <hr className="my-5 mx-auto max-w-lg border border-yellow-500" />
    </main>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = `*[_type == "post" && slug.current=="${context.query.slug}"][0]{
    _id,
    _createdAt,
    title,
    keywords,
    author->{
    name, image, slug
  },
  description,
  mainImage,
  body,
  slug
  }`
  const data = await sanityClient.fetch(query)
  return { props: { data } }
}

export default Blog
