import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

export const client = new Client({
  auth: process.env.NOTION_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: client });
n2m.setCustomTransformer('embed', async (block) => {
  const { embed } = block as any;
  if (!embed?.url) return '';
  return `<figure>
  <iframe src="${embed?.url}"></iframe>
  <figcaption>${await n2m.blockToMarkdown(embed?.caption)}</figcaption>
</figure>`;
});


async function posts() {
  const myPosts = await client.databases.query({
    database_id: `${process.env.NOTION_DATABASE}`
  });

  return myPosts;
}

async function post(slug: string) {
  const allPosts = await posts();

  const post = allPosts.results.find((post: any) => post.properties.slug.rich_text[0].plain_text === slug);

  if (!post) {
    return null
  }

  const myPost = await client.pages.retrieve({
    page_id: post.id,
  });
  return myPost;
}

async function getPage(id: string) {
  const myPost = await client.pages.retrieve({
    page_id: id,
  });
  return myPost;
}

async function blocks(id: string) {
  const { results } = await client.blocks.children.list({
    block_id: id
  });

  const blocks = await Promise.all(results.map(async (block: any) => {
    if (block.type !== "paragraph") { return block }

    const { rich_text } = block.paragraph;
    // console.log(rich_text)

    const newRichText = await Promise.all(rich_text.map(async (richText: any) => {
      if (richText.text.link && "url" in richText.text.link && richText.text.link.url.startsWith("/") && richText.text.link.url.length === 33) {
        // would be /8846822927f24d548b30a680f03f6110
        const page: any = await getPage(richText.text.link.url.slice(1))
        richText["text"]["link"]["url"] = "/posts/" + page.properties.slug.rich_text[0].plain_text

        richText["href"] = "/posts/" + page.properties.slug.rich_text[0].plain_text

        return richText
      }
      return richText;
    }))

    block["paragraph"]["rich_text"] = newRichText
    return block
  }))

  const x = await n2m.blocksToMarkdown(blocks);

  return x
}



export {
  posts,
  post,
  blocks,
  getPage
};

