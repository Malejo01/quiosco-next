import Image from "next/image";
import Link from "next/link";

export default function Logo () {
    return (
        <Link
            href={'/order/cafe'}
        >
        <div className="flex justify-center mt-5">
            <div className="relative w-40 h-40">
                <Image
                    fill
                    alt="logotipo"
                    src='/logo.svg'
                />

            </div>
        </div>
        </Link>
    )

}