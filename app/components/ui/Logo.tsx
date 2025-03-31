import Image from "next/image";
import Link from "next/link";

export default function Logo () {
    return (
        <Link
            href={'/order/cafe'}
        >
        <div className="flex justify-center m-5">
            <div className="">
                <Image
                    width={300}
                    height={300}
                    alt="logotipo"
                    src='/logo.jpg'
                    className="rounded-full border-4 border-solid border-black"
                />

            </div>
        </div>
        </Link>
    )

}