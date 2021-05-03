import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';

import AlgoliaAutoComplete from '../autocomplete-algolia/autocomplete-algolia.component';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
);

export default function SearchInput() {
  const [query, setQuery] = useState('');

  const onSuggestionSelected = (_, { suggestion }) => {
    setQuery(suggestion.value);
  };
  const onSuggestionCleared = () => {
    setQuery('');
  };

  return (
    <div className='max-w-lg w-full lg:max-w-xs font-hind text-sm'>
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
      >
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <SearchIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </div>
          <AlgoliaAutoComplete
            onSuggestionSelected={onSuggestionSelected}
            onSuggestionCleared={onSuggestionCleared}
          />
        </div>
      </InstantSearch>
    </div>
  );
}
