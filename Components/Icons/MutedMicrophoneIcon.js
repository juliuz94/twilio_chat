function MutedMicrophoneIcon({size = 25, ...props}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 42 42"
      {...props}
    >
      <path data-name="Path 5385" d="M0 0h42v42H0z" fill="none" />
      <path
        data-name="Path 5386"
        d="M18.9 8.575a2.1 2.1 0 014.2 0l-.018 6.843 3.168 3.132v-9.8a5.232 5.232 0 00-10.43-.613l3.08 3.08zM33.25 19.25h-2.975a9.053 9.053 0 01-.472 2.87l2.222 2.222a11.383 11.383 0 001.225-5.092zM7.717 5L5.25 7.472l10.5 10.5v1.278A5.243 5.243 0 0021 24.5a4.821 4.821 0 001.137-.14l2.905 2.9a9.622 9.622 0 01-4.042.91 9.08 9.08 0 01-9.275-8.92H8.75a12.222 12.222 0 0010.5 11.76v5.74h3.5v-5.74a12.476 12.476 0 004.462-1.575l7.35 7.35 2.467-2.467z"
        fill="#fff"
      />
    </svg>
  )
}

export default MutedMicrophoneIcon
