function UserIcon({size = 25, width = 4, ...props}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 201.568 226.264"
      {...props}
    >
      <g
        data-name="Icon feather-user"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={width}
      >
        <path
          data-name="Path 1"
          d="M199.568 224.264v-24.7a49.392 49.392 0 00-49.392-49.388H51.392A49.392 49.392 0 002 199.568v24.7"
        />
        <path
          data-name="Path 2"
          d="M150.176 51.392A49.392 49.392 0 11100.784 2a49.392 49.392 0 0149.392 49.392z"
        />
      </g>
    </svg>
  )
}

export default UserIcon
