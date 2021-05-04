import { useState } from 'react';
import Link from 'next/link';
import { ChevronRightIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import {
  Highlight,
  connectAutoComplete,
} from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';

const customAutoComplete = ({
  hits,
  currentRefinement,
  refine,
  onSuggestionSelected,
  onSuggestionCleared,
}) => {
  const [value, setValue] = useState(currentRefinement);

  const onChange = (event, { newValue }) => {
    if (!newValue) {
      onSuggestionCleared();
    }
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    refine(value);
  };

  const onSuggestionsClearRequested = () => {
    refine();
  };

  const getSuggestionValue = (hit) => {
    return hit.name;
  };

  const renderSuggestion = (hit) => {
    return (
      <Link href={`/events/${hit.slug}`}>
        <a className='block hover:bg-purple-50'>
          <div className='flex items-center px-4 py-4 sm:px-6'>
            <div className='min-w-0 flex-1 flex items-center'>
              <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4'>
                <div>
                  <p className='text-sm font-medium text-purple-600 truncate'>
                    <Highlight attribute='name' hit={hit} tagName='mark' />
                  </p>
                  <p className='mt-2 flex items-center text-sm text-blue-gray-500'>
                    <LocationMarkerIcon
                      className='flex-shrink-0 mr-1.5 h-3 w-3 text-blue-gray-400'
                      aria-hidden='true'
                    />
                    <span className='truncate'>
                      <Highlight attribute='venue' hit={hit} tagName='mark' />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <ChevronRightIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </div>
          </div>
        </a>
      </Link>
    );
  };

  const inputProps = {
    placeholder: 'Search for an event...',
    onChange,
    value,
  };
  return (
    <AutoSuggest
      suggestions={hits}
      onSuggestionSelected={onSuggestionSelected}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

const AlgoliaAutoComplete = connectAutoComplete(customAutoComplete);

export default AlgoliaAutoComplete;
