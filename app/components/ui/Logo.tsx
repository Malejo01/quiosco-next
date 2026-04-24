import Image from "next/image";
import Link from "next/link";

export default function Logo () {
    return (
        <Link href={'/order/cafe'} className="block">
            <div className="flex justify-center p-4 lg:p-5">
                <Image
                    width={200}
                    height={200}
                    alt="logotipo"
                    src='/logo.jpg'
                    className="rounded-full border-4 border-solid border-black w-32 h-32 lg:w-48 lg:h-48 object-cover"
                    priority
                />
            </div>
        </Link>
    )
}
