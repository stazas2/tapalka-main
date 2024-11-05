import { SVGProps } from "react"
export const IconCardTelegram = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      fill="url(#a)"
      d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16Z"
    />
    <path
      fill="#fff"
      d="m6.659 15.861 10.774-4.439c1.064-.463 4.671-1.942 4.671-1.942s1.665-.648 1.526.925c-.046.647-.416 2.913-.786 5.364l-1.156 7.26s-.093 1.064-.879 1.248c-.786.185-2.08-.647-2.312-.832-.185-.139-3.468-2.22-4.67-3.237-.324-.277-.694-.832.046-1.48a176.55 176.55 0 0 0 4.855-4.624c.555-.555 1.11-1.85-1.202-.277l-6.52 4.393s-.74.462-2.127.046c-1.388-.416-3.006-.971-3.006-.971s-1.11-.694.786-1.434Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={21.335}
        x2={13.335}
        y1={5.335}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#37AEE2" />
        <stop offset={1} stopColor="#1E96C8" />
      </linearGradient>
    </defs>
  </svg>
)
