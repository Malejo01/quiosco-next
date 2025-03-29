"use client"

import {CldUploadWidget} from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
import {TbPhotoPlus} from 'react-icons/tb'

export default function ImageUpload() {

    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget
            uploadPreset="subirCloudinary"
            options={{
                maxFiles:1,
                maxFileSize: 5500000,
            }}
            onSuccess={(result, {widget}) => {
                console.log(result)
                if(result.event === 'success') {
                    widget.close()
                    //@ts-ignore
                    setImageUrl(result.info?.secure_url)
                }
            }}  
                onUpload={(error, result) => {
        if (error) {
            console.error("Error uploading image:", error);
        } else {
            console.log("Image uploaded:", result);
            }
        }}
        >
        {({open}) => (
            <>
                <div className='space-y-2'>
                    <label className='text-slate-800'>Imagen Producto</label>
                    <div
                        className='relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 
                        flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100'
                        onClick={() => open()}
                    >
                        <TbPhotoPlus
                            size={50}
                        />
                        <p className='text-lg font-semibold'>Agregar imagen</p>

                        {imageUrl && (
                            <div
                                className='absolute inset-0 w-full h-full'
                            >
                                <Image
                                    fill
                                    style={{objectFit:'contain'}}
                                    src={imageUrl}
                                    alt='Imagen de Producto'
                                />
                            </div>
                        )}
                    </div>
                </div>
                <input
                    type='hidden'
                    name='image'
                    value={imageUrl}
                />
            </>
        )}
        </CldUploadWidget>
    )
}

