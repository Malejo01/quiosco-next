import { ReactNode } from "react"

function Heading({children} : {children: ReactNode}) {
    return (
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-black text-balance">
            {children}
        </h1>
    )
}

export default Heading
