import { formatDate, getPostSlugFromFilename } from '../utils';

const getNormalizedPost = async (post) => {
  const { frontmatter, compiledContent, rawContent, file } = post;
  const ID = getPostSlugFromFilename(file);

  return {
    id: ID,

    date: frontmatter.date,
    formattedDate: formatDate(frontmatter.date),
    draft: frontmatter.draft || false,

    slug: frontmatter.slug || ID,

    title: frontmatter.title,
    description: frontmatter.description,
    subtitle: frontmatter.subtitle,
    body: compiledContent(),

    image: frontmatter.image,

    // TODO: reading time, tags, category, excerpt?
  };
};

async function loadPosts() {
  const posts = await import.meta.glob("../posts/**/*.md", {
    eager: true,
  });

  const normalizedPosts = Object.keys(posts).map(async (key) => {
    const post = await posts[key];
    return await getNormalizedPost(post);
  });

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
    .filter((post) => !post.draft);
  return results;
};

let _posts;

export async function getBlogPosts() {
  _posts = _posts || loadPosts();
  return await _posts;
};

export async function getRecentPosts(max = 5) {
  _posts = _posts || loadPosts();
  const posts = (await _posts).slice(0, max);
  return posts;
}
