import { algoliasearch } from 'algoliasearch';

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_APP_ID ?? '', process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ?? '');
export default searchClient;