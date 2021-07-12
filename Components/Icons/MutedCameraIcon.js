function MutedCameraIcon({size = 25, ...props}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 51 51"
      {...props}
    >
      <path data-name="Path 5387" d="M0 0h51v51H0z" fill="none" />
      <path
        data-name="Path 5388"
        d="M20.315 17l-4.25-4.25L7.25 3.953l-3 3 5.8 5.8H8.5a2.131 2.131 0 00-2.125 2.125v21.25A2.131 2.131 0 008.5 38.251H34a2.188 2.188 0 001.169-.382l6.758 6.757 3-3-18.832-18.824zm-9.69 17V17h3.676l17 17zm21.25-17v5.546l12.75 12.747v-21.48l-8.5 8.5v-7.438A2.131 2.131 0 0034 12.75H22.079l4.25 4.25z"
        fill="#fff"
      />
    </svg>
  )
}

export default MutedCameraIcon