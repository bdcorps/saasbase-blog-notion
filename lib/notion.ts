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

  const posts = myPosts.results.map((post: any) => {
    const id: string = post.id
    const properties: any = post.properties

    const customProperties: any = {}

    for (const entry of Object.entries(properties)) {
      const [key, property] = entry as any;

      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let currentDate = `${day}-${month}-${year}`;

      if (property.type === "rich_text") {
        customProperties[key] = (property.rich_text && property.rich_text.length > 0) ? property.rich_text[0].plain_text : ""
      } else if (property.type === "title") {
        customProperties[key] = property.title[0].plain_text
      } else if (property.type === "checkbox") {
        customProperties[key] = property.checkbox
      } else if (property.type === "date") {
        customProperties[key] = property.date?.start || currentDate
      } else if (property.type === "multi_select") {
        customProperties[key] = property.multi_select.map((item: any) => item.name)
      } else {
        // console.log(entry)
      }
    }

    const result = { id, properties: customProperties }

    return result
  })

  return posts;
}

async function post(slug: string) {
  const allPosts = await posts();

  const post = allPosts.find((post: any) => post.properties.slug === slug);

  if (!post) {
    return null
  }

  const myPost = await client.pages.retrieve({
    page_id: post.id,
  });

  return post;
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

    const newRichText = await Promise.all(rich_text.map(async (richText: any) => {
      if (richText.text.link && "url" in richText.text.link && richText.text.link.url.startsWith("/") && richText.text.link.url.length === 33) {
        // would be /8846822927f24d548b30a680f03f6110
        const page: any = await getPage(richText.text.link.url.slice(1))
        richText["text"]["link"]["url"] = "/blog/" + page.properties.slug

        richText["href"] = "/blog/" + page.properties.slug

        return richText
      }
      return richText;
    }))

    block["paragraph"]["rich_text"] = newRichText
    return block
  }))

  const x = await n2m.blocksToMarkdown(blocks);

  console.log(x)

  return x
}



export {
  posts,
  post,
  blocks,
  getPage
};

