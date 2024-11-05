import { SVGProps } from "react"
export const IconCoinMedium = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={36}
        height={36}
        fill="none"
        {...props}
    >
        <circle cx={18} cy={21.5} r={13} fill="#F9E160" />
        <g filter="url(#a)">
            <circle cx={18} cy={21.5} r={10.797} fill="#FE881C" fillOpacity={0.72} />
        </g>
        <g filter="url(#b)">
            <path
                stroke="#FFEA7C"
                strokeWidth={1.857}
                d="m17.69 15.929-5.88 8.357H23.57l-5.88-8.357Z"
                shapeRendering="crispEdges"
            />
        </g>
        <g
            filter="url(#c)"
            style={{
                mixBlendMode: "overlay",
            }}
        >
            <circle cx={18.22} cy={17.754} r={7.051} fill="#fff" />
        </g>
        <defs>
            <filter
                id="a"
                width={21.593}
                height={22.034}
                x={7.203}
                y={10.703}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feMorphology
                    in="SourceAlpha"
                    radius={0.441}
                    result="effect1_innerShadow_6208_1319"
                />
                <feOffset dy={0.441} />
                <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="shape" result="effect1_innerShadow_6208_1319" />
            </filter>
            <filter
                id="b"
                width={15.34}
                height={11.333}
                x={10.021}
                y={14.315}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy={0.433} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_6208_1319"
                />
                <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_6208_1319"
                    result="shape"
                />
            </filter>
            <filter
                id="c"
                width={35.254}
                height={35.254}
                x={0.593}
                y={0.127}
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur
                    result="effect1_foregroundBlur_6208_1319"
                    stdDeviation={5.288}
                />
            </filter>
        </defs>
    </svg>
)