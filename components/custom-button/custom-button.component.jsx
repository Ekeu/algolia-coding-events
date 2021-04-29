import { forwardRef } from 'react';

import Loader from '../loader/loader.component';

const CustomButton = forwardRef(
  (
    {
      children,
      customStyles,
      addStyles,
      loading,
      style,
      disabled,
      loaderPrimaryColor,
      loaderSecondaryColor,
      loaderHeight,
      loaderWidth,
      loaderBackgroundColor,
      ...otherProps
    },
    ref
  ) => (
    <button
      ref={ref}
      {...otherProps}
      style={{
        cursor: loading || disabled ? 'not-allowed' : undefined,
        ...style,
      }}
      disabled={disabled}
      className={`${
        customStyles
          ? customStyles
          : 'border border-transparent w-full py-2 px-4 text-white bg-gradient-to-r from-indigo-500 to-indigo-700'
      } flex justify-center rounded-md shadow-sm text-base font-medium focus:outline-none ${addStyles}`}
    >
      {loading ? (
        <Loader
          primaryColor={loaderPrimaryColor}
          secondaryColor={loaderSecondaryColor}
          height={loaderHeight}
          width={loaderWidth}
          backgroundColor={loaderBackgroundColor}
        />
      ) : (
        children
      )}
    </button>
  )
);

export default CustomButton;
