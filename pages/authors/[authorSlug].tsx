import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import React from 'react'
import PortableText from 'react-portable-text'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Author } from '../../typing'

interface Props {
  data: Author
}

const AuthorInfo = ({ data }: Props) => {
  return (
    <main>
      <Head>
        <title>{data?.name} - Medium</title>
        {/* <meta name="description" content={data.} /> */}
      </Head>
      <Header />
      <div className="mx-auto grid max-w-3xl  place-items-center p-5">
        <img className="rounded-full" src={urlFor(data.image).url()} alt="" />
        <h3 className="z-50 mt-1 cursor-pointer text-2xl hover:text-blue-900 hover:underline">
          @{data.slug.current}
        </h3>
        <h1 className="text-sm">Joined the team Medium in {data.joinedAt}</h1>
        <hr className="my-2 w-28 max-w-lg border border-yellow-500" />
        <div className="mx-auto grid place-items-center">
          Follow Me On{' '}
          <a href={data.socialLink} target="_blank">
            <img
              className="w-10"
              src={'https://img.icons8.com/fluency/344/twitter.png'}
            />
          </a>
        </div>
      </div>

      <article className="mx-auto max-w-3xl p-5">
        <h2 className="mb-5 text-center text-xl font-bold">About Me</h2>
        <div className="my-3">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={data.bio}
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
    </main>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = `*[_type == "author" && slug.current=="${context.query.authorSlug}"][0]{
    name, image, bio, slug, joinedAt, socialLink
  }`
  const data = await sanityClient.fetch(query)
  return { props: { data } }
}

export default AuthorInfo
