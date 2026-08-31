import { defineConfig } from 'astro/config';

const isPagesBuild = process.env.GITHUB_ACTIONS === 'true';
const [githubOwner, githubRepository] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserSite = githubOwner && githubRepository?.toLowerCase() === `${githubOwner.toLowerCase()}.github.io`;

export default defineConfig({
  site: isPagesBuild && githubOwner ? `https://${githubOwner}.github.io` : 'http://localhost:4321',
  base: isPagesBuild && githubRepository && !isUserSite ? `/${githubRepository}` : '/',
});
